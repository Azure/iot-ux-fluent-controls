import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, LabelProps, mergeAttributeObjects, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
import {Icon, IconSize, IconAttributes} from '../Icon';
import {Balloon, BalloonAttributes} from '../Balloon';
import { DropdownPosition, DropdownAlignment } from '../Dropdown';
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
     * Default position of Balloon relative to child element
     *
     * `[Top | Bottom | Left | Right]`
     */
    balloonPositionHint?: DropdownPosition;
    /**
     * Default alignment of Balloon relative to child
     *
     * `[Start | Center | End]`
     */
    balloonAlignmentHint?: DropdownAlignment;
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
            className={css('label-icon')}
            multiline
            expanded={props.balloonExpanded}
            positionHint={props.balloonPositionHint}
            alignmentHint={props.balloonAlignmentHint}
            attr={props.attr?.balloon}
        >
            <Icon
                icon={props.icon}
                size={IconSize.xsmall}
                attr={props.attr?.icon}
            />
        </Balloon> : '';

    return (
        <Attr.div
            className={css('label-container', props.className)}
            attr={props.attr?.container}
        >
            <Attr.div
                className={css('label-inner-container')}
                attr={props.attr?.innerContainer}>
                <Attr.label
                    className={css('label', { 'required': props.required, 'disabled': props.disabled })}
                    htmlFor={props.name}
                    attr={props.attr?.text}
                >
                    {props.children}
                </Attr.label>
                {balloon}
            </Attr.div>
            {props.farSide && <Attr.div
                className={css('label-farSide-container')}
                attr={props.attr?.farSideContainer}>
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
            balloon: {},
        },
    }
};

export default FormLabel;
