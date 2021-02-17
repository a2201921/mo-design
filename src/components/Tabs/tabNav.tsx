import React, {
    Children,
    FC,
    FunctionComponentElement,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState
} from "react";
import classNames from "classnames";
import {TabPaneProps} from "./tabPane";

interface TabNavProps {
    panels: ReactNode;
    activeKey: string;
    onTabClick: (key: string) => void
}

export const TabNav: FC<TabNavProps> = (props) => {
    const {panels, onTabClick, activeKey} = props
    const tabRef = useRef<HTMLDivElement>(null)
    const [left, setLeft] = useState(0)
    const [width, setWidth] = useState(0)
    const renderPanels = () => {
        return Children.map(panels, (childElement) => {
            const child = childElement as FunctionComponentElement<TabPaneProps>
            const {tab, order, disabled} = child.props
            if (!child) return

            const handleClick = (e: React.MouseEvent) => {
                if (disabled) return;

                if (order === activeKey) return;
                getInrbarStyle(e.target as HTMLDivElement)
                onTabClick(order)
            }

            const classnames = classNames('mo-tabs-tab', {
                'is-disabled': disabled,
                'is-active': activeKey === order
            })
            return <div ref={activeKey === order ? tabRef : null} className={classnames}
                        onClick={handleClick}>{tab}</div>
        })
    }

    const getInrbarStyle = (e: HTMLDivElement) => {
        let {offsetLeft, clientWidth} = e
        setLeft(offsetLeft)
        setWidth(clientWidth)
    }

    useEffect(() => {
        if (tabRef.current) {
            getInrbarStyle(tabRef.current)
        }
    }, [])

    return (<div className="mo-tabs-bar">
        <div className="mo-tabs-nav">
            {renderPanels()}
            <div className="mo-tabs-ink-bar" style={{left: `${left}px`, width: `${width}px`}}></div>
        </div>
    </div>)
}
export default TabNav;