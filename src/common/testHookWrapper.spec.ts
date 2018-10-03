import * as React from 'react';
import {MethodNode, KeyCode, keyCode} from '../Common';
import { mount, ReactWrapper } from 'enzyme';

const testHook = (name: string) => `test-wrapper-${name}`;

export class TestHookElement<T extends HTMLElement> {
    private wrapper: TestHookWrapper<any>;
    private htmlNode: T;
    private name: string;

    constructor(wrapper: TestHookWrapper<any>, name: string, node: T) {
        this.wrapper = wrapper;
        this.htmlNode = node;
        this.name = name;
    }

    get hook() {
        return this.wrapper.find(testHook(this.name));
    }

    simulate(event: string, obj: any = null) {
        this.hook.simulate(event, {...obj, target: this.htmlNode});
    }

    click() {
        this.simulate('click');
    }

    focus() {
        this.simulate('focus');
    }

    blur() {
        this.simulate('blur');
    }

    keyDown(key: keyof KeyCode | number, modifier?: { altKey?: boolean }) {
        let char: number = typeof(key) === 'number' ? key : keyCode[key];
        let payload: {[key: string]: any} = {keyCode: char};
        if (modifier) {
            if (modifier.altKey) {
                payload.altKey = modifier.altKey;
            }
        }
        this.simulate('keydown', payload);
    }

    keyUp(key: keyof KeyCode | number) {
        let char: number = typeof(key) === 'number' ? key : keyCode[key];
        this.simulate('keyUp', {keyCode: char});
    }

    keyPress(key: keyof KeyCode | number) {
        let char: number = typeof(key) === 'number' ? key : keyCode[key];
        this.simulate('keypress', {charCode: char});
    }

    change(newValue: string) {
        const node: any = this.htmlNode;
        node.value = newValue;
        this.simulate('change');
    }

    input(newValue: string) {
        const node: any = this.htmlNode;
        node.value = newValue;
        this.simulate('input');
    }

    append(newValue: string) {
        const node: any = this.htmlNode;
        node.value = node.value + newValue;
        this.simulate('change');
    }

    hasClass(className: string): boolean {
        return this.hook.hasClass(className);
    }

    get node(): T {
        return this.htmlNode;
    }

    get value(): string {
        const node: any = this.htmlNode;
        return node.value;
    }
}

export class TestHookWrapper<T> {
    private wrapper: ReactWrapper;
    private refs: {[el: string]: any};

    private eventMap: {[event: string]: (event) => void};

    constructor(node: React.ReactElement<{attr: T}>, elements: (keyof T)[] = [], attr: any = {}) {
        this.refs = {};
        this.eventMap = {};
        window.addEventListener = this.addEventListener.bind(this);

        elements.forEach((element) => {
            const newAttr = {
                ref: (el) => this.refs[element.toString()] = el,
                'data-test-hook': `test-wrapper-${element}`
            };
            if (attr[element]) {
                attr[element] = {...attr[element], ...newAttr};
            } else {
                attr[element] = newAttr;
            }
        });

        this.wrapper = mount(React.cloneElement(node, {attr: attr}));
    }

    find(testHook: string) {
        return this.wrapper.find(`[data-test-hook='${testHook}']`);
    }

    selector(selector) {
        return this.wrapper.find(selector);
    }

    addEventListener(event: string, callback: (event) => void) {
        this.eventMap[event] = callback;
    }

    dispatchEvent(event: string, eventObj: any) {
        if (this.eventMap[event]) {
            this.eventMap[event]({
                ...eventObj,
                stopPropagation: () => {},
                preventDefault: () => {}
            });
        }
    }

    ref<T extends HTMLElement>(name: string): TestHookElement<T> {
        if (this.refs[name]) {
            return new TestHookElement<T>(this, name, this.refs[name]);
        }
        return null;
    }

    get state(): any {
        return this.wrapper.instance().state;
    }

    get props(): any {
        return this.wrapper.instance().props;
    }
}

export default TestHookWrapper;
