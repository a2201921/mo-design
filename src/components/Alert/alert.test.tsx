import React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react'
import Alert, {AlertProps} from "./alert";

const baseProps: AlertProps = {
    message: "这是一个提示",
    description: "这是一段描述",
    type: "success"
}

const closeProps: AlertProps = {
    message: "这是一段提示",
    closable: true,
    onClose: jest.fn()
}

describe('test Alert Component', () => {
    it('should render to the correct base alert', () => {
        const wrapper = render(<Alert {...baseProps} />)
        expect(wrapper.container.querySelector('.mo-alert')).toHaveClass('mo-alert-success')
        expect(wrapper.getByText("这是一个提示")).toBeInTheDocument()

        expect(wrapper.getByText("这是一段描述")).toBeInTheDocument()

    })

    it('should close the alert when click the close icon', async () => {
        const wrapper = render(<Alert {...closeProps} />)
        const element = wrapper.container.querySelector('.mo-alert-close-icon') as SVGAElement
        expect(element).toBeInTheDocument()

        fireEvent.click(element, closeProps.onClose)
        expect(closeProps.onClose).toHaveBeenCalled()
        await waitFor(() => {
            expect(element).not.toBeInTheDocument()
        })
    })
})

