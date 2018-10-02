import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions';

storiesOf('Date Picker', module)
    .add('with state',
        withState({})(
            withInfo({ inline: true }) (
                ({ store }) => (
                    <DatePicker
                        onChange={value => store.set({ value })}
                        onExpand={action('expanded')}
                        name='example1'
                        required={boolean('Required', false)}
                        showAbove={boolean('Shown Above', false)}
                        disabled={boolean('Disabled', false)}
                        onPaste={action('value pasted')}
                        initialValue={store.state.value}
                    />
                )
            )
        )
    )