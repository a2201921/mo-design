import React from "react";
import {render} from "@testing-library/react";
import Progress, {ProgressProps} from "./progress";

const defaultProps: ProgressProps = {
    percent: 30,
    strokeHeight: 20,
    showText: true,
    theme: 'success'
}

describe('test Progress Component', () => {
    it('should render to the correct default progress', () => {
        const wrapper = render(<Progress {...defaultProps} />)
        const element = wrapper.container.querySelector('.mo-progress-bar') as HTMLDivElement
        const progressBar = element.querySelector('.mo-progress-bar-inner')
        expect(element).toBeInTheDocument()
        expect(element.querySelector('.mo-progress-bar-outer')).toHaveStyle({height:'20px'})
        expect(progressBar).toHaveStyle({width:'30%'})
        expect(progressBar).toHaveClass('color-success')
        expect(element.querySelector('.inner-text')).toBeInTheDocument()
    })

})

