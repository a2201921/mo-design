import React, {FC} from "react";
import Tabs, {TabsProps} from "./tabs";
import TabPane, {TabPaneProps} from "./tabPane";

export type ITabsComponent = FC<TabsProps> & {
    Pane: FC<TabPaneProps>
}

const TransTabs = Tabs as ITabsComponent
TransTabs.Pane = TabPane

export default TransTabs