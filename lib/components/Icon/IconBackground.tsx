import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, Elements as Attr} from '../../Attributes';
const css = classNames.bind(require('./Icon.module.scss'));

export interface IconBackgroundAttributes {
    container?: DivProps;
}

export interface IconBackgroundProps {
    /** Background color of circle */
    backgroundColor: string;

    /** Circle diameter in pixels */
    diameter?: number;
    /** Center vertically and horizontally in parent element */
    centered?: boolean;

    /** Classname to append to top level element */
    className?: string;

    attr?: IconBackgroundAttributes;
}

/**
 * Background circle for Icons
 *
 * @param props Control properties (Defined by `IconBackgroundProps` interface)
 */
export const IconBackground = React.memo((props: IconBackgroundProps) => {
    let cls = css('icon-background',
    {
        'centered': props.centered
    }, props.className);

    let style = {
        backgroundColor: props.backgroundColor
    };

    if (props.diameter) {
        style['width'] = `${props.diameter}px`;
        style['height'] = `${props.diameter}px`;
        style['borderRadius'] = `${props.diameter / 2}px`;
    }

    return (<Attr.div className={cls} style={style} attr={props.attr?.container}/>);
});

export default IconBackground;
