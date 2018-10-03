import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { TextField } from './TextField';
import { withInfo } from '@storybook/addon-info';

storiesOf('Text Field', module)
    .add('default', withInfo({inline: true})(() => (
        <TextField
            name='example1'
            value={undefined}
            label='Text Field Example'
            onChange={action('value changed')}
            disabled={boolean('Disabled', false)}
            required={boolean('Required', false)} />
    ))).add('with tooltip', withInfo({inline: true})(() => (
        <TextField
            name='example1'
            tooltip='This is a an example of a text field'
            value={undefined}
            label='Text Field Example'
            onChange={action('value changed')}
            disabled={boolean('Disabled', false)}
            required={boolean('Required', false)} />
    )))
    .add('with error title', withInfo({inline: true})(() => (
        <TextField
            name='example1'
            error='oh no! something is wrong!'
            errorTitle='oh no! something is wrong!'
            value={undefined} label='Text Field Example'
            onChange={action('value changed')}
            disabled={boolean('Disabled', false)}
            required={boolean('Required', false)} />
    )));