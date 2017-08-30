import * as React from 'react';
import * as classNames from 'classnames/bind';
import { TextField } from '../../Form';

export const FormTest = () => {
    
    const out1 = () => {
        return (
            <TextField label='Coming soon!'>
            </TextField>
        );
    };

    const out2 = () => {
        return (
            <TextField label='Coming soon!' required>
            </TextField>
        );
    };

    const out3 = () => {
        return (
            <TextField label='Coming soon!' disabled>
            </TextField>
        );
    };

    const out4 = () => {
        return (
            <TextField label='Coming soon!' placeholder='Coming!' initialValue='testing'>
            </TextField>
        );
    };

    const out5 = () => {
        return (
            <TextField label='Coming s!' placeholder='email' >
            </TextField>
        );
    };

    return (
        <div>
            {out1()}
            {out2()}
            {out3()}
            {out4()}
            {out5()}
        </div>
    );
};
