import { ReactElement } from "react";
export { default } from './RippleBase';
export interface IRippleBaseProps {
    component?: any;
    prefixCls?: string;
    componentName?: string;
    className?: string;
    onClick?: (event?: any) => void;
    onFocus?: (event?: any) => void;
    onFocusVisible?: (event?: any) => void;
    onBlur?: (event: any) => void;
    onKeyDown?: (event: any) => void;
    onKeyUp?: (event: any) => void;
    onMouseDown?: (event: any) => void;
    onMouseLeave?: (event: any) => void;
    onMouseUp?: (event: any) => void;
    onTouchStart?: (event: any) => void;
    onTouchEnd?: (event: any) => void;
    onTouchMove?: (event: any) => void;
    disabled?: boolean;
    disableRipple?: boolean;
    disableTouchRipple?: boolean;
    focusRipple?: boolean;
    tabIndex?: number;
    type?: string;
    children?: ReactElement;
    onContextMenu?: () => void;
    TouchRippleProps?: any;
    color?: string;
}
export interface ITouchRippleProps {
    component?: any;
    prefixCls: string;
    componentName?: string;
    center?: boolean;
}
export interface IRippleProps {
    prefixCls?: string;
    className?: string;
    rippleSize: number;
    rippleX: number;
    rippleY: number;
    visible?: boolean;
    pulsate?: boolean;
    onExited?: Function;
    timeout?: number;
    componentName?: string;
}
