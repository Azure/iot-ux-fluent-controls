import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Alert, AlertType } from '../../Alert';

export const AlertTest = () => {
    
    const out1 = () => {
        return (
            <Alert icon='cancelLegacy'>
                This is an alert!
            </Alert>
        );
    };

    const out2 = () => {
        return (
            <Alert icon='cancelLegacy' type={AlertType.Information} onClose={() => { alert('it worked!'); }}>
                This is an alert! This is an alert! This is an alert! This is an alert!
            </Alert>
        );
    };

    const out3 = () => {
        return (
            <Alert icon='cancelLegacy' type={AlertType.Warning}>
            </Alert>
        );
    };

    const out4 = () => {
        return (
            <Alert icon='cancelLegacy' type={AlertType.Error}>
            </Alert>
        );
    };

    const out5 = () => {
        return (
            <Alert icon='cancelLegacy' onClose={() => { alert('it worked!'); }} multiline>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu eleifend ante, quis blandit arcu. In suscipit tempor eros eu suscipit. Nulla vel magna eu orci viverra consectetur. Donec feugiat tortor metus, in iaculis est gravida laoreet. Proin erat odio, laoreet a tempus et, interdum fermentum neque. Morbi at eros vitae tortor eleifend ultricies. Ut id auctor orci, sed scelerisque mauris. Nunc lacinia sapien sed vehicula ultricies. Donec cursus egestas consectetur. Maecenas ut dui id sem porttitor condimentum. Mauris quis quam est.
            </Alert>
        );
    };

    const wrapper = (el) => {
        return (
            <div style={{margin: '20px'}}>
                {el}
            </div>
        );
    };

    return (
        <div>
            {wrapper(out1())}
            {wrapper(out2())}
            {wrapper(out3())}
            {wrapper(out4())}
            {wrapper(out5())}
        </div>
    );
};
