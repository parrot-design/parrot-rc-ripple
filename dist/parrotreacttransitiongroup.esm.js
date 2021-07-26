import React, { useState, useRef, useCallback } from 'react';
import classnames from '@parrotjs/classnames';
import { useIsFocusVisible, useForkRef } from '@parrotjs/react-hooks';
import { TransitionGroup } from '@parrotjs/react-transition-group';

const Ripple = (props) => {
    const { prefixCls: customizedPrefixCls, componentName = 'ripple', className, rippleSize, rippleY, rippleX, visible: visibleProp, pulsate = false, onExited, timeout } = props;
    const prefixCls = `${customizedPrefixCls}-${componentName}`;
    const [leaving, setLeaving] = useState(false);
    const rippleStyles = {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX,
    };
    const rippleClassName = classnames(prefixCls, className, `${prefixCls}--visible`);
    const childClassName = classnames(`${prefixCls}-child`, {
        [`${prefixCls}-child--leaving`]: leaving,
        [`${prefixCls}-child--pulsate`]: pulsate
    });
    if (!visibleProp && !leaving) {
        setLeaving(true);
    }
    React.useEffect(() => {
        if (!visibleProp && onExited != null) {
            // react-transition-group#onExited
            const timeoutId = setTimeout(onExited, timeout);
            return () => {
                clearTimeout(timeoutId);
            };
        }
        return undefined;
    }, [onExited, timeout, visibleProp]);
    return (React.createElement("span", { className: classnames(rippleClassName), style: rippleStyles },
        React.createElement("span", { className: childClassName })));
};

const DURATION = 550;
const TouchRipple = React.forwardRef((props, ref) => {
    const { component: TouchRippleRoot = 'span', prefixCls: customizedPrefixCls, componentName = 'touchripple', center: centerProp } = props;
    const prefixCls = `${customizedPrefixCls}-${componentName}`;
    //ripple的key
    const nextKey = React.useRef(0);
    const rippleCallback = useRef(null);
    const [ripples, setRipples] = useState([]);
    const container = useRef(null);
    React.useEffect(() => {
        if (rippleCallback.current) {
            rippleCallback.current();
            rippleCallback.current = null;
        }
    }, [ripples]);
    const startCommit = useCallback((params) => {
        const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
        setRipples((oldRipples) => [
            ...oldRipples,
            React.createElement(Ripple, { key: nextKey.current, timeout: DURATION, pulsate: pulsate, rippleX: rippleX, rippleY: rippleY, rippleSize: rippleSize, prefixCls: customizedPrefixCls })
        ]);
        nextKey.current += 1;
        rippleCallback.current = cb;
    }, [customizedPrefixCls]);
    const stop = useCallback((event, cb) => {
        setRipples((oldRipples) => {
            if (oldRipples.length > 0) {
                return oldRipples.slice(1);
            }
            return oldRipples;
        });
        rippleCallback.current = cb;
    }, []);
    const start = useCallback((event = {}, options = {}, cb) => {
        const { pulsate = false, center = centerProp || options.pulsate, fakeElement = false, // For test purposes
         } = options;
        const element = fakeElement ? null : container.current;
        const rect = element ? element.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
        //获取ripple组件的大小
        let rippleX;
        let rippleY;
        let rippleSize;
        if (center || (event.clientX === 0 && event.clientY === 0) || (!event.clientX && !event.touches)) {
            rippleX = Math.round(rect.width / 2);
            rippleY = Math.round(rect.height / 2);
        }
        else {
            const { clientX, clientY } = event.touches ? event.touches[0] : event;
            rippleX = Math.round(clientX - rect.left);
            rippleY = Math.round(clientY - rect.top);
        }
        if (center) {
            let radius = Math.sqrt(Math.pow(rippleX, 2) + Math.pow(rippleY, 2));
            rippleSize = radius * 2;
        }
        else {
            //取最长的宽度
            const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX);
            const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY);
            rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2)) * 2;
        }
        startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
    }, [startCommit, centerProp]);
    React.useImperativeHandle(ref, () => ({
        start,
        stop
    }), [start, stop]);
    return (React.createElement(TouchRippleRoot, { className: classnames(prefixCls), ref: container },
        React.createElement(TransitionGroup, { component: null }, ripples)));
});
var TouchRipple$1 = React.memo(TouchRipple);

