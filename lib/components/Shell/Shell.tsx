import * as React from 'react';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(null);

export interface Properties {
    theme?: string;
    isRtl?: boolean;
}

export default class Shell extends React.PureComponent<Properties> {
    render() {
        let { theme, isRtl } = this.props;
        if (theme === undefined) {
            theme = 'light';
        }

        return <div className={cx('theme-' + theme, { rtl: isRtl })}>
            {this.props.children}
        </div>;
    }
}
