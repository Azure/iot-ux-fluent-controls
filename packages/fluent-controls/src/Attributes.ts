import * as React from 'react';
import * as classNames from 'classnames';
import {MethodNode} from './Common';

export type AttrProps<T extends HTMLElement> = React.HTMLProps<T> & React.ClassAttributes<T> & any;

export type AnchorProps = AttrProps<HTMLAnchorElement>;
export type ButtonProps = AttrProps<HTMLButtonElement>;
export type DivProps = AttrProps<HTMLDivElement>;
export type FooterProps = AttrProps<HTMLDivElement>;
export type HeaderProps = AttrProps<HTMLDivElement>;
export type InputProps = AttrProps<HTMLInputElement>;
export type LabelProps = AttrProps<HTMLLabelElement>;
export type OptionProps = AttrProps<HTMLOptionElement>;
export type PreProps = AttrProps<HTMLPreElement>;
export type SectionProps = AttrProps<HTMLDivElement>;
export type SelectProps = AttrProps<HTMLSelectElement>;
export type SpanProps = AttrProps<HTMLSpanElement>;
export type TextAreaProps = AttrProps<HTMLTextAreaElement>;

export type AttrWrapperProps<T extends HTMLElement> = AttrProps<T> & {
    attr?: any,
    methodRef?: React.Ref<T>
} & {
    ref?: React.Ref<T>
};

export type AttrWrapper<T extends HTMLElement> = (props: AttrWrapperProps<T>) => React.DOMElement<AttrWrapperProps<T>, T>;

export function AttrElementWrapper<T extends HTMLElement>(element: string): AttrWrapper<T> {
    return function(props: AttrWrapperProps<T>): React.DOMElement<AttrWrapperProps<T>, T> {
        props = {...props};
        let attr = {...props.attr};
        if (attr) {
            delete props.attr;
        } else {
            let children;
            if (props.children) {
                children = props.children;
                delete props.children;
            }
            return React.createElement(element, props, ...children);
        }
        
        const className = classNames(props.className, attr.className);
        if (props.className) {
            delete props.className;
        }
        if (attr.className) {
            delete attr.className;
        }

        let ref = props.methodRef;
        if (attr.ref) {
            if (props.methodRef) {
                const oldRef = props.methodRef;
                const newRef = attr.ref;
                ref = (element) => {
                    newRef(element);
                    oldRef(element);
                };
            } else {
                ref = attr.ref;
            }
            delete attr.ref;
        }
        delete props.methodRef;

        if (attr.key) {
            console.error('Method Attribute API does not allow keys to be set on elements.');
            delete attr.key;
        }
        
        let propChildren;
        if (props.children) {
            propChildren = props.children;
            delete props.children;
        }
        let attrChildren;
        if (attr.children) {
            attrChildren = attr.children;
            delete attr.children;
        }

        props = {...props, ...attr, className, ref};

        return React.createElement(
            element,
            props, 
            ...(propChildren ? propChildren : []),
            ...(attrChildren ? attrChildren : [])
        );
    };
}

const a = AttrElementWrapper<HTMLAnchorElement>('a');
const button = AttrElementWrapper<HTMLButtonElement>('button');
const div = AttrElementWrapper<HTMLDivElement>('div');
const footer = AttrElementWrapper<HTMLDivElement>('footer');
const header = AttrElementWrapper<HTMLDivElement>('header');
const input = AttrElementWrapper<HTMLInputElement>('input');
const label = AttrElementWrapper<HTMLLabelElement>('label');
const option = AttrElementWrapper<HTMLOptionElement>('option');
const pre = AttrElementWrapper<HTMLPreElement>('pre');
const section = AttrElementWrapper<HTMLDivElement>('section');
const select = AttrElementWrapper<HTMLSelectElement>('select');
const span = AttrElementWrapper<HTMLSpanElement>('span');
const textarea = AttrElementWrapper<HTMLTextAreaElement>('textarea');

export const Elements = {
    a: a,
    button: button,
    div: div,
    footer: footer,
    header: header,
    input: input,
    label: label,
    option: option,
    pre: pre,
    section: section,
    select: select,
    span: span,
    textarea: textarea,
};

export default Elements;
