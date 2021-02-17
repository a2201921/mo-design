import React from "react";
import {storiesOf} from "@storybook/react";
import Progress from "./progress";

const baseProgress = () => (<Progress percent={30} strokeHeight={20} showText/>)

const progressWithTheme = () => (
    <>
        <Progress percent={50}  theme="primary" />
        <Progress percent={30}  theme="success" />
        <Progress percent={30}  theme="danger" />
        <Progress percent={30}  theme="info" />
        <Progress percent={30}  theme="light" />
        <Progress percent={30}  theme="dark" />
        <Progress percent={30}  theme="secondary" />
    </>
)

storiesOf('Progress Component', module)
    .add('Progress', baseProgress)
    .add('不同主题的 Progress', progressWithTheme)