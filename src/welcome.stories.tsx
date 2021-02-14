import React from 'react'
import {Meta} from '@storybook/react/types-6-0';


export const Welcome = () => (<>
    <h1>欢迎来到 mo-design 组件库</h1>
    <h3>安装方式</h3>
    <code>npm install mo-design --save</code>
</>)

export default {
    title: 'Welcome',
    component: Welcome,
    parameters: {
        info: {inline: false}
    },
} as Meta;