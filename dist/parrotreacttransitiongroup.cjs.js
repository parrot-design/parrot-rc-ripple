'use strict';

var React = require('react');
var classnames = require('@parrotjs/classnames');
var reactHooks = require('@parrotjs/react-hooks');
var reactTransitionGroup = require('@parrotjs/react-transition-group');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classnames__default = /*#__PURE__*/_interopDefaultLegacy(classnames);

const Ripple = (props) => {
    const { prefixCls: customizedPrefixCls, componentName = 'ripple', className, rippleSize, rippleY, rippleX, visible: visibleProp, pulsate = false, onExited, timeout } = props;
    const prefixCls = `${customizedPrefixCls}-${componentName}`;
    const [leaving, setLeaving] = React.useState(false);
    const rippleStyles = {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX,
    };
    const rippleClassName = classnames__default['default'](prefixCls, className, `${prefixCls}--visible`);
    const childClassName = classnames__default['default'](`${prefixCls}-child`, {
        [`${prefixCls}-child--leaving`]: leaving,
        [`${prefixCls}-child--pulsate`]: pulsate
    });
    if (!visibleProp && !leaving) {
        setLeaving(true);
    }
    React__default['default'].useEffect(() => {
        if (!visibleProp && onExited != null) {
            // react-transition-group#onExited
            const timeoutId = setTimeout(onExited, timeout);
            return () => {
                clearTimeout(timeoutId);
            };
        }
        return undefined;
    }, [onExited, timeout, visibleProp]);
    return (React__default['default'].createElement("span", { className: classnames__default['default'](rippleClassName), style: rippleStyles },
        React__default['default'].createElement("span", { className: childClassName })));
};

const DURATION = 550;
const TouchRipple = React__default['default'].forwardRef((props, ref) => {
    const { component: TouchRippleRoot = 'span', prefixCls: customizedPrefixCls, componentName = 'touchripple', center: centerProp } = props;
    const prefixCls = `${customizedPrefixCls}-${componentName}`;
    //ripple的key
    const nextKey = React__default['default'].useRef(0);
    const rippleCallback = React.useRef(null);
    const [ripples, setRipples] = React.useState([]);
    const container = React.useRef(null);
    React__default['default'].useEffect(() => {
        if (rippleCallback.current) {
            rippleCallback.current();
            rippleCallback.current = null;
        }
    }, [ripples]);
    const startCommit = React.useCallback((params) => {
        const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
        setRipples((oldRipples) => [
            ...oldRipples,
            React__default['default'].createElement(Ripple, { key: nextKey.current, timeout: DURATION, pulsate: pulsate, rippleX: rippleX, rippleY: rippleY, rippleSize: rippleSize, prefixCls: customizedPrefixCls })
        ]);
        nextKey.current += 1;
        rippleCallback.current = cb;
    }, [customizedPrefixCls]);
    const stop = React.useCallback((event, cb) => {
        setRipples((oldRipples) => {
            if (oldRipples.length > 0) {
                return oldRipples.slice(1);
            }
            return oldRipples;
        });
        rippleCallback.current = cb;
    }, []);
    const start = React.useCallback((event = {}, options = {}, cb) => {
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
    React__default['default'].useImperativeHandle(ref, () => ({
        start,
        stop
    }), [start, stop]);
    return (React__default['default'].createElement(TouchRippleRoot, { className: classnames__default['default'](prefixCls), ref: container },
        React__default['default'].createElement(reactTransitionGroup.TransitionGroup, { component: null }, ripples)));
});
var TouchRipple$1 = React__default['default'].memo(TouchRipple);

const RippleBase = React__default['default'].forwardRef((props, ref) => {
    const { component: BaseRoot = 'div', componentName: customComponentName = 'ripplebase', prefixCls: customizePrefixCls = 'parrot', className, onClick, onFocus, onFocusVisible, onBlur, onKeyDown, onKeyUp, onMouseDown, onMouseLeave, onMouseUp, onTouchStart, onTouchEnd, onTouchMove, disabled = false, disableRipple = false, disableTouchRipple = false, focusRipple = false, tabIndex, type, children, onContextMenu, TouchRippleProps, style } = props;
    const prefixCls = customizePrefixCls ? `${customizePrefixCls}-${customComponentName}` : `parrot-${customComponentName}`;
    const divRef = React.useRef(null);
    const rippleRef = React.useRef(null);
    const { isFocusVisibleRef, onFocus: handleFocusVisible, onBlur: handleBlurVisible, ref: focusVisibleRef } = reactHooks.useIsFocusVisible();
    const [focusVisible, setFocusVisible] = React.useState(false);
    if (disabled && focusVisible) {
        setFocusVisible(true);
    }
    React__default['default'].useEffect(() => {
        isFocusVisibleRef.current = focusVisible;
    }, [focusVisible, isFocusVisibleRef]);
    const handleRef = reactHooks.useForkRef(ref, divRef, focusVisibleRef);
    const useRippleHandler = (rippleAction, eventCallback, skipRippleAction = disableTouchRipple) => {
        return React.useCallback((event) => {
            eventCallback === null || eventCallback === void 0 ? void 0 : eventCallback(event);
            const ignore = skipRippleAction;
            if (!ignore && rippleRef.current) {
                rippleRef.current[rippleAction](event);
            }
            return true;
        }, []);
    };
    const handleFocus = React.useCallback((event) => {
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
    const keydownRef = React.useRef(false);
    const handleKeyDown = React.useCallback((event) => {
        //检查是否已经被激活keydown事件可能会被激活多次
        keydownRef.current = true;
        onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
    }, [onKeyDown]);
    const handleKeyUp = React.useCallback((event) => {
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
    const [mountedState, setMountedState] = React__default['default'].useState(false);
    React__default['default'].useEffect(() => {
        setMountedState(true);
    }, []);
    const enableTouchRipple = mountedState && !disableRipple && !disabled;
    return (React__default['default'].createElement(BaseRoot, { className: classnames__default['default'](prefixCls, className, {
            ['disabled']: disabled
        }), ref: handleRef, onClick: onClick, onContextMenu: handleContextMenu, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp, onMouseDown: handleMouseDown, onMouseLeave: handleMouseLeave, onMouseUp: handleMouseUp, onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, onTouchMove: handleTouchMove, tabIndex: disabled ? -1 : tabIndex, type: type, style: style },
        children,
        enableTouchRipple ? (React__default['default'].createElement(TouchRipple$1, Object.assign({ ref: rippleRef, prefixCls: customizePrefixCls }, TouchRippleProps))) : null));
});
var RippleBase$1 = React__default['default'].memo(RippleBase);

module.exports = RippleBase$1;
