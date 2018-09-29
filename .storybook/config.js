import * as React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import infoAddon, { withInfo } from '@storybook/addon-info'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react';
import { Shell } from '../lib/components/Shell';
import { setOptions } from '@storybook/addon-options';

// automatically import all files ending in *.stories.(ts|tsx)
const req = require.context('../lib/components', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setOptions({
  name: 'Fluent Controls',
  url: 'https://github.com/Azure/iot-ux-fluent-controls',

});

setAddon(infoAddon);
addDecorator((story, context) => withInfo({ inline: true })(story)(context));
addDecorator((story) => {
  const content = story();
  return (
    <Shell isRtl={boolean('RTL', false)} theme={select('Theme', ['light', 'dark'], 'light')}>
        {content}
    </Shell>
  );
});
addDecorator(withKnobs);

configure(loadStories, module);