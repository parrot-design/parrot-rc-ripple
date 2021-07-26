import React, { useState } from 'react';
import { IRippleProps } from '.';
import classnames from '@parrotjs/classnames';

const Ripple = (props: IRippleProps) => {

    const {
        prefixCls: customizedPrefixCls,
        componentName='ripple',
        className,
        rippleSize,
        rippleY,
        rippleX,
        visible: visibleProp,
        pulsate = false,
        onExited,
        timeout
    } = props;

    const prefixCls = `${customizedPrefixCls}-${componentName}`;

    const [leaving, setLeaving] = useState(false);

    const rippleStyles = {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX,
    };

    const rippleClassName=classnames(
        prefixCls,
        className,
        `${prefixCls}--visible`
    )

    const childClassName = classnames(
        `${prefixCls}-child`,
        {
            [`${prefixCls}-child--leaving`]: leaving,
            [`${prefixCls}-child--pulsate`]: pulsate
        }
    );
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
    }, [onExited, timeout, visibleProp])

    return (
        <span
            className={classnames(rippleClassName)}
            style={rippleStyles}
        >
            <span className={childClassName} />
        </span>
    )

}

export default Ripple;