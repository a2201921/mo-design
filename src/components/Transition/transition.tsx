import React from "react";
import {CSSTransitionProps} from "react-transition-group/CSSTransition";

const {CSSTransition} = require('react-transition-group')

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

interface TransitionProps {
    animation?: AnimationName,
    wrapper?: boolean
}

const Transition: React.FC<TransitionProps & CSSTransitionProps> = (props) => {
    const {children, classNames, animation, wrapper, ...restProps} = props

    return (
        <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}


Transition.defaultProps =
    {
        unmountOnExit: true,
        appear: true
    }

export default Transition
