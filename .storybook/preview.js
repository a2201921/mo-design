import React from "react";
import {addDecorator, addParameters} from '@storybook/react'
import '../src/styles/index.scss';
import {withInfo} from "@storybook/addon-info";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const wrapperStyle = React.CSSProperties = {
    padding: '20px 40px'
}

const storyWrapper = (storyFn) => (
    <div style={wrapperStyle}>
        <h3>组件演示</h3>
        {storyFn()}
    </div>
)

addParameters({info: {inline: true,header: false}})
addDecorator(withInfo)
addDecorator(storyWrapper)
export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
}