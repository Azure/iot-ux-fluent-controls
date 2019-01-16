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
        // The portal root element won't be present on initial render, or if 
        // we're rendering server-side. Therefore, wait till this component has
        // been mounted and then create the portal. This also allows us to use
        // autoFocus in a descendant (otherwise, the portal element is inserted
        // in the DOM tree after the children are mounted, meaning that children
        // will be mounted on a detached DOM node)
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
