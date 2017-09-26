import * as React from 'react';
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./Field.scss'));

export interface FormErrorType {}

export interface FormErrorProps extends React.Props<FormErrorType> {
    /** Hide error */
    hidden?: boolean;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * Form Error
 * 
 * @param props Control properties (defined in `FormErrorProps` interface)
 */
export const FormError: React.StatelessComponent<FormErrorProps> = (props: FormErrorProps) => {
    return (
        <div className={css('field-error', {
            'hidden': props.hidden
        }, props.className)}>
            {props.children}
        </div>
    );
};

export default FormError;
