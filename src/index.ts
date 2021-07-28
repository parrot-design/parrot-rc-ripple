import React, { ReactElement } from "react";

export { default } from './RippleBase';

export interface IRippleBaseProps{
    component?:any;
    prefixCls?:string;
    componentName?:string;
    className?:string;
    onClick?:(event?:any)=>void;
    onFocus?:(event?:any)=>void;
    onFocusVisible?:(event?:any)=>void;
    onBlur?:(event:any)=>void;
    onKeyDown?:(event:any)=>void;
    onKeyUp?:(event:any)=>void;
    onMouseDown?:(event:any)=>void;
    onMouseLeave?:(event:any)=>void;
    onMouseUp?:(event:any)=>void;
    onTouchStart?:(event:any)=>void;
    onTouchEnd?:(event:any)=>void;
    onTouchMove?:(event:any)=>void;
    disabled?:boolean;
    disableRipple?:boolean;
    disableTouchRipple?:boolean;
    focusRipple?:boolean;
    tabIndex?:number;
    type?:string;
    children?:ReactElement|any;
    onContextMenu?:()=>void;
    TouchRippleProps?:any;
    color?:string;
    style?:React.CSSProperties;
}

export interface ITouchRippleProps{
    component?:any;
    prefixCls:string;
    componentName?:string;
    center?:boolean;
}

export interface IRippleProps{
    prefixCls?:string;
    className?:string;
    rippleSize:number;//涟漪宽度
    rippleX:number;//涟漪向左偏移量
    rippleY:number;//涟漪向上偏移量
    visible?:boolean;//节点消失隐藏
    pulsate?:boolean;
    onExited?:Function;
    timeout?:number;
    componentName?:string;
}