import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, AnchorProps, Elements as Attr, OptionAttr, mergeAttributes, mergeAttributeObjects} from '../../Attributes';
import {PivotOption} from '../../Common';
import {Pivot, PivotAttributes} from './Pivot';
const css = classNames.bind(require('./Pivot.module.scss'));

export interface PivotMenuAttributes {
    container?: DivProps;
    anchor?: AnchorProps;
    pivot?: PivotAttributes;
}

export interface PivotMenuProps {
    links: (PivotOption & OptionAttr<{anchor?: AnchorProps} & PivotAttributes>)[];

    active?: string;
    tabIndex?: number;

    className?: string;
    anchorClassName?: string;
    pivotClassName?: string;

    attr?: PivotMenuAttributes;
}

export const PivotMenu = React.memo((props: PivotMenuProps) => {
    return (
        <Attr.div
            className={css('pivot-menu', props.className)}
            attr={props.attr?.container}
        >
            {props.links.map(link => {
                return <Attr.a
                    href={link.href}
                    onClick={link.onClick}
                    title={link.title}
                    tabIndex={props.tabIndex ?? 0}
                    className={css('pivot', {'disabled': link.disabled}, props.anchorClassName)}
                    hidden={link.hidden}
                    key={link.key}
                    attr={mergeAttributes(props.attr?.anchor, link.attr?.anchor)}
                >
                    <Pivot
                        icon={link.icon}
                        text={link.label}
                        selected={link.key === props.active}
                        disabled={link.disabled}
                        className={props.pivotClassName}
                        attr={mergeAttributeObjects(props.attr?.pivot, link.attr, [
                            'container',
                            'bottomBorder',
                            'focusBorder',
                            'content',
                            'innerContent',
                            'icon',
                        ])}
                    />
                </Attr.a>;
            })}
        </Attr.div>
    );
});

export default PivotMenu;
