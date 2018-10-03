import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Calendar } from './Calendar';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';


storiesOf('Calendar', module)
    .add('default',
        withState({}) (
            withInfo({ inline: true }) (
                ({ store }) => (
                    <div style={{ width: '260px', border: '1px solid #333', margin: '0 20px' }}>
                        <Calendar value={store.state.value} onChange={value => store.set({ value })} />
                    </div>
                )
            )
        )
    );
