import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Calendar } from './Calendar';
import { action } from '@storybook/addon-actions'

storiesOf('Calendar', module)
    .add('default (no initial value)', () => (
        <div style={{width: '260px', border: '1px solid #333', margin: '0 20px'}}>
            <Calendar onChange={action('date changed')}/>
        </div>
    )).add('with initial value', () => (
        <div style={{width: '260px', border: '1px solid #333', margin: '0 20px'}}>
            <Calendar value={new Date().toISOString()} onChange={action('date changed')}/>
        </div>
    ));