const RippleBase = React.forwardRef((props, ref) => {
    const { component: BaseRoot = 'div', componentName: customComponentName = 'ripplebase', prefixCls: customizePrefixCls = 'parrot', className, onClick, onFocus, onFocusVisible, onBlur, onKeyDown, onKeyUp, onMouseDown, onMouseLeave, onMouseUp, onTouchStart, onTouchEnd, onTouchMove, disabled = false, disableRipple = false, disableTouchRipple = false, focusRipple = false, tabIndex, type, children, onContextMenu, TouchRippleProps, color } = props;
    const prefixCls = customizePrefixCls ? `${customizePrefixCls}-${customComponentName}` : `parrot-${customComponentName}`;
    const divRef = useRef(null);
    const rippleRef = useRef(null);
    const { isFocusVisibleRef, onFocus: handleFocusVisible, onBlur: handleBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
    const [focusVisible, setFocusVisible] = useState(false);
    if (disabled && focusVisible) {
        setFocusVisible(true);
    }
    React.useEffect(() => {
        isFocusVisibleRef.current = focusVisible;
    }, [focusVisible, isFocusVisibleRef]);
    const handleRef = useForkRef(ref, divRef, focusVisibleRef);
    const useRippleHandler = (rippleAction, eventCallback, skipRippleAction = disableTouchRipple) => {
        return useCallback((event) => {
            eventCallback === null || eventCallback === void 0 ? void 0 : eventCallback(event);
            const ignore = skipRippleAction;
            if (!ignore && rippleRef.current) {
                rippleRef.current[rippleAction](event);
            }
            return true;
        }, []);
    };
    const handleFocus = useCallback((event) => {
        if (!divRef.current) {
            divRef.current = event.currentTarget;
        }
        handleFocusVisible(event);
        if (isFocusVisibleRef.current === true) {
            setFocusVisible(true);
            onFocusVisible === null || onFocusVisible === void 0 ? void 0 : onFocusVisible(event);
        }
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
    }, [onFocus, onFocusVisible]);
    const handleBlur = useRippleHandler('stop', (event) => {
        handleBlurVisible === null || handleBlurVisible === void 0 ? void 0 : handleBlurVisible();
        if (isFocusVisibleRef.current === false) {
            setFocusVisible(false);
        }
        onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
    }, false);
    //记录是否被激活
    const keydownRef = useRef(false);
    const handleKeyDown = useCallback((event) => {
        //检查是否已经被激活keydown事件可能会被激活多次
        keydownRef.current = true;
        onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
    }, [onKeyDown]);
    const handleKeyUp = useCallback((event) => {
        keydownRef.current = false;
        onKeyUp === null || onKeyUp === void 0 ? void 0 : onKeyUp(event);
    }, [onKeyUp]);
    const handleContextMenu = useRippleHandler('stop', onContextMenu);
    const handleMouseDown = useRippleHandler('start', onMouseDown);
    const handleMouseLeave = useRippleHandler('stop', (event) => {
        onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(event);
    });
    const handleMouseUp = useRippleHandler('stop', onMouseUp);
    const handleTouchStart = useRippleHandler('start', onTouchStart);
    const handleTouchEnd = useRippleHandler('stop', onTouchEnd);
    const handleTouchMove = useRippleHandler('stop', onTouchMove);
    const [mountedState, setMountedState] = React.useState(false);
    React.useEffect(() => {
        setMountedState(true);
    }, []);
    const enableTouchRipple = mountedState && !disableRipple && !disabled;
    return (React.createElement(BaseRoot, { className: classnames(prefixCls, className, {
            ['disabled']: disabled
        }), ref: handleRef, onClick: onClick, onContextMenu: handleContextMenu, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp, onMouseDown: handleMouseDown, onMouseLeave: handleMouseLeave, onMouseUp: handleMouseUp, onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, onTouchMove: handleTouchMove, tabIndex: disabled ? -1 : tabIndex, type: type },
        children,
        enableTouchRipple ? (React.createElement(TouchRipple$1, Object.assign({ ref: rippleRef, prefixCls: customizePrefixCls }, TouchRippleProps))) : null));
});
var RippleBase$1 = React.memo(RippleBase);

export default RippleBase$1;
