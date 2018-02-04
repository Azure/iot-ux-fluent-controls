"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames");
function mergeAttributeObjects(leftInput, rightInput, names) {
    const output = {};
    let left = leftInput || {};
    let right = rightInput || {};
    for (let name of names) {
        const oldAttr = left[name] || {};
        const newAttr = right[name] || {};
        output[name] = mergeAttributes(oldAttr, newAttr);
    }
    return output;
}
exports.mergeAttributeObjects = mergeAttributeObjects;
function mergeAttributes(leftAttr, rightAttr) {
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
        }
        else {
            ref = oldAttr.ref;
        }
    }
    if (newAttr.ref) {
        delete newAttr.ref;
    }
    return Object.assign({}, oldAttr, newAttr, fnCombiner, { className,
        ref });
}
exports.mergeAttributes = mergeAttributes;
function AttrElementWrapper(element) {
    return function (props) {
        props = Object.assign({}, props);
        let attr = Object.assign({}, props.attr);
        if (attr) {
            delete props.attr;
        }
        else {
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
            }
            else {
                ref = attr.ref;
            }
            delete attr.ref;
        }
        delete props.methodRef;
        if (attr.key) {
            if (DEBUG) {
                console.error('Method Attribute API does not allow keys to be set on elements.');
            }
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
        props = Object.assign({}, props, attr, { className, ref });
        if (hasChildren) {
            props.children = [propChildren].concat([attrChildren]);
        }
        return React.createElement(element, props);
    };
}
exports.AttrElementWrapper = AttrElementWrapper;
const a = AttrElementWrapper('a');
const button = AttrElementWrapper('button');
const div = AttrElementWrapper('div');
const footer = AttrElementWrapper('footer');
const header = AttrElementWrapper('header');
const input = AttrElementWrapper('input');
const image = AttrElementWrapper('img');
const label = AttrElementWrapper('label');
const option = AttrElementWrapper('option');
const pre = AttrElementWrapper('pre');
const section = AttrElementWrapper('section');
const select = AttrElementWrapper('select');
const span = AttrElementWrapper('span');
const textarea = AttrElementWrapper('textarea');
exports.Elements = {
    a: a,
    button: button,
    div: div,
    footer: footer,
    header: header,
    input: input,
    image: image,
    label: label,
    option: option,
    pre: pre,
    section: section,
    select: select,
    span: span,
    textarea: textarea,
};
exports.default = exports.Elements;

//# sourceMappingURL=Attributes.js.map
