import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Alert } from '../lib/components/Alert';

storiesOf('Alert', module)
    .add('Information',
        () => (
            <Alert type={0} onClose={action('closed')} attr={{closeButtonTitle: 'dismiss'}}>This is an Information alert</Alert>
        ))
    .add('Warning',
        () => (
            <Alert type={1} onClose={action('closed')} attr={{closeButtonTitle: 'dismiss'}}>This is an Warning alert</Alert>
        ))
    .add('Error',
        () => (
            <Alert type={2} onClose={action('closed')} attr={{closeButtonTitle: 'dismiss'}}>This is an Error alert</Alert>
        ));