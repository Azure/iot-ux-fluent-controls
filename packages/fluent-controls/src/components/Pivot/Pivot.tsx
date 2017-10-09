import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
import {Icon, IconSize, IconAttributes} from '../Icon';
const css = classNames.bind(require('./Pivot.scss'));

export const pivotClassName = css('pivot');
export const menuClassName = css('pivot-menu');

export interface PivotType {}

export interface PivotAttributes {
    container?: DivProps;
    bottomBorder?: DivProps;
    focusBorder?: DivProps;
    content?: SpanProps;
    innerContent?: DivProps;
    icon?: IconAttributes;
}

export interface PivotProps extends React.Props<PivotType> {
    icon?: string;
    text: string | MethodNode;

    selected?: boolean;
    disabled?: boolean;

    className?: string;

    attr?: PivotAttributes;
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
                attr={props.attr.icon}
            >
                {props.text}
            </Icon>
        );
    } else {
        const labelClassName = css('pivot-label');        
        contents = (
            <Attr.span className={labelClassName} attr={props.attr.content}>
                {props.text}
            </Attr.span>
        );
    }
    
    return (
        <Attr.div className={containerClassName} attr={props.attr.container}>
            {contents}
            {contents}
            <Attr.div className={borderClassName} attr={props.attr.bottomBorder}/>
            <Attr.div className={focusClassName} attr={props.attr.focusBorder}/>
            <Attr.div className={innerClassName} attr={props.attr.innerContent}/>
        </Attr.div>
    );
};

Pivot.defaultProps = {
    attr: {
        container: {},
        bottomBorder: {},
        focusBorder: {},
        content: {},
        icon: Icon.defaultProps.attr,
    }
};

export default Pivot;
