import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Calendar } from './Calendar';
import { Store, State } from '@sambego/storybook-state';

const store = new Store({
    value: new Date().toISOString()
});

storiesOf('Calendar', module)
    .add('default', () => {
        return (
            <div style={{ width: '260px', border: '1px solid #333', margin: '0 20px' }}>
                <State store={store}>
                    <Calendar value={store.get('value')} onChange={value => store.set({ value })} />
                </State>
            </div>
        );
    });
