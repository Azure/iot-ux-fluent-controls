import * as React from 'react';
import * as classNames from 'classnames/bind';

import {DivProps, SpanProps, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
import {Icon, IconSize, IconAttributes} from '../Icon';

const css = classNames.bind(require('./Pivot.module.scss'));

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

export const Pivot = React.memo((props: PivotProps) => {
    const contents = props.icon
        ? <Icon
            icon={props.icon}
            size={IconSize.xsmall}
            className={css('pivot-icon')}
            labelClassName={css('pivot-icon-label')}
            attr={props.attr?.icon}
        >
            {props.text}
        </Icon>
        : <Attr.span
            className={css('pivot-label')}
            attr={props.attr?.content}
        >
            {props.text}
        </Attr.span>;

    return (
        <Attr.div
            className={css('pivot-container', {
                'disabled': props.disabled,
                'selected': props.selected,
            })}
            attr={props.attr?.container}
        >
            {contents}
            <Attr.div
                className={css('pivot-border')}
                attr={props.attr?.bottomBorder}
            />
        </Attr.div>
    );
});

export default Pivot;
