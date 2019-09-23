import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps,  Elements as Attr} from '../../Attributes';
import {MethodNode, keyCode} from '../../Common';
import {HorizontalLoader} from '../Loader';
import {FormLabel, FormLabelAttributes} from './FormLabel';
import {FormError} from './FormError';
import { BalloonPosition, BalloonAlignment } from '../Balloon';
const css = classNames.bind(require('./Field.module.scss'));

export interface FormFieldType {}

export interface FormFieldAttributes {
    fieldContainer?: DivProps;
    fieldLabel?: FormLabelAttributes;
    fieldContent?: DivProps;
    fieldError?: DivProps;
    fieldTooltip?: {
        balloonPosition?: BalloonPosition;
        balloonAlignment?: BalloonAlignment;
    };
}

export interface FormFieldProps extends React.Props<FormFieldType> {
    /** HTML element name for label accessibility */
    name: string;
    /** Label to display above input element */
    label?: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Error HTML title in case of overflow */
    errorTitle?: string;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Appends a red asterisk to the label if it is a string */
    required?: boolean;
    /** Disable HTML input element */
    disabled?: boolean;
    /** Set error field to display: none */
    hideError?: boolean;
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level error element */
    errorClassName?: string;
    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;

    attr?: FormFieldAttributes;
}

export interface FormFieldState {
    tooltipVisible: boolean;
}

/**
 * High level generic form field
 *
 * @param props Control properties (defined in `FormFieldProps` interface)
 */
export class FormField extends React.PureComponent<FormFieldProps, FormFieldState> {
    static defaultProps = {
        name: undefined,
        label: undefined,
        loading: false,
        hideError: false,
        attr: {
            fieldContainer: {},
            fieldLabel: {},
            fieldContent: {},
            fieldError: {},
        }
    };

    private _self: React.RefObject<HTMLDivElement>;

    constructor(props: FormFieldProps) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this._self = React.createRef();
        this.state = {
            tooltipVisible: false
        };
    }

    handleKeyDown(e: React.KeyboardEvent<any>) {
        // if user pressed Alt + F1 open the tooltip
        if (e.altKey && e.keyCode === keyCode.f1) {
            this.setState({
                tooltipVisible: true
            });
            e.preventDefault();
            e.stopPropagation();
        // if the user pressed escape key, close the tooltip
        } else if (e.keyCode === keyCode.escape) {
            this.setState({
                tooltipVisible: false
            });
            e.preventDefault();
            e.stopPropagation();
        } else if (e.keyCode === keyCode.tab) {
            // BUG 3217787: if the user tabs out, close the tooltip and continue to default behavior:
            this.setState({
                tooltipVisible: false
            });
        }
    }

    handleBlur(e: FocusEvent) {
        if (!!e.relatedTarget && !this._self.current.contains(e.relatedTarget as HTMLElement)) {
            this.setState({
                tooltipVisible: false
            });
        }
    }

    render() {
        const props = this.props;
        const containerClass = css('input-container', {
            'input-error': !!props.error,
            'required': props.required && typeof(props.label) === 'string',
        }, props.className);

        let error = props.error;
        if (props.loading) {
            error = <HorizontalLoader dots={6} />;
        }

        return (
            <Attr.div
                methodRef={this._self}
                className={containerClass}
                attr={props.attr.fieldContainer}
                onBlur={this.handleBlur}
            >
                {(!!props.label) && <FormLabel
                    name={props.name}
                    icon='info'
                    balloon={props.tooltip}
                    attr={props.attr.fieldLabel}
                    required={props.required}
                    balloonExpanded={this.state.tooltipVisible}
                    farSide={props.labelFarSide}
                    disabled={props.disabled}
                    {...props.attr.fieldTooltip}
                >
                    {props.label}
                </FormLabel>}
                <Attr.div
                    className={css('content')}
                    attr={props.attr.fieldContent}
                    onKeyDown={this.handleKeyDown}
                >
                    {props.children}
                </Attr.div>
                <FormError
                    className={props.errorClassName}
                    hidden={props.hideError}
                    title={props.errorTitle}
                    attr={{container: {
                        'aria-live': 'polite', // this tags are for screen readers to read the error when it appears
                        'aria-atomic': 'true',
                        ...props.attr.fieldError }
                    }}
                >
                    {error}
                </FormError>
            </Attr.div>
        );
    }
}

export default FormField;
