import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, mergeAttributes, Elements as Attr} from '../../Attributes';
import {Dropdown, DropdownPosition, DropdownAlignment} from '../Dropdown';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./Balloon.module.scss'));

export interface BalloonAttributes {
    container?: SpanProps;
    balloonContainer?: DivProps;
    balloon?: SpanProps;
    balloonContent?: SpanProps;
}

export interface BalloonProps {
    /** Contents of balloon */
    tooltip: MethodNode;

    /**
     * Allow Balloon contents to span multiple lines
     *
     * default: true
     */
    multiline?: boolean;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to inner balloon element */
    balloonClassName?: string;
    /** Forces the balloon to be expanded */
    expanded?: boolean;

    positionHint?: DropdownPosition;
    alignmentHint?: DropdownAlignment;

    attr?: BalloonAttributes;
    
    /**
     * Element for which the balloon will be position relative to.
     */
    children: React.ReactNode;
}

export interface BalloonState {
    hovered?: boolean;
    visible?: boolean;
}

/**
 * SimpleBalloon shows tooltip (with HTML) on hover over child
 *
 * NOTE: If a parent element of this control is `overflow: hidden` then the
 * balloon may not show up.
 *
 * @param props Control properties (defined in `SimpleBalloonProps` interface)
 */
export class Balloon extends React.Component<BalloonProps, BalloonState> {
    static defaultProps = {
        tooltip: undefined,
        expanded: false,
        multiline: true,
        autoPosition: true,
        attr: {
            container: {},
            balloonContainer: {},
            balloon: {},
        }
    };

    constructor(props: BalloonProps) {
        super(props);

        this.state = {
            hovered: false,
            visible: this.props.expanded,
        };
    }

    UNSAFE_componentWillReceiveProps(newProps: BalloonProps) {
        this.setState({
            visible: this.state.hovered || newProps.expanded,
        });
    }

    shouldComponentUpdate(newProps: BalloonProps, newState: BalloonState): boolean {
        if (newProps !== this.props) {
            return true;
        }
        if (this.state.visible !== newState.visible) {
            return true;
        }
        return false;
    }

    onMouseEnter = () => {
        this.setState({
            hovered: true,
            visible: true
        });
    }

    onMouseLeave = () => {
        this.setState({
            hovered: false,
            visible: this.props.expanded
        });
    }

    render() {
        let {
            balloonClassName,
            multiline,
            className
        } = this.props;


        balloonClassName = css(
            'balloon-dropdown',
            balloonClassName
        );
        className = css('balloon-container', className);
        const innerClassName = css('balloon-inner-container', { multiline });
        return (
            <Dropdown
                dropdown={
                    <Attr.span className={innerClassName} attr={this.props.attr.balloonContent}>
                        {this.props.tooltip}
                    </Attr.span>
                }
                visible={this.state.visible}
                className={className}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                showArrow={true}
                positionHint={this.props.positionHint}
                alignmentHint={this.props.alignmentHint}
                dropdownSeparation={1}
                attr={{
                    host: this.props.attr.container,
                    dropdownContainer: this.props.attr.balloonContainer,
                    dropdown: mergeAttributes(
                        this.props.attr.balloon,
                        {className: balloonClassName}
                    )
                }}
            >
                {this.props.children}
            </Dropdown>
        );
    }
}

export default Balloon;
