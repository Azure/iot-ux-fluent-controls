import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ActionTrigger } from './ActionTrigger';
import { boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

storiesOf('Action Trigger', module)
    .add('default', 
        withInfo({inline:true})(() => (<ActionTrigger icon='add' disabled={boolean('disabled', false)} />
    )))
    .add('with text', 
        withInfo({inline:true})(() => (<ActionTrigger icon='add' label='New' disabled={boolean('disabled', false)} />
    )))
    .add('with icon on the right', 
        withInfo({inline:true})(() => (<ActionTrigger icon='add' rightIcon='chevronDown' label='New' disabled={boolean('disabled', false)} />
    )))