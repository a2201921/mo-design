import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from "./subMenu";

export const defaultMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => {
        action(`clicked ${index} item`)
    }}>
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

storiesOf('Menu Component', module)
    .add('Menu', defaultMenu)