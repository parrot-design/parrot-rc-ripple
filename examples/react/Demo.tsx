import React from 'react';
import { Button } from '@material-ui/core';
import RippleBase from '../../src';

const Demo=()=>{
    return (
        <div>

            <Button variant="contained">Default</Button>

            <RippleBase color="red">
                <div style={{width:100,height:100}}>我是</div>
            </RippleBase>
            
        </div>
    )
}

export default Demo;