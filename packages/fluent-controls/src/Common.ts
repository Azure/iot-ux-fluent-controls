import * as React from 'react';

export type MethodNode = React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactChildren | React.ReactNode;

export interface FormOption {
    /** Text label to show as the select box option */
    label: MethodNode;
    /** Value of select box option */
    value: any;
    /** Option should be hidden */
    hidden?: boolean;
    /** Option should be disabled */
    disabled?: boolean;
}

export const keyCode = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    escape: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

export const hasClassName = (target, className) => {
    return ` ${target.className} `.indexOf(` ${className} `) > -1;
};
