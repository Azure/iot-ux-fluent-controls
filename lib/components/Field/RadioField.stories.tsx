import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { RadioField } from './RadioField';
import { boolean } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';

const options = [{
    value: 'utc',
    label: 'UTC'
},
{
    value: 'local',
    label: 'Local Timezone'
}];

storiesOf('Radio Field', module)
    .add('default',
        withState({})(
            withInfo({ inline: true }) (
                ({ store }) => <RadioField
                    disabled={boolean('Disabled', false)}
                    required={boolean('Required', false)}
                    name='example1'
                    options={options}
                    onChange={(value) => store.set({ value })}
                    value={store.state.value}
                    label='Radio Field Example'
                />
            )
        )
    ).add('with tooltip',
        withState({})(
            withInfo({ inline: true }) (
                ({ store }) =>
                    <RadioField
                        disabled={boolean('Disabled', false)}
                        required={boolean('Required', false)}
                        tooltip={'this is a tooltip'}
                        name='example1'
                        options={options}
                        onChange={(value) => store.set({ value })}
                        value={store.state.value}
                        label='Radio Field Example'
                    />
            )
        )
    ).add('with error',
    withState({})(
        withInfo({ inline: true }) (
            ({ store }) =>
                <RadioField
                    disabled={boolean('Disabled', false)}
                    required={boolean('Required', false)}
                    error={'oh no! something is wrong!'}
                    errorTitle={'error hover text'}
                    name='example1'
                    options={options}
                    onChange={(value) => store.set({ value })}
                    value={store.state.value}
                    label='Radio Field Example'
                />
        )
    )
)