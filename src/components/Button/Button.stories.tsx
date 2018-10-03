import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';
import { boolean } from '@storybook/addon-knobs/react';

storiesOf('Button', module)
    .add('default', () => (<Button disabled={boolean('Disabled', false)} onClick={action('clicked')}>Default Button</Button>))
    .add('primary', () => (<Button disabled={boolean('Disabled', false)} primary onClick={action('clicked')}>Primary Button</Button>));