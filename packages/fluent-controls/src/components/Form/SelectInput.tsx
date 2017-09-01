import * as React from 'react'; 
import * as classNames from 'classnames/bind';
const cssName = classNames.bind(require('./SelectInput.scss'));

export interface SelectInputType {}

export interface SelectInputState {
    cancelFocused: boolean;
}

export interface SelectOption {
    label: string;
    value: any;
}

export interface SelectInputProps extends React.Props<SelectInputType> {
    name: string;
    value: any;
    options: SelectOption[];
    
    error?: boolean;
    disabled?: boolean;

    onChange: (newValue: any) => void;
}

export const SelectInput = (props: SelectInputProps) => {
    const containerClass = cssName('combo-container');
    const comboClass = cssName(
        'combo', {'error': props.error}
    );
    const arrowClassName = cssName(
        'arrow', 'icon icon-chevronDown4Legacy'
    );

    let value;
    const options = props.options.map((opt, index) => {
        if (opt.value === props.value) {
            value = index;
        }
        return <option value={index} key={index}>{opt.label}</option>;
    });

    const onChange = (event) => {
        const index = parseInt(event.target.value);
        const value = props.options[index].value;
        props.onChange(value);
    };

    return (
        <div className={containerClass}>
            <select 
                className={comboClass}
                value={value}
                onChange={onChange}
                disabled={props.disabled}
            >
                {options}
            </select>
            <span className={arrowClassName} />
        </div>
    );
};