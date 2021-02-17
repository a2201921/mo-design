import '@testing-library/jest-dom/extend-expect'
import React from "react";
import axios from "axios";
import {render, RenderResult, fireEvent, waitFor} from '@testing-library/react'
import {Upload, UploadProps} from "./upload";

jest.mock('../Icon', () => {
    return ({icon, onClick}) => {
        return <span onClick={onClick}>{icon}</span>
    }
})

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),

    onError: jest.fn(),
    drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})

describe('test upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.mo-file-input') as HTMLInputElement
        uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
    })

    it('upload process should works fine', async () => {
        const {queryByText} = wrapper
        mockedAxios.post.mockResolvedValue({data: 'cool'})

        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        fireEvent.change(fileInput, {target: {files: [testFile]}})

        await waitFor(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
        })
        expect(queryByText('check-circle')).toBeInTheDocument()

        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)

        expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            name: 'test.png'
        }))

        // remove the uploaded file
        expect(queryByText('times')).toBeInTheDocument()
        fireEvent.click(queryByText('times') as HTMLElement)
        expect(queryByText('test.png')).not.toBeInTheDocument()
        expect(testProps.onRemove).toHaveBeenCalledWith(
            expect.objectContaining({
                raw: testFile,
                status: 'success',
                name: 'test.png'
            })
        )
    })

    it('drag and drop files should works fine', async () => {
        mockedAxios.post.mockResolvedValue({data: 'cool'})
        fireEvent.dragOver(uploadArea)
        expect(uploadArea).toHaveClass('is-dragover')
        fireEvent.dragLeave(uploadArea)
        expect(uploadArea).not.toHaveClass('is-dragover')

        fireEvent.drop(uploadArea, {
            dataTransfer: {files: [testFile]}
        })

        await waitFor(() => {
            expect(wrapper.queryByText('test.png')).toBeInTheDocument()
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    })
})