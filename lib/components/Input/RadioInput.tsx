import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, InputProps, LabelProps, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./RadioInput.module.scss'));

export interface RadioInputType {}

export interface RadioInputState {
    cancelFocused: boolean;
}

export interface RadioInputAttributes {
    container?: DivProps;
    label?: LabelProps;
    input?: InputProps;
    radio?: SpanProps;
    text?: SpanProps;
    fill?: SpanProps;
    border?: SpanProps;
}

export interface RadioInputProps extends React.Props<RadioInputType> {
    /** HTML form element name */
    name: string;
    /** Value of HTML input element */
    value: string;
    /** Label for HTML input element */
    label: MethodNode;

    /** Allow multiple columns for radio button */
    columns?: boolean;
    /** Checked */
    checked?: boolean;
    /** Add required attribute to HTML input element */
    required?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;
    /** Hide HTML input element */
    hidden?: boolean;
    /** Autofocus */
    autoFocus?: boolean;

    /** Callback for HTML radio button element onChange events */
    onChange: (newValue: string) => void;

    /** Classname to append to top level element */
    className?: string;

    attr?: RadioInputAttributes;
}

/**
 * Low level radio button control
 *
 * (Use the `RadioField` control instead when making a form with standard styling)
 *
 * @param props Control properties (defined in `RadioInputProps` interface)
 */
export const RadioInput: React.StatelessComponent<RadioInputProps> = (props: RadioInputProps) => {
    const classes = {'disabled': props.disabled, 'selected': props.checked};
    const containerClass = css('radio-container', {
        'columns': props.columns,
        'hidden': props.hidden
    }, props.className);

    const id = `${props.name}_${props.value}`;

    const onClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        props.onChange(props.value);
    };

    return (
        <Attr.div className={containerClass} attr={props.attr.container}>
            <Attr.label
                className={css('radio-label', classes)}
                htmlFor={id}
                onClick={stopPropagation}
                attr={props.attr.label}
            >
                <div className={css('radio-wrapper')}>
                    <Attr.input
                        id={id}
                        type='radio'
                        value={props.value}
                        name={props.name}
                        disabled={props.disabled}
                        hidden={props.hidden}
                        checked={props.checked}
                        onChange={onClick}
                        autoFocus={props.autoFocus}
                        required={props.required}
                        attr={props.attr.input}
                    />
                    <Attr.span
                        className={css('radio-button', classes)}
                        attr={props.attr.radio}
                    />
                    <Attr.span
                        className={css('radio-fill', classes)}
                        attr={props.attr.fill}
                    />
                </div>
                <Attr.span
                    className={css('radio-text')}
                    attr={props.attr.text}
                >
                    {props.label}
                </Attr.span>
            </Attr.label>
        </Attr.div>
    );
};

function stopPropagation(e: React.MouseEvent<HTMLElement>) {
    // HACK! If we don't add this click event handler to the label, React never
    // fires the input onChange handler in IoT Central.
    e.stopPropagation();
}

RadioInput.defaultProps = {
    name: undefined,
    value: undefined,
    label: undefined,
    onChange: undefined,
    columns: false,
    hidden: false,
    attr: {
        container: {},
        label: {},
        input: {},
        radio: {},
        text: {},
        fill: {},
        border: {},
    }
};

export default RadioInput;
