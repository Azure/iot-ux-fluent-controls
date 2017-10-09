import * as React from 'react';
import {MethodNode} from '../../Common';
import { mount, ReactWrapper } from 'enzyme';

export class TestHookWrapper {
    node: ReactWrapper;

    constructor(node: React.ReactElement<any>) {
        this.node = mount(node);
    }

    find(testHook: string) {
        return this.node.find(`[data-test-hook="${testHook}"]`);
    }


}

export default TestHookWrapper;
