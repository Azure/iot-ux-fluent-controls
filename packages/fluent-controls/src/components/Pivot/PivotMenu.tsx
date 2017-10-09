import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, AnchorProps, Elements as Attr} from '../../Attributes';
import {PivotOption} from '../../Common';
import {Pivot, PivotAttributes} from '../../Pivot';
const css = classNames.bind(require('./Pivot.scss'));

export interface PivotMenuType {}

export interface PivotMenuAttributes {
    container?: DivProps;
    anchor?: AnchorProps;
    pivot?: PivotAttributes;
}

export interface PivotMenuProps extends React.Props<PivotMenuType> {
    links: PivotOption[];

    active?: string;
    tabIndex?: number;

    className?: string;
    anchorClassName?: string;
    pivotClassName?: string;
    
    attr?: PivotMenuAttributes;
}

export const PivotMenu: React.StatelessComponent<PivotMenuProps> = (props) => {
    return (
        <Attr.div
            className={css('pivot-menu', props.className)}
            attr={props.attr.container}
        >
            {props.links.map(link => {
                return <Attr.a 
                    href={link.href}
                    onClick={link.onClick}
                    title={link.title}
                    tabIndex={props.tabIndex}
                    className={css('pivot', {'disabled': link.disabled}, props.anchorClassName)}
                    hidden={link.hidden}
                    key={link.key}
                    attr={props.attr.anchor}
                >
                    <Pivot
                        icon={link.icon}
                        text={link.label}
                        selected={link.key === props.active}
                        disabled={link.disabled}
                        className={props.pivotClassName}
                        attr={props.attr.pivot}
                    />
                </Attr.a>;
            })}
        </Attr.div>
    );
};

PivotMenu.defaultProps = {
    active: '',
    tabIndex: 0,
    attr: {
        container: {},
        anchor: {},
        pivot: Pivot.defaultProps.attr
    }
};

export default PivotMenu;
