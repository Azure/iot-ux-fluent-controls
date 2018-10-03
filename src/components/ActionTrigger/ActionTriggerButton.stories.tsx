import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import ActionTriggerButton from "./ActionTriggerButton";

storiesOf('Action Trigger Button', module)
    .add('calendar icon', withInfo({inline: true})(() => (
        <ActionTriggerButton
            icon={select('Icon', ['calendar', 'add', 'chevronDown'], 'calendar')}
            className={'date-picker-calendar-icon'}
            onClick={action('clicked')}
            disabled={boolean('Disabled', false)}
            attr={{}}
            aria-haspopup={true}
            aria-expanded={undefined}
        />
    )));