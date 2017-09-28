import * as React from 'react';
import * as classNames from 'classnames/bind';
import {PivotOption} from '../../Common';
import {Pivot} from '../../Pivot';
const css = classNames.bind(require('./Pivot.scss'));

export interface PivotMenuType {}

export interface PivotMenuProps extends React.Props<PivotMenuType> {
    links: PivotOption[];

    active?: string;
    tabIndex?: number;

    className?: string;
    anchorClassName?: string;
    pivotClassName?: string;
}

export const PivotMenu: React.StatelessComponent<PivotMenuProps> = (props) => {
    return (
        <div className={css('pivot-menu', props.className)}>
            {props.links.map(link => {
                return <a 
                    href={link.href}
                    onClick={link.onClick}
                    title={link.title}
                    tabIndex={props.tabIndex}
                    className={css('pivot', {'disabled': link.disabled}, props.anchorClassName)}
                    hidden={link.hidden}
                    key={link.key}
                >
                    <Pivot
                        icon={link.icon}
                        text={link.label}
                        selected={link.key === props.active}
                        disabled={link.disabled}
                        className={props.pivotClassName}
                    />
                </a>;
            })}
        </div>
    );
};

PivotMenu.defaultProps = {
    active: '',
    tabIndex: 0,
};

export default PivotMenu;
