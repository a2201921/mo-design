import React, {ChangeEvent, FC, useRef, useState} from "react";
import axios from "axios";
import {UploadList} from "./uploadList";
import Dragger from "./dragger";

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    /** 唯一标识符，不设置时会自动生成 */
    uid: string;
    /** */
    size: number;
    /** */
    name: string;
    /** */
    status?: UploadFileStatus;
    /** */
    percent?: number;
    /** */
    raw?: File;
    /** */
    response?: any;
    /** */
    error?: any;
}

export interface UploadProps {
    /** 上传的地址 */
    action: string;
    /** 接受上传的文件类型 */
    accept?: string;
    /** 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传所需额外参数或返回上传额外参数的方法 */
    data?: { [key: string]: any };
    /** 默认已经上传的文件列表 */
    defaultFileList?: UploadFile[]
    /** 设置上传的请求头部，IE10 以上有效 */
    headers?: { [key: string]: any };
    /** 上传文件进度改变时的状态 */
    onProgress?: (percentage: number, file: UploadFile) => void
    /** 上传文件成功时的回调 */
    onSuccess?: (data: any, file: File) => void
    /** 上传文件失败时的回调 */
    onError?: (err: any, file: UploadFile) => void
    /** 上传文件改变时的状态 */
    onChange?: (file: UploadFile) => void
    /** 点击移除文件时的回调 */
    onRemove?: (file: UploadFile) => void
    /** 发到后台的文件参数名 */
    name?: string;
    /** 上传请求时是否携带 cookie */
    withCredentials?: boolean;
    /** 是否支持多选文件，ie10+ 支持 */
    multiple?: boolean;
    /** 是否支持拖拽上传 */
    drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onChange,
        onRemove,
        onSuccess,
        onError,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props

    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList((prevList) => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return {...file, ...updateObj}
                }
                return file
            })
        })
    }

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }

        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }

    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })

        if (onRemove) {
            onRemove(file)
        }
    }

    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processFile => {
                        post(processFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }

    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }

        setFileList(prevList => {
            return [_file, ...prevList]
        })

        const formData = new FormData()
        formData.append(name || 'file', file)

        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }

        const promise = axios.post(action, formData, {
            headers: {
                ...headers,
                "Content-Type": "multipart/form-data",
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage < 100) {
                    updateFileList(_file, {percent: percentage, status: 'uploading'})

                    if (onProgress) {
                        onProgress(percentage, _file)
                    }
                }
            }
        })

        promise && promise.then(resp => {
            updateFileList(_file, {status: 'success', response: resp.data})
            if (onSuccess) {
                onSuccess(resp.data, file)
            }

            if (onChange) {
                onChange(_file)
            }

        }).catch(err => {
            updateFileList(_file, {status: 'error', error: err})
            if (onError) {
                onError(err, _file)
            }
        })
    }
    return <div className="mo-upload-component">
        <div className="mo-upload-input" style={{display: 'inline-block'}} onClick={handleClick}>
            {drag ? <Dragger onFile={(files) => {
                uploadFiles(files)
            }}>{children}</Dragger> : children}
            <input type="file" className="mo-file-input" ref={fileInput} style={{display: 'none'}} accept={accept}
                   multiple={multiple}
                   onChange={handleFileChange}/>
        </div>

        <UploadList fileList={fileList} onRemove={handleRemove}/>
    </div>
}

Upload.defaultProps = {
    name: 'file'
}

export default Upload;