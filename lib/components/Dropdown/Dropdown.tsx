import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames/bind';

import { DivProps, SpanProps, Elements as Attr } from '../../Attributes';
import { MethodNode } from '../../Common';

const css = classNames.bind(require('./Dropdown.module.scss'));

const ArrowSize = 9; // 2*$grid-size + 1 px margin
const ArrowMargin = 12; // $gutter-xsmall

export enum DropdownPosition {
    Top = 'top',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right'
}

export enum DropdownAlignment {
    Start = 'start',
    Center = 'center',
    End = 'end'
}

export interface DropdownAttributes {
    host?: SpanProps;
    dropdown?: SpanProps;
    dropdownContainer?: DivProps;
}

export interface DropdownProps {
    /** Contents of dropdown */
    dropdown: MethodNode;

    /** Shows the dropdown */
    visible?: boolean;

    showArrow?: boolean;
    dropdownSeparation?: number;

    onMouseEnter?: (event) => void;
    onMouseLeave?: (event) => void;

    /**
     * Default position of dropdown relative to child element
     *
     * `[Top | Bottom | Left | Right]`
     *
     * Default: Top
     */
    positionHint?: DropdownPosition;

    /**
     * Default alignment of dropdown relative to child
     *
     * `[Start | Center | End]`
     *
     * Default: Start
     */
    alignmentHint?: DropdownAlignment;

    outerEvents?: string[];
    onOuterEvent?: (event) => void;

    /** Classname to append to top level element */
    className?: string;

    attr?: DropdownAttributes;

    /**
     * Element that will be hosting the dropdown. The dropdown
     * will be positioned relative to this element.
     * This usually means the element that triggers the popup to appear
     */
    children: React.ReactNode;
}

/**
 * Dropdown shows tooltip (with HTML) on hover over child
 *
 * @param props Control properties (defined in `DropdownProps` interface)
 */
