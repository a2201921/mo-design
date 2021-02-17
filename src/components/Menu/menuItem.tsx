import React, {useContext} from "react";
import classNames from "classnames";
import {MenuContext} from "./menu";

export interface MenuItemProps {
    /** item的唯一标记 */
    index?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** item根节点额外样式 */
    className?: string;
    /** 根节点样式 */
    style?: React.CSSProperties;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {index, disabled, className, style, children} = props

    const context = useContext(MenuContext)

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })

    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>{children}</li>
    )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem