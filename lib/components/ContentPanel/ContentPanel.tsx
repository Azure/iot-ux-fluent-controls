import * as React from 'react';
import * as classnames from 'classnames/bind';
import { ActionTriggerButton } from '../ActionTrigger';
import { Button } from '../Button';

const cx = classnames.bind(require('./ContentPanel.module.scss'));


export interface ContentPanelProperties {
    title: string;
    content: React.ReactNode | string;
    actions?: {
        confirm?: {
            label: string;
            event: Function;
        };
        cancel: {
            label: string;
            event: Function;

        }
    };
}

export class ContentPanel extends React.PureComponent<ContentPanelProperties> {

    render() {
        const { title, actions, content } = this.props;
        return (
            <div key='context-panel' role='complementary' className={cx('content-panel', 'sm', 'md')}>
                <ActionTriggerButton
                    key='close-icon'
                    icon='cancel'
                    onClick={() => this.props.actions.cancel.event()}
                    attr={{ icon: { container: { 'aria-label': 'close-panel' } } }}
                    className={cx('close-button')}
                />
                <div className={cx('title', 'inline-text-overflow')}>{title} </div>
                <div className={cx('content')}>{content}</div>
                {actions && [
                    <span className={cx('separator')} />,
                    <div className={cx('actions')}>
                        <Button
                            className={cx('btn', 'btn-primary', 'inline-text-overflow')}
                            attr={{ container: { autoFocus: false } }}
                            onClick={() => actions.confirm.event()}
                        >
                            {actions.confirm.label}
                        </Button>
                        <Button
                            className={cx('btn', 'btn-default', 'inline-text-overflow')}
                            attr={{ container: { autoFocus: true } }}
                            onClick={() => this.props.actions.cancel.event()}
                        >
                            {actions.cancel.label}
                        </Button>

                    </div>]
                }
            </div>
        );
    }
}

export default ContentPanel;