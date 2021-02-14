import React from "react";
import {storiesOf} from "@storybook/react";
import Icon from "./icon";

const simpleComplete = () => {
    return <Icon icon="spinner"/>
}

storiesOf('Icon Component', module)
    .add('Icon simple', simpleComplete)