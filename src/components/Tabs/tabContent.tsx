import React, {Children, cloneElement, FC, FunctionComponentElement, ReactNode} from "react";
import {TabPaneProps} from "./tabPane";

interface TabContentProps {
    panels: ReactNode;
    activeKey: string;
}

export const TabNav: FC<TabContentProps> = (props) => {
    const {panels, activeKey} = props

    const renderPanels = () => {
        return Children.map(panels, childElement => {
            const child = childElement as FunctionComponentElement<TabPaneProps>
            if (child.type.displayName === 'TabPane') {
                return cloneElement(child, {
                    isActive: child.props.order === activeKey
                })
            } else {
                console.error('Warning: Tabs has a child which is not a TabPane')
            }
        })
    }

    return (<div className="mo-tabs-content">
        {renderPanels()}
    </div>)
}
export default TabNav;