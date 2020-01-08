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


export const SearchInput = React.memo((props: SearchInputProps) => {
    const postfix = (
        props.value
            ? <ActionTriggerButton onClick={props.onSubmit} icon='forward' className={css('search-button')} attr={{ 
                button: { title: props.label, type: 'submit' },
                container: props.attr?.postfix 
            }} />
            : null
    );

    return (
        <form className={css('search-input-container', props.containerClassName)} onSubmit={props.onSubmit} role='search'>
            <Icon icon='search' className={css('search-prefix-icon')} />
            <TextInput
                name='search-input'
                value={props.value == null ? '' : props.value}
                className={css('search-input', props.inputClassName)}
                onChange={props.onChange}
                placeholder={props.label}
                postfix={postfix}
                postfixClassName={css('search-button-container')}
                attr={{
                    input: { 
                        className: css('input-component'), 
                        autoComplete: 'off', 
                        'aria-label': props.label,
                        type: 'search', 
                        onClick: blockPropagation,
                        ...(props.attr?.input)
                    }
                }}
            />
        </form>
    );
});

function blockPropagation(event: React.MouseEvent<HTMLInputElement>) {
    event.stopPropagation();
}

export default SearchInput;
