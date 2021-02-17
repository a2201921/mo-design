import React, {
    useState,
    createContext,
    cloneElement,
    FC,
    Children,
    CSSProperties,
    FunctionComponentElement
} from "react";
import {MenuItemProps} from './menuItem'
import classNames from "classnames";

type MenuModule = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
    /** 默认选中索引 */
    defaultIndex?: string,
    /** 菜单类型，现在支持垂直、水平二种*/
    mode?: MenuModule,
    /** 根节点样式*/
    style?: CSSProperties,
    /** 根节点样式*/
    className?: string,
    /** 被选中时调用*/
    onSelect?: SelectCallback,
    /** 初始展开的 SubMenu 菜单项 key 数组 */
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuModule;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

export const Menu: FC<MenuProps> = (props) => {
    const {className, mode, style, children, defaultIndex, defaultOpenSubMenus, onSelect} = props
    const [currentActive, setCurrentActive] = useState(defaultIndex)

    const classes = classNames('mo-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index: string) => {
        setCurrentActive(index)

        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    }

    const renderChildren = () => {
        return Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const {displayName} = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return cloneElement(childElement, {index: index.toString()})
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem')
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}
export default Menu;