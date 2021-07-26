import React, { useState, useRef, useCallback } from 'react';
import { ITouchRippleProps } from '.'
import { TransitionGroup } from '@parrotjs/react-transition-group';
import Ripple from './Ripple';
import classnames from '@parrotjs/classnames';

const DURATION = 550;

const TouchRipple = React.forwardRef((props: ITouchRippleProps, ref) => {

    const {
        component: TouchRippleRoot = 'span',
        prefixCls: customizedPrefixCls,
        componentName = 'touchripple',
        center: centerProp
    } = props;

    const prefixCls = `${customizedPrefixCls}-${componentName}`;

    //ripple的key
    const nextKey = React.useRef(0);

    const rippleCallback = useRef<any>(null);

    const [ripples, setRipples] = useState<any>([]);

    const container = useRef(null);

    React.useEffect(() => {
        if (rippleCallback.current) {
            rippleCallback.current();
            rippleCallback.current = null;
        }
    }, [ripples]);

    const startCommit = useCallback(
        (params) => {
            const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
            setRipples((oldRipples: any) => [
                ...oldRipples,
                <Ripple
                    key={nextKey.current}
                    timeout={DURATION}
                    pulsate={pulsate}
                    rippleX={rippleX}
                    rippleY={rippleY}
                    rippleSize={rippleSize}
                    prefixCls={customizedPrefixCls}
                />
            ]);
            nextKey.current += 1;
            rippleCallback.current = cb;
        },
        [customizedPrefixCls],
    );

    const stop=useCallback(
        (event, cb) => {
            setRipples((oldRipples: string | any[])=>{
                if(oldRipples.length>0){
                    return oldRipples.slice(1);
                }
                return oldRipples;
            })
            rippleCallback.current = cb;
        },
        []
    );

    const start = useCallback((event = {}, options = {}, cb) => {
        const {
            pulsate = false,
            center = centerProp || options.pulsate,
            fakeElement = false, // For test purposes
        } = options;

        const element:any = fakeElement ? null : container.current;
        const rect:any = element ? (element as any).getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };

        //获取ripple组件的大小
        let rippleX;
        let rippleY;
        let rippleSize;

        if (center || (event.clientX === 0 && event.clientY === 0) || (!event.clientX && !event.touches)) {
            rippleX = Math.round(rect.width / 2);
            rippleY = Math.round(rect.height / 2);
        } else {
            const { clientX, clientY } = event.touches ? event.touches[0] : event;
            rippleX = Math.round(clientX - rect.left);
            rippleY = Math.round(clientY - rect.top);
        }

        if (center) {
            let radius = Math.sqrt(Math.pow(rippleX, 2) + Math.pow(rippleY, 2));
            rippleSize = radius * 2;
        } else {
            //取最长的宽度
            const sizeX =
                Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX);
            const sizeY =
                Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY);
            rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2) * 2;
        }
        startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });

    }, [startCommit, centerProp]);

    React.useImperativeHandle(
        ref,
        ()=>({
            start,
            stop
        }),
        [start,stop]
    );

    return (
        <TouchRippleRoot
            className={classnames(prefixCls)}
            ref={container}
        >
            <TransitionGroup component={null}>
                {ripples}
            </TransitionGroup>
        </TouchRippleRoot>
    )
});

export default React.memo(TouchRipple);