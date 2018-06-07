import * as React from 'react';
import * as classNames from 'classnames';

export type AttrProps<T extends HTMLElement> = React.HTMLProps<T> & React.ClassAttributes<T> & any;

export type AnchorProps = AttrProps<HTMLAnchorElement>;
export type ButtonProps = AttrProps<HTMLButtonElement>;
export type DivProps = AttrProps<HTMLDivElement>;
export type FooterProps = AttrProps<HTMLDivElement>;
export type HeaderProps = AttrProps<HTMLDivElement>;
export type InputProps = AttrProps<HTMLInputElement>;
export type ImageProps = AttrProps<HTMLImageElement>;
export type LabelProps = AttrProps<HTMLLabelElement>;
export type NavProps = AttrProps<HTMLDivElement>;
export type OptionProps = AttrProps<HTMLOptionElement>;
export type PreProps = AttrProps<HTMLPreElement>;
export type SectionProps = AttrProps<HTMLDivElement>;
export type SelectProps = AttrProps<HTMLSelectElement>;
export type SpanProps = AttrProps<HTMLSpanElement>;
export type TextAreaProps = AttrProps<HTMLTextAreaElement>;

export type HTMLElementAttr<T extends HTMLElement> = AttrProps<T> & {
    ref?: React.Ref<T>
};

export type AttrWrapperProps<T extends HTMLElement> = HTMLElementAttr<T> & {
    attr?: any,
    methodRef?: React.Ref<T>
};

export type AttrWrapper<T extends HTMLElement> = (props: AttrWrapperProps<T>) => React.DOMElement<AttrWrapperProps<T>, T>;

export interface OptionAttr<T> {
    attr?: T;
}

export function mergeAttributeObjects<T, K extends keyof T>(leftInput: T, rightInput: T, names: K[]): T {
    const output: any = {};
    let left: any = leftInput || {};
    let right: any = rightInput || {};
    for (let name of names) {
        const oldAttr: any = left[name] || {};
        const newAttr: any = right[name] || {};
        output[name] = mergeAttributes(oldAttr, newAttr);
    }
    return output;
}

export function mergeAttributes<T extends HTMLElement>(leftAttr: HTMLElementAttr<T>, rightAttr: HTMLElementAttr<T>): HTMLElementAttr<T> {
    const oldAttr = leftAttr || {};
    const newAttr = rightAttr || {};
    const className = classNames(oldAttr.className, newAttr.className);
    if (oldAttr.className) {
        delete oldAttr.className;
    }
    if (newAttr.className) {
        delete newAttr.className;
    }

    const fnCombiner = {};
    for (let key in oldAttr) {
        if (newAttr[key]) {
            const oldFn = oldAttr[key];
            const newFn = newAttr[key];
            if (oldFn instanceof Function && newFn instanceof Function) {
                fnCombiner[key] = (...args) => {
                    oldFn(...args);
                    newFn(...args);
                };
                delete oldAttr[key];
                delete newAttr[key];
            }
        }
    }

    let ref = newAttr.ref;
    if (oldAttr.ref) {
        if (newAttr.ref) {
            const oldRef = oldAttr.ref;
            const newRef = newAttr.ref;
            ref = (element) => {
                oldRef(element);
                newRef(element);
            };
            delete oldAttr.ref;
        } else {
            ref = oldAttr.ref;
        }
    }
    if (newAttr.ref) {
        delete newAttr.ref;
    }

    return {
        ...oldAttr,
        ...newAttr,
        ...fnCombiner,
        className,
        ref
    };
}

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
            delete attr.key;
        }

        let hasChildren = false;
        let propChildren = [];
        if (props.children) {
            hasChildren = true;
            propChildren = props.children;
            delete props.children;
        }
        let attrChildren = [];
        if (attr.children) {
            hasChildren = true;
            attrChildren = attr.children;
            delete attr.children;
        }

        props = { ...props, ...attr, className, ref };

        if (hasChildren) {
            props.children = [propChildren].concat([attrChildren]);
        }

        return React.createElement(
            element,
            props
        );
    };
}

const a = AttrElementWrapper<HTMLAnchorElement>('a');
const button = AttrElementWrapper<HTMLButtonElement>('button');
const div = AttrElementWrapper<HTMLDivElement>('div');
const footer = AttrElementWrapper<HTMLDivElement>('footer');
const header = AttrElementWrapper<HTMLDivElement>('header');
const input = AttrElementWrapper<HTMLInputElement>('input');
const image = AttrElementWrapper<HTMLInputElement>('img');
const label = AttrElementWrapper<HTMLLabelElement>('label');
const nav = AttrElementWrapper<HTMLDivElement>('nav');
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
    image: image,
    label: label,
    nav: nav,
    option: option,
    pre: pre,
    section: section,
    select: select,
    span: span,
    textarea: textarea,
};

export default Elements;
