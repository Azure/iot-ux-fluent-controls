import * as React from 'react';
import * as classnames from 'classnames/bind';
import { ThemeProvider } from 'styled-components';

import { Masthead, MastheadProperties } from '../Masthead/Masthead';
import { Navigation, NavigationProperties } from '../Navigation/Navigation';
import { Root as ContextPanelRoot } from '../ContextPanel/root';

// reexport Masthead and Nav Properties for easier consumption by consumers:
export { MastheadProperties, MastheadSearchItem, MastheadToolbarItem, MastheadUserItem } from '../Masthead/Masthead';
export { NavigationProperties, NavigationItemSeparator } from '../Navigation/Navigation';

const css = classnames.bind(require('./Shell.module.scss'));

/** Root theme that will be passed thru the control tree. */
export interface ShellTheme {
    base: string;

    colorHeaderBackground?: string;
    colorHeaderButtonRest?: string;
    colorHeaderButtonHover?: string;
    colorHeaderTextRest?: string;
    colorHeaderTextDisabled?: string;

    colorPrimaryButtonRest?: string;
    colorPrimaryButtonHover?: string;
    colorPrimaryButtonDisabled?: string;
    colorPrimaryButtonTextRest?: string;
    colorPrimaryButtonTextDisabled?: string;
}

export interface ShellProperties {
    theme?: string | ShellTheme;
    isRtl?: boolean;
    masthead?: MastheadProperties;
    navigation?: NavigationProperties;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Shell({ theme, isRtl, masthead, navigation, children, onClick }: ShellProperties) {
    // backward compatibility handle string format theme
    const shellTheme: ShellTheme = typeof theme === 'object' ? theme : {
        base: theme
    };

    if (shellTheme.base === undefined) {
        shellTheme.base = 'light';
    }

    return (
        <div className={css('theme-' + shellTheme.base)}>
            <ThemeProvider theme={shellTheme}>
                <div className={css('shell', { rtl: isRtl })} onClick={onClick}>
                    {masthead && <Masthead navigation={navigation} {...masthead} />}
                    <div className={css('nav-and-workspace')}>
                        {navigation && <Navigation {...navigation} />}
                        <div className={css('workspace')}>
                            {children}
                        </div>
                        <ContextPanelRoot />
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default Shell;
