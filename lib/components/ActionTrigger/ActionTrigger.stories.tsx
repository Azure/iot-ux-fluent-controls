import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ActionTrigger } from './ActionTrigger';
import { boolean } from '@storybook/addon-knobs'

storiesOf('Action Trigger', module)
    .add('default', () => (<ActionTrigger icon='add' disabled={boolean('disabled', false)} />))
    .add('with text', () => (<ActionTrigger icon='add' label='New' disabled={boolean('disabled', false)} />))
    .add('with icon on the right', () => (<ActionTrigger icon='add' rightIcon='chevronDown' label='New' disabled={boolean('disabled', false)} />))