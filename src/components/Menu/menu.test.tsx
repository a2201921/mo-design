import React from 'react'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from './subMenu';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
library.add(faAngleDown)
const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test',
    mode: 'horizontal'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['4']
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>link3</MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>drop1</MenuItem>
                <MenuItem>drop2</MenuItem>
                <MenuItem>drop3</MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>opened1</MenuItem>
            </SubMenu>
        </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
    .mo-submenu {
        display: none;
    }
    .mo-submenu.menu-opened {
        display: block;
    }
    `
    const style = document.createElement('style')
    style.innerHTML = cssFile
    return style
}



let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('mo-menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('link3')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })

    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeInTheDocument()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
})



describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        wrapper2 = render(generateMenu(testVerProps))
        wrapper2.container.append(createStyleFile())
    })
    it('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper2.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on subMenu for vertical mode', () => {
        expect(wrapper2.queryByText('drop1')).not.toBeInTheDocument()
        fireEvent.click(wrapper2.getByText('dropdown'))
        expect(wrapper2.queryByText('drop1')).toBeVisible()
    })
    it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
        expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
})