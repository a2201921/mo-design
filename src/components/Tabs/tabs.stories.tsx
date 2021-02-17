import React from "react";
import {storiesOf} from "@storybook/react";
import Tabs from "./tabs";
import TabPane from "./tabPane";

const defaultTabs = () => (<Tabs>
    <TabPane tab="tab1" order="0">这是Tab1的内容</TabPane>
    <TabPane tab="tab2" order="1" disabled>这是Tab2的内容</TabPane>
    <TabPane tab="tab3" order="2">这是Tab3的内容</TabPane>
</Tabs>)

storiesOf('Tabs Component', module)
    .add('default tabs', defaultTabs)