import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Icon } from '../Icon';
import TextInput, { TextInputType, TextInputAttributes } from '../Input/TextInput';
import { ActionTriggerButton } from '../ActionTrigger';
const css = classNames.bind(require('./SearchInput.module.scss'));

export const prefixClassName = css('prefix-addon');
export const postfixClassName = css('postfix-addon');

export interface SearchInputProps extends React.Props<TextInputType> {
    label: string;
    onSubmit: React.EventHandler<any>;
    onChange: (newValue: string) => void;
    value: string;
    containerClassName?: string;
    inputClassName?: string;
    attr?: TextInputAttributes;
}


export class SearchInput extends React.PureComponent<SearchInputProps> {
    render() {
        const postfix = (
            this.props.value
                ? <ActionTriggerButton onClick={this.props.onSubmit} icon='forward' className={css('search-button')} attr={{ 
                    button: { title: this.props.label, type: 'submit' },
                    container: this.props.attr ? this.props.attr.postfix : null 
                }} />
                : null
        );

        return (
            <form className={css('search-input-container', this.props.containerClassName)} onSubmit={this.props.onSubmit} role='search'>
                <Icon name='search' className={css('search-prefix-icon')} />
                <TextInput
                    name='search-input'
                    value={this.props.value == null ? '' : this.props.value}
                    className={css('search-input', this.props.inputClassName)}
                    onChange={this.props.onChange}
                    placeholder={this.props.label}
                    postfix={postfix}
                    postfixClassName={css('search-button-container')}
                    attr={{
                        input: { 
                            className: css('input-component'), 
                            autoComplete: 'off', 
                            'aria-label': this.props.label,
                            type: 'search', 
                            onClick: blockPropagation,
                            ...(this.props.attr && this.props.attr.input)
                        }
                    }}
                />
            </form>
        );
    }
}

function blockPropagation(event: React.MouseEvent<HTMLInputElement>) {
    event.stopPropagation();
}

export default SearchInput;
