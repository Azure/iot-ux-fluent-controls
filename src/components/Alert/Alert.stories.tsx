import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Alert, AlertType } from './Alert';
import { withInfo } from '@storybook/addon-info';

storiesOf('Alert', module)
    .add('Informational',
        withInfo({inline: true})(() => (
            <Alert type={AlertType.Information} onClose={action('closed')} attr={{closeButtonTitle: 'dismiss'}}>This is an Information alert</Alert>
    ))).add('Warning',
        withInfo({inline: true})(() => (
            <Alert type={AlertType.Warning} onClose={action('closed')} attr={{closeButtonTitle: 'dismiss'}}>This is an Warning alert</Alert>
    ))).add('Error',
        withInfo({inline: true})(() => (
            <Alert type={AlertType.Error} onClose={action('closed')} attr={{closeButtonTitle: 'dismiss'}}>This is an Error alert</Alert>
    )));