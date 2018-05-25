import * as React from 'react';
import * as classnames from 'classnames/bind';
const css = classnames.bind(require('./Shell.scss'));

export interface ShellProperties {
    theme?: string;
    isRtl?: boolean;
}

export class Shell extends React.PureComponent<ShellProperties> {
    render() {
        let { theme, isRtl } = this.props;
        if (theme === undefined) {
            theme = 'light';
        }

        return (
            <div className={css('theme-' + theme)}>
                <div className={css('shell', { rtl: isRtl })}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Shell;
