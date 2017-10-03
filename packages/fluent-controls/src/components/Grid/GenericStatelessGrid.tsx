import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./GenericStatelessGrid.scss'));

export interface GenericStatelessGridComponentType {}

export interface GenericStatelessGridProps<T> extends React.Props<GenericStatelessGridComponentType> {
    columns: Array<GridColumn<T>>;
    rows: Array<T>;
    onSelected?: (row: T) => void;
    isSelected?: (row: T) => boolean;
    /** Classname to append to top level element */
    className?: string;
}

export interface GridColumn<T> {
    label: MethodNode;
    mapColumn: (row: T) => MethodNode;
    onAscending: (rows: Array<T>) => Array<T>;
    onDescending: (rows: Array<T>) => Array<T>;
    hidden?: boolean;
}

/**
 * Generic Stateless Grid
 * 
 * To use this component in JSX/TSX:
 * 
 * ```ts
 * const Grid = CreateStatelessComponent<Type>();
 * 
 * <Grid rows={Type[]} columns={GridColumn<Type>} />
 * ```
 * 
 * Unless you need type checking, you should use `StatelessGrid` instead.
 * 
 * @param props Control properties (defined in `GenericStatelessGridProps` interface)
 */
export class GenericStatelessGrid<T> extends React.Component<GenericStatelessGridProps<T>> {
    render() {
        const columns = this.props.columns.map(col => []);
        const header = [];
        this.props.columns.forEach((col, index) => {
            header.push(
                <div className={css('column')}>
                    {col.label}
                </div>
            );
            columns[index].push(
                this.props.rows.map(row => (
                    <div>
                        {col.mapColumn(row)}
                    </div>
                ))
            );
        });

        return (
            <div className={css('grid-container')}>
                <div className={css('header')}>
                    {header}
                </div>
                <div className={css('content')}>
                    {columns}
                </div>
            </div>
        );
    }
}

export function CreateStatelessGrid<T>(): React.StatelessComponent<GenericStatelessGridProps<T>> {
    return (props: GenericStatelessGridProps<T>) => {
        return (
            React.createElement(
                GenericStatelessGrid,
                props,
                null
            )
        );
    };
}

export default GenericStatelessGrid;
