import React from "react";
import {render, fireEvent} from "@testing-library/react";
import Input, {InputProps} from "./input";


const testProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}

describe('test Input Component', () => {
    it('should render to the correct default input', () => {
        const wrapper = render(<Input {...testProps} />)
        const element = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('mo-input-inner')
        fireEvent.change(element, {target: {value: '123'}})
        expect(testProps.onChange).toHaveBeenCalled()
        expect(element.value).toEqual('123')
    })

    it('should render the disabled Input on disabled property', () => {
        const wrapper = render(<Input disabled placeholder="disabled"/>)
        const element = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
        expect(element.disabled).toBeTruthy()
    })
    it('should render different input sizes on size property', () => {
        const wrapper = render(<Input size="lg"/>)
        const element = wrapper.container.querySelector('.mo-input-wrapper')
        expect(element).toHaveClass('input-size-lg')
    })
    it('should render prepend and append element on prepend/append property', () => {
        const {queryByText, container} = render(<Input placeholder="pend" prepend="https://" append=".com"/>)
        const element = container.querySelector('.mo-input-wrapper')
        expect(element).toHaveClass('input-group input-group-append input-group-prepend')
        expect(queryByText('https://')).toBeInTheDocument()
        expect(queryByText('.com')).toBeInTheDocument()
    })
})