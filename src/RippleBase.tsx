import React,{ useRef,useCallback,useState } from 'react';
import classnames from '@parrotjs/classnames';
import { useForkRef,useIsFocusVisible } from '@parrotjs/react-hooks';
import TouchRipple from './TouchRipple';
import { IRippleBaseProps } from '.';
import './index.scss';

const RippleBase=React.forwardRef((props:IRippleBaseProps,ref)=>{

    const {
        component:BaseRoot='div',
        componentName:customComponentName='ripplebase',
        prefixCls:customizePrefixCls='parrot',
        className,
        onClick,
        onFocus,
        onFocusVisible,
        onBlur,
        onKeyDown,
        onKeyUp,
        onMouseDown,
        onMouseLeave,
        onMouseUp,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        disabled=false,
        disableRipple=false,
        disableTouchRipple=false,
        focusRipple=false, 
        tabIndex,
        type,
        children,
        onContextMenu,
        TouchRippleProps,
        color
    }=props;

    const prefixCls=customizePrefixCls?`${customizePrefixCls}-${customComponentName}`:`parrot-${customComponentName}`;

    const divRef=useRef(null);

    const rippleRef=useRef(null);

    const {
        isFocusVisibleRef,
        onFocus:handleFocusVisible,
        onBlur:handleBlurVisible,
        ref:focusVisibleRef
    }=useIsFocusVisible();

    const [ focusVisible,setFocusVisible ]=useState(false);

    if(disabled && focusVisible){
        setFocusVisible(true);
    }

    React.useEffect(() => {
        isFocusVisibleRef.current = focusVisible;
    }, [focusVisible, isFocusVisibleRef]);

    const handleRef=useForkRef(ref,divRef,focusVisibleRef); 

    const useRippleHandler=(rippleAction: string,eventCallback: ((event: any) => void) | undefined,skipRippleAction=disableTouchRipple)=>{
        return useCallback((event) => { 
                eventCallback?.(event); 
                const ignore=skipRippleAction;
                if(!ignore && rippleRef.current){
                    (rippleRef.current as any)[rippleAction](event);
                }
                return true;
        },[])
    }

    const handleFocus=useCallback((event) => {
        if (!divRef.current) {
            divRef.current = event.currentTarget;
        }
        handleFocusVisible(event);

        if(isFocusVisibleRef.current===true){
            setFocusVisible(true);
            onFocusVisible?.(event);
        }
        onFocus?.(event);
    },[onFocus,onFocusVisible]);

    const handleBlur=useRippleHandler('stop',(event: any)=>{

        handleBlurVisible?.();

        if (isFocusVisibleRef.current === false) {
            setFocusVisible(false);
        }

        onBlur?.(event)
    },false);

    //记录是否被激活
    const keydownRef=useRef(false);
    const handleKeyDown=useCallback((event) => {
        //检查是否已经被激活keydown事件可能会被激活多次
        keydownRef.current = true;
        onKeyDown?.(event);
    },[onKeyDown])

    const handleKeyUp=useCallback((event) => {
        keydownRef.current = false;
        onKeyUp?.(event);
    },[onKeyUp])

    const handleContextMenu=useRippleHandler('stop',onContextMenu);

    const handleMouseDown=useRippleHandler('start',onMouseDown);
    const handleMouseLeave=useRippleHandler('stop',(event: any)=>{
        onMouseLeave?.(event);
    });
    const handleMouseUp=useRippleHandler('stop',onMouseUp);

    const handleTouchStart=useRippleHandler('start',onTouchStart);
    const handleTouchEnd=useRippleHandler('stop',onTouchEnd);
    const handleTouchMove=useRippleHandler('stop',onTouchMove);

    const [mountedState, setMountedState] = React.useState(false);

    React.useEffect(() => {
        setMountedState(true);
    }, []);

    const enableTouchRipple=mountedState && !disableRipple && !disabled;

    return (
        <BaseRoot
            className={classnames(prefixCls,className,{
                ['disabled']:disabled
            })}
            ref={handleRef}
            onClick={onClick}
            onContextMenu={handleContextMenu} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            tabIndex={disabled?-1:tabIndex}
            type={type}
        >
            {children}
            {enableTouchRipple?(
                <TouchRipple ref={rippleRef} prefixCls={customizePrefixCls} {...TouchRippleProps} />
            ):null}
        </BaseRoot>
    )
})

export default React.memo(RippleBase);