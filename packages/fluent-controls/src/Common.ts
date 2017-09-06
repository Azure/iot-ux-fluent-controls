import * as React from 'react';

export type MethodNode = React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactChildren | React.ReactNode;

export interface FormOption {
    /** Text label to show as the select box option */
    label: MethodNode;
    /** Value of select box option */
    value: any;
}
