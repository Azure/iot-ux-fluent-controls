import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Calendar } from './Calendar';
import { withState, Store } from '@dump247/storybook-state';

storiesOf('Calendar', module)
    .add('default', withState({value: undefined})((story) => {
        const store = story.store as Store<{value: any}>;
        return (
            <div style={{width: '260px', border: '1px solid #333', margin: '0 20px'}}>
                <Calendar value={store.state.value} onChange={(nextDate) => store.set({ value: nextDate.toISOString() })}/>
            </div>
        );
    }));
