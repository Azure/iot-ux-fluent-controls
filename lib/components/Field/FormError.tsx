import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, Elements as Attr} from '../../Attributes';
import { Icon, IconSize } from '../Icon';
const css = classNames.bind(require('./Field.module.scss'));

export interface FormErrorType {}

export interface FormErrorAttributes {
    container?: DivProps;
}

export interface FormErrorProps extends React.Props<FormErrorType> {
    /** Title tag for error in case of overflow */
    title?: string;
    /** Hide error */
    hidden?: boolean;
    /** Hide error badge icon */
    hideIcon?: boolean;

    /** Classname to append to top level element */
    className?: string;

    /** Label to be announced before the error message to announce to the user that there's an error */
    ariaLabel?: string;

    attr?: FormErrorAttributes;
}

/**
 * Form Error
 *
 * @param props Control properties (defined in `FormErrorProps` interface)
 */
export const FormError: React.StatelessComponent<FormErrorProps> = (props: FormErrorProps) => {
    return (
        <Attr.div
            className={css('field-error', {
                hidden: props.hidden
            }, props.className)}
            attr={props.attr.container}
        >
            {props.children 
                ? <>
                    {!props.hideIcon && <Icon icon='errorBadge' size={IconSize.small} className={css('error-badge')} attr={{ container: { title: props.title, 'aria-label': props.ariaLabel }}} />}
                    <span className={css('inline-text-overflow', 'error-content')} title={props.title}>{props.children}</span>
                </>
                : null
            }
        </Attr.div>
    );
};

FormError.defaultProps = {
    ariaLabel: 'error',
    attr: {
        container: {}
    }
};

export default FormError;
