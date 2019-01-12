import * as React from 'react';
import { createPortal } from 'react-dom';
import { ElementId as RootElementId } from './root';

interface Properties {
    children?: React.ReactNode;
}

interface State {
    container?: HTMLElement;
}

export class Portal extends React.Component<Properties, State> {
    constructor(props: Properties) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const container = document.getElementById(RootElementId);
        this.setState({ container });
    }

    render() {
        const { container } = this.state;
        if (!container) {
            return null;
        }

        return createPortal(this.props.children, container);
    }
}
