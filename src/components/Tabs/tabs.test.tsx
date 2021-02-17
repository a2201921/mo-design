import React from "react";
import {render, fireEvent, RenderResult} from "@testing-library/react";
import Tabs, {TabsProps} from "./tabs";
import TabPane from "./tabPane";

const testProps: TabsProps = {
    defaultActiveKey: '0',
    onChange: jest.fn()
}
/* 样式有可能没有加入到dom中, 所以手动设置一下*/
const createStyleFile = () => {
    const cssFile: string = `
    .mo-tabs-pane {
        display: none;
    }
    .mo-tabs-pane.is-active {
        display: block;
    }
    `
    const style = document.createElement('style')
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, activeTab:HTMLElement,activePane: HTMLElement, disabledPane: HTMLElement;
describe('test Tabs Component', () => {
    beforeEach(() => {
        wrapper = render(<Tabs {...testProps}>
            <TabPane tab="tab1" order="0">active</TabPane>
            <TabPane disabled tab="tab2" order="1">disabled</TabPane>
            <TabPane tab="tab3" order="2">这是Tab3的内容</TabPane>
        </Tabs>)
        wrapper.container.append(createStyleFile())
        activeTab = wrapper.getByText('tab1')
        activePane = wrapper.getByText('active')
        disabledPane = wrapper.getByText('disabled')
    })

    it('should render to the correct default tabs', () => {
        expect(activeTab).toHaveClass('is-active')
        expect(activePane).toBeVisible()
        expect(disabledPane).not.toBeVisible()
    })

    it('click disabled should not change active and not trigger callback', ()=> {
        const disabledTab = wrapper.getByText('tab2')
        fireEvent.click(disabledTab)
        expect(disabledTab).not.toHaveClass('is-active')
        expect(disabledPane).not.toBeVisible()
        expect(activeTab).toHaveClass('is-active')
        expect(activePane).toBeVisible()
        expect(testProps.onChange).not.toHaveBeenCalled()
    })


    it('click tab should change active and call the right callback', () => {
        const thirdTab = wrapper.getByText('tab3')
        fireEvent.click(thirdTab)
        expect(thirdTab).toHaveClass('is-active')
        expect(wrapper.getByText('这是Tab3的内容')).toBeVisible()
        expect(activeTab).not.toHaveClass('is-active')
        expect(activePane).not.toBeVisible()
        expect(testProps.onChange).toHaveBeenCalled()
    })

})