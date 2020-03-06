import * as React from 'react';
import * as classnames from 'classnames/bind';

import { Masthead, MastheadProperties } from '../Masthead/Masthead';
import { Navigation, NavigationProperties } from '../Navigation/Navigation';
import { Root as ContextPanelRoot } from '../ContextPanel/root';

// reexport Masthead and Nav Properties for easier consumption by consumers:
export { MastheadProperties, MastheadSearchItem, MastheadToolbarItem, MastheadUserItem } from '../Masthead/Masthead';
export { NavigationProperties, NavigationItemSeparator, NavigationItemContainer } from '../Navigation/Navigation';

const css = classnames.bind(require('./Shell.module.scss'));

export interface ShellProperties {
    masthead?: MastheadProperties;
    navigation?: NavigationProperties;
    children?: React.ReactNode;
}

export function Shell({ masthead, navigation, children }: ShellProperties) {
    return (
        <>
            {masthead && <Masthead navigation={navigation} {...masthead} />}
            <div className={css('nav-and-workspace')}>
                {navigation && <Navigation {...navigation} />}
                <section role='main' className={css('workspace')}>
                    {children}
                </section>
                <ContextPanelRoot />
            </div>
            <div 
                id='popup-container'
                aria-live='polite'
                aria-atomic='true'
                className={css('popup-container')}
            />
        </>
    );
}

export default Shell;
