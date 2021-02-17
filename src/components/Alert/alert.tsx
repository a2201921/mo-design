import React, {FC, useState} from 'react'
import classNames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";

export type AlertType = 'default' | 'success' | 'danger' | 'warning';

export interface AlertProps {
    /** 默认不显示关闭按钮 */
    closable?: boolean;
    /**  警告提示的辅助性文字介绍 */
    description?: string;
    /**  警告提示内容  */
    message: string;
    /**  指定警告提示的样式  */
    type?: AlertType;
    /** 关闭时触发的回调函数 */
    onClose?: Function;
}

export const Alert: FC<AlertProps> = (props) => {
    const {message, description, type, closable, onClose} = props
    const [show, setShow] = useState(true)
    const classes = classNames('mo-alert', {
        [`mo-alert-${type}`]: type
    })

    const handleClose = () => {
        setShow(false)
        onClose && onClose()
    }

    // Example ofinfo-circle
    return <Transition timeout={200} in={show} animation="zoom-in-top">
        <div className={classes}>
            {closable && <Icon icon="times" className="mo-alert-close-icon" onClick={handleClose}/>}
            <div className="mo-alert-message">
                {message}</div>
            {description && <div className="mo-alert-description">{description}</div>}
        </div>
    </Transition>
}

Alert.defaultProps = {
    closable: false,
    type: 'default'
}

export default Alert;