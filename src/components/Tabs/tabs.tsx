import React, {FC, useState} from "react";
import PropTypes from 'prop-types';
import TabNav from "./tabNav";
import TabContent from "./tabContent";

export interface TabsProps {
    /** 当前激活key */
    activeKey?: string;
    /** 默认激活key */
    defaultActiveKey?: string;
    /** 点击触发改变时的回调 */
    onChange?: (key: string) => void;
}

export const Tabs: FC<TabsProps> = (props) => {
    const {activeKey, defaultActiveKey, onChange, children} = props

    const [activeIndex, setActiveIndex] = useState(activeKey || defaultActiveKey || '0')

    const handleChange = (key: string) => {
        setActiveIndex(key)
        onChange && onChange(key)
    }


    return <div className="mo-tabs">
        <TabNav panels={children} onTabClick={handleChange} activeKey={activeIndex}/>
        <TabContent panels={children} activeKey={activeIndex}/>
    </div>
}

Tabs.defaultProps = {
    activeKey: '0'
}

Tabs.propTypes = {
    activeKey: PropTypes.string.isRequired
}
export default Tabs;