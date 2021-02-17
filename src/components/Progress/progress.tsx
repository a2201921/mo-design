import React, {FC} from "react";
import {ThemeProps} from "../Icon/icon";

export interface ProgressProps {
    /**  百分比  */
    percent: number;
    /** 进度条线的宽度，单位 px */
    strokeHeight?: number;
    /** 显示进度值 */
    showText?: boolean;
    /** 补充样式 */
    styles?: React.CSSProperties;
    /** 主题色 */
    theme?: ThemeProps;
}

export const Progress: FC<ProgressProps> = (props) => {
    const {percent, strokeHeight, showText, styles, theme} = props
    return (
        <div className="mo-progress-bar" style={styles}>
            <div className="mo-progress-bar-outer" style={{height: `${strokeHeight}px`}}>
                <div className={`mo-progress-bar-inner color-${theme}`} style={{width: `${percent}%`}}>
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
}

export default Progress;