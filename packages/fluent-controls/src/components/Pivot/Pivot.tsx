import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {Icon, IconSize} from '../Icon';
const css = classNames.bind(require('./Pivot.scss'));

export const pivotClassName = css('pivot');
export const menuClassName = css('pivot-menu');

export interface PivotType {}

export interface PivotProps extends React.Props<PivotType> {
    icon?: string;
    text: string;

    selected?: boolean;
    disabled?: boolean;

    className?: string;
}

export const Pivot: React.StatelessComponent<PivotProps> = (props) => {
    const containerClassName = css('pivot-container', {
        'disabled': props.disabled,
        'selected': props.selected,
    });
    const focusClassName = css('focus-border');
    const borderClassName = css('pivot-border');
    const innerClassName = css('pivot-contents');
    const placeholderClassName = css('pivot-placeholder');
    const iconClassName = css('pivot-icon');
    
    let contents;
    if (props.icon) {
        const labelClassName = css('pivot-icon-label');
        contents = (
            <Icon 
                icon={props.icon}
                size={IconSize.xsmall}
                className={iconClassName}
                labelClassName={labelClassName}
            >
                {props.text}
            </Icon>
        );
    } else {
        const labelClassName = css('pivot-label');        
        contents = <span className={labelClassName}>{props.text}</span>;
    }
    
    return (
        <div className={containerClassName}>
            {contents}
            {contents}
            <div className={borderClassName}></div>
            <div className={focusClassName}></div>
            <div className={innerClassName}>
            </div>
        </div>
    );
};

Pivot.defaultProps = {

};

export default Pivot;
