import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, LabelProps, mergeAttributeObjects, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
import {Icon, IconSize, IconAttributes} from '../Icon';
import {Balloon, BalloonAlignment, BalloonPosition, BalloonAttributes} from '../Balloon';
const css = classNames.bind(require('./Field.module.scss'));

export interface FormLabelType {}

export interface FormLabelAttributes {
    container?: DivProps;
    innerContainer?: DivProps;
    farSideContainer?: DivProps;
    text?: LabelProps;
    icon?: IconAttributes;
    balloon?: BalloonAttributes;
}

export interface FormLabelProps extends React.Props<FormLabelType> {
    /** HTML element name for label accessibility */
    name: string;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /**
     * Icon to show to the right of the label
     *
     * default: 'info'
     */
    icon?: string;
    /**
     * Help balloon to show when the user mouses over the icon
     *
     * If this property is provided, the icon provided becomes visible and
     * defaults to the 'info' icon if props.icon is empty
     */
    balloon?: MethodNode;
    /**
     * Where to display Balloon relative to child element
     *
     * `BalloonPosition.[Top | Bottom | Left | Right]`
     *
     * Default: BalloonPosition.Top
     */
    balloonPosition?: BalloonPosition;
    /**
     * Alignment of Balloon relative to child
     *
     * `BalloonAlignment.[Start | Center | End]`
     *
     * Default: BalloonAllignment.Center
     */
    balloonAlignment?: BalloonAlignment;

    /**
     * force balloon to be visible
     */
    balloonExpanded?: boolean;

    /** Classname to append to top level element */
    className?: string;

    disabled?: boolean;

    /** Extra node to render at the far side of the label */
    farSide?: React.ReactNode;

    attr?: FormLabelAttributes;
}

export const requiredClassName = css('label', 'required');

/**
 * High level generic form field
 *
 * @param props Control properties (defined in `FormLabelProps` interface)
 */
export const FormLabel: React.StatelessComponent<FormLabelProps> = (props: FormLabelProps) => {
    const balloon = props.balloon
        ? <Balloon
            tooltip={props.balloon}
            align={props.balloonAlignment || BalloonAlignment.Start}
            position={props.balloonPosition || BalloonPosition.Top}
            className={css('label-icon')}
            multiline
            expanded={props.balloonExpanded}
            attr={mergeAttributeObjects(
                props.attr.balloon,
                {balloon: {
                    className: css('label-balloon'),
                },
                balloonContainer: {
                    role: 'tooltip',
                    'aria-live': 'polite',
                    'aria-atomic': 'true'
                }},
                ['container', 'balloonContainer', 'balloon', 'balloonContent']
            )}
        >
            <Icon
                icon={props.icon}
                size={IconSize.xsmall}
                attr={props.attr.icon}
            />
        </Balloon> : '';

    return (
        <Attr.div
            className={css('label-container', props.className)}
            attr={props.attr.container}
        >
            <Attr.div
                className={css('label-inner-container')}
                attr={props.attr.innerContainer}>
                <Attr.label
                    className={css('label', { 'required': props.required, 'disabled': props.disabled })}
                    htmlFor={props.name}
                    attr={props.attr.text}
                >
                    {props.children}
                </Attr.label>
                {balloon}
            </Attr.div>
            {props.farSide && <Attr.div
                className={css('label-farSide-container')}
                attr={props.attr.farSideContainer}>
                {props.farSide}
            </Attr.div>}
        </Attr.div>
    );
};

FormLabel.defaultProps = {
    name: undefined,
    required: false,
    icon: 'info',
    attr: {
        container: {},
        text: {},
        icon: {
            container: {},
            label: {}
        },
        balloon: {
            container: {},
            balloonContainer: {},
            balloon: {},
        },
    }
};

export default FormLabel;
