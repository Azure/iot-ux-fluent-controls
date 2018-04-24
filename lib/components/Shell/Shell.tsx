import * as React from 'react';
import * as classnames from 'classnames/bind';
const css = classnames.bind(require('./Shell.scss'));

export interface Properties {
    theme?: string;
    isRtl?: boolean;
}

export class Shell extends React.PureComponent<Properties> {
    render() {
        let { theme, isRtl } = this.props;
        if (theme === undefined) {
            theme = 'light';
        }

        return <div className={css('shell', 'theme-' + theme, { rtl: isRtl })}>
            {this.props.children}
        </div>;
    }
}

export default Shell;