export const Dropdown = React.memo(({ className, onMouseEnter, onMouseLeave, attr, dropdown, children, visible, outerEvents, onOuterEvent, positionHint, alignmentHint, showArrow, dropdownSeparation }: DropdownProps) => {
    const dropdownRef = React.useRef<HTMLSpanElement>();
    const hostRef = React.useRef<HTMLSpanElement>();
    const containerRef = React.useRef<HTMLDivElement>(document.querySelector('#md-dropdown-container'));
    
    const eventsConnected = React.useRef<boolean>(false);

    const dropdownPosition = React.useRef<DropdownPosition>();
    const dropdownAlignment = React.useRef<DropdownAlignment>();
    const previousHostRect = React.useRef<ClientRect>();
    
    const interactive = visible && (!!onMouseEnter || !!onMouseLeave);

    const handleOuterEvent = React.useCallback((event: any) => {
        if (hostRef.current.getAttribute('data-dropdown-visible') === 'false') {
            return;
        }

        if (!containerRef.current || containerRef.current.contains(event.target) || hostRef.current.contains(event.target)) {
            return;
        }

        if (onOuterEvent) {
            onOuterEvent(event);
        }
    }, [onOuterEvent]);
    
    const repositionDropdown = React.useCallback(() => {
        if (hostRef.current && dropdownRef.current && containerRef.current) {
            dropdownRef.current.classList.remove(css(`${dropdownPosition.current}-${dropdownAlignment.current}`));

            // Reset to defaults so we always prefer default positioning over last positioning
            dropdownPosition.current = positionHint || DropdownPosition.Top;
            dropdownAlignment.current = alignmentHint || DropdownAlignment.Start;

            const hostRect = hostRef.current.getBoundingClientRect();
            const dropdownRect = dropdownRef.current.getBoundingClientRect();

            const positionArrowOffset = showArrow ? ArrowSize / 2 : 0;
            const marginOffset = dropdownSeparation || 0;

            // Don't mix top/bottom and left/right
            // When the user has poistion top or bottom, just switch the dropdown arround those positions
            if (dropdownPosition.current === DropdownPosition.Top || dropdownPosition.current === DropdownPosition.Bottom) {
                const alignmentArrowOffset = showArrow ? ArrowSize / 2 + ArrowMargin - hostRect.width / 2 : 0;
                const dropdownLeftForStart = hostRect.left - alignmentArrowOffset;
                const dropdownLeftForCenter = hostRect.left - dropdownRect.width / 2 + hostRect.width / 2;
                const dropdownLeftForEnd = hostRect.right - dropdownRect.width + alignmentArrowOffset;

                // We never try to reposition to center, but if the user hinted center we should always try to get that alignment if possible
                if (dropdownAlignment.current === DropdownAlignment.Start && dropdownLeftForStart + dropdownRect.width <= window.innerWidth) {
                    containerRef.current.style.left = `${dropdownLeftForStart}px`;
                } else if (dropdownAlignment.current === DropdownAlignment.Center && dropdownLeftForCenter > 0 && dropdownLeftForCenter + dropdownRect.width <= window.innerWidth) {
                   containerRef.current.style.left = `${dropdownLeftForCenter}px`; 
                } else if (dropdownAlignment.current === DropdownAlignment.End && dropdownLeftForEnd > 0) {
                    containerRef.current.style.left = `${dropdownLeftForEnd}px`;
                } else {
                    if (dropdownLeftForStart + dropdownRect.width <= window.innerWidth) {
                        containerRef.current.style.left = `${dropdownLeftForStart}px`;
                        dropdownAlignment.current = DropdownAlignment.Start;
                        dropdownRef.current.style.maxWidth = undefined;
                    }
                    else if (dropdownLeftForEnd > 0) {
                        containerRef.current.style.left = `${dropdownLeftForEnd}px`;
                        dropdownAlignment.current = DropdownAlignment.End;
                        dropdownRef.current.style.maxWidth = undefined;
                    } else {
                        // it doesn't fit in any of the two places, pick the one with the most space and set a max width to the dropdown
                        const maxWidthForEnd = dropdownRect.width + dropdownLeftForEnd;
                        const maxWidthForStart = window.innerWidth - dropdownLeftForStart;

                        if (maxWidthForEnd > maxWidthForStart) {
                            dropdownAlignment.current = DropdownAlignment.End;
                            containerRef.current.style.left = `${dropdownLeftForEnd}px`;
                            dropdownRef.current.style.maxWidth = `${maxWidthForEnd}px`;
                        } else {
                            dropdownAlignment.current = DropdownAlignment.Start;
                            containerRef.current.style.left = `${dropdownLeftForStart}px`;
                            dropdownRef.current.style.maxWidth = `${maxWidthForStart}px`;
                        }
                    }
                }

                const dropdownTopForBottom = hostRect.bottom + positionArrowOffset + marginOffset;
                const dropdownTopForTop = hostRect.top - dropdownRect.height - positionArrowOffset - marginOffset;

                // Try to keep the same position but update the top
                if (dropdownPosition.current === DropdownPosition.Bottom && dropdownTopForBottom + dropdownRect.height <= window.innerHeight) {
                    containerRef.current.style.top = `${dropdownTopForBottom}px`;
                } else if (dropdownPosition.current === DropdownPosition.Top && dropdownTopForTop > 0) {
                    containerRef.current.style.top = `${dropdownTopForTop}px`;
                } else {
                    // We need to update the position
                    if (dropdownTopForTop > 0 ) {
                        containerRef.current.style.top = `${dropdownTopForTop}px`;
                        dropdownPosition.current = DropdownPosition.Top;
                        dropdownRef.current.style.maxHeight = undefined;
                    } else if (dropdownTopForBottom + dropdownRect.height <= window.innerHeight) {
                        containerRef.current.style.top = `${dropdownTopForBottom}px`;
                        dropdownPosition.current = DropdownPosition.Bottom;
                        dropdownRef.current.style.maxHeight = undefined;
                    } else {
                        // it doesn't fit in any of the two places, pick the one with the most space and set a max height to the dropdown
                        const maxHeightForTop = dropdownRect.height + dropdownTopForTop;
                        const maxHeightForBottom = window.innerHeight - dropdownTopForBottom;

                        if (maxHeightForBottom > maxHeightForTop) {
                            dropdownPosition.current =  DropdownPosition.Bottom;
                            containerRef.current.style.top = `${dropdownTopForBottom}px`;
                            dropdownRef.current.style.maxHeight = `${maxHeightForBottom}px`;
                        } else {
                            dropdownPosition.current =  DropdownPosition.Top;
                            containerRef.current.style.top = `${dropdownTopForTop}px`;
                            dropdownRef.current.style.maxHeight = `${maxHeightForTop}px`;
                        }
                    }
                }
            // Repeat same logic for right/left
            } else {
                const alignmentArrowOffset = showArrow ? ArrowSize / 2 + ArrowMargin : 0;
                const dropdownTopForStart = hostRect.top + hostRect.height / 2 - alignmentArrowOffset - marginOffset;
                const dropdownTopForCenter = hostRect.top + hostRect.height / 2 - dropdownRect.height / 2 - marginOffset;
                const dropdownTopForEnd = hostRect.bottom - dropdownRect.height - hostRect.height / 2 + alignmentArrowOffset - marginOffset;

                if (dropdownAlignment.current === DropdownAlignment.Start && dropdownTopForStart + dropdownRect.height <= window.innerHeight) {
                    containerRef.current.style.top = `${dropdownTopForStart}px`;
                } else if (dropdownAlignment.current === DropdownAlignment.Center && dropdownTopForCenter > 0 && dropdownTopForCenter + dropdownRect.height <= window.innerHeight) {
                    containerRef.current.style.top = `${dropdownTopForCenter}px`;
                } else if (dropdownAlignment.current === DropdownAlignment.End && dropdownTopForEnd > 0) {
                    containerRef.current.style.top = `${dropdownTopForEnd}px`;
                } else {
                    if (dropdownTopForEnd > 0) {
                        containerRef.current.style.top = `${dropdownTopForEnd}px`;
                        dropdownAlignment.current = DropdownAlignment.End;
                        dropdownRef.current.style.maxHeight = undefined;
                    } else if (dropdownTopForStart + dropdownRect.height <= window.innerHeight) {
                        containerRef.current.style.top = `${dropdownTopForStart}px`;
                        dropdownAlignment.current = DropdownAlignment.Start;
                        dropdownRef.current.style.maxHeight = undefined;
                    }
                    else {
                        const maxHeightForEnd = dropdownRect.height + dropdownTopForEnd;
                        const maxHeightForStart = window.innerHeight - dropdownTopForStart;

                        if (maxHeightForEnd > maxHeightForStart) {
                            containerRef.current.style.top = `${dropdownTopForEnd}px`;
                            dropdownAlignment.current = DropdownAlignment.End;
                            dropdownRef.current.style.maxHeight = `${maxHeightForEnd}px`;
                        } else {
                            containerRef.current.style.top = `${dropdownTopForStart}px`;
                            dropdownAlignment.current = DropdownAlignment.Start;
                            dropdownRef.current.style.maxHeight = `${maxHeightForStart}px`;
                        }
                    }
                }

                const dropdownLeftForLeft = hostRect.left - dropdownRect.width - positionArrowOffset - marginOffset;
                const dropdownLeftForRight = hostRect.right + positionArrowOffset + marginOffset;

                // Try to keep the same position but update the left
                if (dropdownPosition.current === DropdownPosition.Left && dropdownLeftForLeft > 0) {
                    containerRef.current.style.left = `${dropdownLeftForLeft}px`;
                } else if (dropdownPosition.current === DropdownPosition.Right && dropdownLeftForRight + dropdownRect.width <= window.innerWidth) {
                    containerRef.current.style.left = `${dropdownLeftForRight}px`;
                } else {
                    // We need to update the position
                    if (dropdownLeftForLeft > 0) {
                        containerRef.current.style.left = `${dropdownLeftForLeft}px`;
                        dropdownPosition.current = DropdownPosition.Left;
                        dropdownRef.current.style.maxWidth = undefined;
                    } else if (dropdownLeftForRight + dropdownRect.width <= window.innerWidth) {
                        containerRef.current.style.left = `${dropdownLeftForRight}px`;
                        dropdownPosition.current = DropdownPosition.Right;
                        dropdownRef.current.style.maxWidth = undefined;
                    } else {
                        const maxWidthForLeft = dropdownRect.width + dropdownLeftForLeft;
                        const maxWidthForRight = window.innerWidth - dropdownLeftForRight;

                        if (maxWidthForLeft > maxWidthForRight) {
                            containerRef.current.style.left = `${dropdownLeftForLeft}px`;
                            dropdownPosition.current = DropdownPosition.Left;
                            dropdownRef.current.style.maxWidth = `${maxWidthForLeft}px`;
                        } else {
                            containerRef.current.style.left = `${dropdownLeftForRight}px`;
                            dropdownPosition.current = DropdownPosition.Right;
                            dropdownRef.current.style.maxWidth = `${maxWidthForRight}px`;
                        }
                    }
                }
            }

            previousHostRect.current = hostRect;
            containerRef.current.style.width = `${dropdownRect.width}px`;
            containerRef.current.style.height = `${dropdownRect.height}px`;
            dropdownRef.current.classList.add(css(`${dropdownPosition.current}-${dropdownAlignment.current}`));
        }
    }, [positionHint, alignmentHint, showArrow, dropdownSeparation]);

    React.useEffect(() => {
        if (visible) {
            repositionDropdown();

            // Append child to container
            containerRef.current.appendChild(dropdownRef.current);
            hostRef.current.setAttribute('data-dropdown-visible', 'true');

            if (!eventsConnected.current) {
                window.addEventListener('resize', repositionDropdown, true);
                document.addEventListener('scroll', repositionDropdown, true);

                if (outerEvents) {
                    outerEvents.forEach(e => window.addEventListener(e, handleOuterEvent));
                }

                eventsConnected.current = true;
            }
        } else if (dropdownRef.current.parentElement !== hostRef.current) {
            hostRef.current.prepend(dropdownRef.current);
            hostRef.current.setAttribute('data-dropdown-visible', 'false');

            if (eventsConnected.current) {
                window.removeEventListener('resize', repositionDropdown, true);
                document.removeEventListener('scroll', repositionDropdown, true);

                if (outerEvents) {
                    outerEvents.forEach(e => window.removeEventListener(e, handleOuterEvent));
                }
                eventsConnected.current = false;
            }
        }

        return () => {
            if (eventsConnected.current) {
                window.removeEventListener('resize', repositionDropdown, true);
                document.removeEventListener('scroll', repositionDropdown, true);

                if (outerEvents) {
                    outerEvents.forEach(e => window.removeEventListener(e, handleOuterEvent));
                }
                eventsConnected.current = false;
            }
        };
    });

    return (
        <>
            <Attr.span
                className={css('dropdown-host', className, { interactive })}
                methodRef={hostRef}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                data-dropdown-visible='false'
                attr={attr?.host}>
                <Attr.span
                    aria-hidden={!visible}
                    className={css('md-dropdown', { interactive, 'with-arrow': showArrow })}
                    attr={attr?.dropdown}
                    methodRef={dropdownRef}>
                    {dropdown}
                </Attr.span>
                {children}
            </Attr.span>
        </>
    );
});

export default Dropdown;