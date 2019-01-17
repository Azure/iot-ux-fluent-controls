import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Icon } from '../Icon';
import TextInput, { TextInputType, TextInputAttributes } from '../Input/TextInput';
import { ActionTriggerButton } from '../ActionTrigger';
import { throws } from 'assert';
const css = classNames.bind(require('./SearchInput.module.scss'));

export const prefixClassName = css('prefix-addon');
export const postfixClassName = css('postfix-addon');



export interface SearchInputProps extends React.Props<TextInputType> {
    label: string;
    onClick: (event: any) => void;
    onChange: (event: any) => void;
    value: string;
    containerClassName?: string;
    inputClassName?: string;
    attr?: TextInputAttributes;
}


export class SearchInput extends React.PureComponent<SearchInputProps> {

    public static defaultProps: Partial<SearchInputProps> = {
        label: undefined,
        value: undefined,
        onChange: undefined,
        onClick: undefined
    };

    render() {

        const postfix = (
            this.props.value
                ? <ActionTriggerButton onClick={this.props.onClick} icon='forward' className={css('search-button')} attr={{ container: this.props.attr ? this.props.attr.postfix : null }} />
                : null
        );

        return (
            <div className={css('search-input-container', this.props.containerClassName)}>
                <Icon icon='search' className={css('search-prefix-icon')} />
                <TextInput
                    name='search-input'
                    value={this.props.value == null ? '' : this.props.value}
                    className={css('search-input', this.props.inputClassName)}
                    onChange={this.props.onChange}
                    placeholder={this.props.label}
                    postfix={postfix}
                    postfixClassName={css('search-button-container')}
                    attr={{
                        input: { className: css('input-component'), autoComplete: 'off' }
                    }}
                />

            </div>
        );
    }
}

export default SearchInput;
