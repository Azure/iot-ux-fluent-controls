import * as React from 'react';
import * as classnames from 'classnames/bind';
import { Thumbnail } from '../Thumbnail';

const cx = classnames.bind(require('./Masthead.scss'));

export interface Properties {
    branding: React.ReactNode;
    user?: {
        displayName: string;
        email: string;
    };
}

export class Masthead extends React.PureComponent<Properties> {
    render() {
        return <nav className={cx('masthead')}>
            <div className={cx('branding', 'inline-text-overflow')} data-test-hook={'masthead-application-name'}>
                {this.props.branding}
            </div>
            <div className={cx('toolbar')}>
                <div className={cx('toolbar-btn', 'collapse-0', 'wide')}>
                    {this.renderUser()}
                    <Thumbnail kind='user' url={undefined} size='masthead' className={cx('user-thumbnail')} />
                </div>
            </div>
        </nav>;
    }

    renderUser() {
        const { user } = this.props;
        return user && <div className={cx('user-label')}>
            <span className={cx('name', 'inline-text-overflow')} title={user.displayName}>
                {user.displayName}
            </span>
            <span data-test-hook='masthead-user-email' className={cx('email', 'inline-text-overflow')} title={user.email}>
                {user.email}
            </span>
        </div>;
    }
}

export default Masthead;