import * as React from 'react';

export type MethodNode = React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactChildren | React.ReactNode;

export interface LabelOption {
    /** Text label to show */
    label: MethodNode;
    /** Label be hidden */
    hidden?: boolean;
    /** Label be disabled */
    disabled?: boolean;
}

export interface FormOption extends LabelOption {
    /** Value of select box option */
    value: any;
}

export interface LinkOption extends LabelOption {
    /** Anchor href */
    href: string;
    /** Anchor onclick */
    onClick?: (event) => void;
    /** Accessibility title */
    title?: string;
}

export interface PivotOption extends LinkOption {
    /** Pivot item icon */
    icon?: string;
    /** Pivot key (used for selecting active Pivot) */
    key: string;
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
