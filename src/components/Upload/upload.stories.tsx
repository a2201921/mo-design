import React from "react";
import { storiesOf } from "@storybook/react";
import { Upload } from './upload'

const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
        alert('file too big')
        return false
    }
    return true
}
const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', { type: file.type })
    return Promise.resolve(newFile)
}

const simpleUpload = () => {
    return (<Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        name="fileName"
        data={{ 'key': 'value' }}
        accept=".jpg"
        multiple
        drag
        beforeUpload={checkFileSize}
        headers={{ 'X-Powered-By': 'mo-design' }}
    >
        Click to upload
    </Upload>)
}


const asyncUpload = () => {
    return (<Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        name="fileName"
        data={{ 'key': 'value' }}
        accept=".jpg"
        multiple
        drag
        beforeUpload={filePromise}
        headers={{ 'X-Powered-By': 'mo-design' }}
    >
        Click to upload
    </Upload>)
}
storiesOf('Upload Component', module)
    .add('Upload simple', simpleUpload)
    .add('Async simple', asyncUpload)