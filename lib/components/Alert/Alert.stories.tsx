import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Alert, AlertType } from './Alert';

storiesOf('Alert', module)
    .add('Informational',
        () => (
            <Alert type={AlertType.Information} onClose={action('closed')} attr={{closeButtonTitle: 'dismiss'}}>This is an Information alert</Alert>
        ))
    .add('Warning',
        () => (
            <Alert type={AlertType.Warning} onClose={action('closed')} attr={{closeButtonTitle: 'dismiss'}}>This is an Warning alert</Alert>
        ))
    .add('Error',
        () => (
            <Alert type={AlertType.Error} onClose={action('closed')} attr={{closeButtonTitle: 'dismiss'}}>This is an Error alert</Alert>
        ));