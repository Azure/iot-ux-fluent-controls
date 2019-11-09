import * as React from 'react';
import * as classnames from 'classnames/bind';
import { ThemeProvider } from 'styled-components';

import { Masthead, MastheadProperties } from '../Masthead/Masthead';
import { Navigation, NavigationProperties } from '../Navigation/Navigation';
import { Root as ContextPanelRoot } from '../ContextPanel/root';

// reexport Masthead and Nav Properties for easier consumption by consumers:
export { MastheadProperties, MastheadSearchItem, MastheadToolbarItem, MastheadUserItem } from '../Masthead/Masthead';
export { NavigationProperties, NavigationItemSeparator, NavigationItemContainer } from '../Navigation/Navigation';

const css = classnames.bind(require('./Shell.module.scss'));

/** Root theme that will be passed thru the control tree. */
export interface ShellTheme {
    base: string;

    // Masthead
    colorBgMasthead?: string;
    colorBgMastheadHover?: string;
    colorBgMastheadDisabled?: string;
    colorTextMastheadRest?: string;
    colorTextMastheadDisabled?: string;

    // Primary buttons
    colorBgBtnPrimaryRest?: string;
    colorBgBtnPrimaryHover?: string;
    colorBgBtnPrimaryDisabled?: string;
    colorTextBtnPrimaryRest?: string;
    colorTextBtnPrimaryDisabled?: string;

    // Normal buttons
    colorBgBtnStandardRest?: string;
    colorBgBtnStandardHover?: string;
    colorBgBtnStandardDisabled?: string;
    colorTextBtnStandardRest?: string;
    colorTextBtnStandardDisabled?: string;
}

export interface ShellProperties {
    theme?: string | ShellTheme;
    masthead?: MastheadProperties;
    navigation?: NavigationProperties;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Shell({ theme, masthead, navigation, children, onClick }: ShellProperties) {
    // backward compatibility handle string format theme
    const shellTheme: ShellTheme = React.useMemo(() => (
        typeof theme === 'object'
            ? theme
            : { base: theme }
    ), [theme]);

    if (shellTheme.base === undefined) {
        shellTheme.base = 'light';
    }

    React.useEffect(() => {
        document.documentElement.setAttribute('theme', shellTheme.base);
    }, [shellTheme.base]);

    return (
        <ThemeProvider theme={shellTheme}>
            <div className={css('shell')} onClick={onClick}>
                {masthead && <Masthead navigation={navigation} {...masthead} />}
                <div className={css('nav-and-workspace')}>
                    {navigation && <Navigation {...navigation} />}
                    <section className={css('workspace')}>
                        {children}
                    </section>
                    <ContextPanelRoot />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Shell;
