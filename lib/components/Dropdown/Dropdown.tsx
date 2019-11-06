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
}

export enum DropdownAlignment {
    Start = 'start',
    End = 'end'
}

export interface DropdownAttributes {
    host?: SpanProps;
    dropdownContainer?: DivProps;
    dropdown?: SpanProps;
}

interface ScrollOffset {
    top: number;
    left: number;
}

interface DropdownOffset {
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: number;
    width: number;
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

    positionHint?: DropdownPosition;
    alignmentHint?: DropdownAlignment;

    outerEvents?: string[];
    onOuterEvent?: (event) => void;

    /** Classname to append to top level element */
    className?: string;

    attr?: DropdownAttributes;

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
    const containerRef = React.useRef<HTMLDivElement>();
    
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

            const horizontalArrowOffset = showArrow ? ArrowSize / 2 + ArrowMargin - hostRect.width / 2 : 0;
            const verticalArrowOffset = showArrow ? ArrowSize / 2 : 0;
            const marginOffset = dropdownSeparation || 0;

            const dropdownLeftForStart = hostRect.left - horizontalArrowOffset - marginOffset;
            const dropdownLeftForEnd = hostRect.right - dropdownRect.width + horizontalArrowOffset + marginOffset;

            if (dropdownAlignment.current === DropdownAlignment.Start && dropdownLeftForStart + dropdownRect.width <= window.innerWidth) {
                containerRef.current.style.left = `${dropdownLeftForStart}px`;
            } else if (dropdownAlignment.current === DropdownAlignment.End && hostRect.left - dropdownLeftForEnd > 0) {
                containerRef.current.style.left = `${dropdownLeftForEnd}px`;
            } else {
                if (dropdownLeftForStart + dropdownRect.width <= window.innerWidth) {
                    containerRef.current.style.left = `${dropdownLeftForStart}px`;
                    dropdownAlignment.current = DropdownAlignment.Start;
                }
                else {
                    containerRef.current.style.left = `${dropdownLeftForEnd}px`;
                    dropdownAlignment.current = DropdownAlignment.End;
                }
            }

            const dropdownTopForBottom = hostRect.bottom + verticalArrowOffset + marginOffset;
            const dropdownTopForTop = hostRect.top - dropdownRect.height - verticalArrowOffset - marginOffset;

            // Try to keep the same position but update the top
            if (dropdownPosition.current === DropdownPosition.Bottom && dropdownTopForBottom + dropdownRect.height <= window.innerHeight) {
                containerRef.current.style.top = `${dropdownTopForBottom}px`;
            } else if (dropdownPosition.current === DropdownPosition.Top && dropdownTopForTop > 0) {
                containerRef.current.style.top = `${dropdownTopForTop}px`;
            } else {
                // We need to update the position
                if (dropdownTopForBottom + dropdownRect.height <= window.innerHeight) {
                    containerRef.current.style.top = `${dropdownTopForBottom}px`;
                    dropdownPosition.current = DropdownPosition.Bottom;
                } else {
                    containerRef.current.style.top = `${dropdownTopForTop}px`;
                    dropdownPosition.current = DropdownPosition.Top;
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
                attr={attr && attr.host}>
                <Attr.span
                    aria-hidden={interactive}
                    className={css('md-dropdown', { interactive, 'with-arrow': showArrow })}
                    attr={attr && attr.dropdown}
                    methodRef={dropdownRef}>
                    {dropdown}
                </Attr.span>
                {children}
            </Attr.span>
            {visible && ReactDOM.createPortal(
                <Attr.div
                    className={css('md-dropdown-container', { interactive })}
                    methodRef={containerRef}
                    attr={attr && attr.dropdownContainer}>
                </Attr.div>,
                document.querySelector('.shell')
            )}
        </>
    );
});

export default Dropdown;