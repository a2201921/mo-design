import React, {FC, ReactNode} from "react";
import classNames from "classnames";

export interface TabPaneProps {
    /** pane的唯一表示 */
    order: string
    /** 选项卡头显示文字 */
    tab: string|ReactNode
    /** 是否禁用 */
    disabled?: boolean;
    /** 当前是否激活 */
    isActive?: boolean;
}

export const TabPane: FC<TabPaneProps> = (props) => {
    const {isActive, children} = props

    const classnames = classNames('mo-tabs-pane', {
        'is-active': isActive
    })
    return <div className={classnames}>{children}</div>
}

TabPane.displayName = "TabPane"

export default TabPane;