import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { TextField } from './TextField';

storiesOf('Text Field', module)
    .add('default', () => (<TextField name='example1' value={undefined} label='Text Field Example' onChange={action('value changed')} disabled={boolean('Disabled', false)} required={boolean('Required', false)} />))
    .add('with tooltip', () => (<TextField name='example1' tooltip='This is a an example of a text field' value={undefined} label='Text Field Example' onChange={action('value changed')} disabled={boolean('Disabled', false)} required={boolean('Required', false)} />))
    .add('with error', () => (<TextField name='example1' error='oh no! something is wrong!' value={undefined} label='Text Field Example' onChange={action('value changed')} disabled={boolean('Disabled', false)} required={boolean('Required', false)} />))
    .add('with error title', () => (<TextField name='example1' error='oh no! something is...' errorTitle='oh no! something is wrong!' value={undefined} label='Text Field Example' onChange={action('value changed')} disabled={boolean('Disabled', false)} required={boolean('Required', false)} />))