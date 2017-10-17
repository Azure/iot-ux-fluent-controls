import * as React from 'react';
import {MethodNode} from '../../Common';
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
        obj = obj || {target: this.htmlNode};
        this.hook.simulate(event, obj);
    }

    click() {
        this.simulate('click');
    }

    focus() {
        this.simulate('focus');
    }

    hasClass(className: string): boolean {
        return this.hook.hasClass(className);
    }

    get node(): T {
        return this.htmlNode;
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
        
        elements.forEach(element => {
            const newAttr = {
                ref: (el) => this.refs[element] = el,
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
        return this.wrapper.find(`[data-test-hook="${testHook}"]`);
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
