import * as React from 'react';
import * as classNames from 'classnames';
import {MethodNode} from './Common';

export const AttrElement: (element: keyof React.ReactHTML) => (props: any) => React.ReactElement<any> = element => props => {
    props = {...props};
    let attr = {...props.attr};
    if (attr) {
        delete props.attr;
    } else {
        let children = [];
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

    let ref = props.ref;
    if (attr.ref) {
        if (props.ref) {
            const oldRef = props.ref;
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
    if (props.ref) {
        delete props.ref;
    }

    if (attr.key) {
        console.error('Method Attribute API does not allow keys to be set on elements.');
        delete attr.key;
    }
    
    let propChildren: MethodNode[] = [];
    if (props.children) {
        propChildren = props.children;
        delete props.children;
    }
    let attrChildren: MethodNode[] = [];
    if (attr.children) {
        attrChildren = attr.children;
        delete attr.children;
    }

    props = {...props, ...attr, className, ref};
    
    return React.createElement(element, props, ...propChildren, ...attrChildren);
};

const a = AttrElement('a');
const button = AttrElement('button');
const div = AttrElement('div');
const footer = AttrElement('footer');
const header = AttrElement('header');
const input = AttrElement('input');
const label = AttrElement('label');
const option = AttrElement('option');
const pre = AttrElement('pre');
const section = AttrElement('section');
const select = AttrElement('select');
const span = AttrElement('span');
const textarea = AttrElement('textarea');

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

export type AttrProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

export type AnchorProps = AttrProps<HTMLAnchorElement> & any;
export type ButtonProps = AttrProps<HTMLButtonElement>;
export type DivProps = AttrProps<HTMLDivElement> & any;
export type FotterProps = AttrProps<HTMLDivElement> & any;
export type HeaderProps = AttrProps<HTMLDivElement> & any;
export type InputProps = AttrProps<HTMLInputElement> & any;
export type LabelProps = AttrProps<HTMLLabelElement> & any;
export type OptionProps = AttrProps<HTMLOptionElement> & any;
export type PreProps = AttrProps<HTMLPreElement> & any;
export type SectionProps = AttrProps<HTMLDivElement> & any;
export type SelectProps = AttrProps<HTMLSelectElement> & any;
export type SpanProps = AttrProps<HTMLSpanElement> & any;
export type TextAreaProps = AttrProps<HTMLTextAreaElement> & any;
// export type Props = AttrProps<HTMLElement>;

export default Elements;