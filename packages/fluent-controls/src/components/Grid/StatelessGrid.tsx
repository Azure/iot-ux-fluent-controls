import * as React from 'react';
import {MethodNode} from '../../Common';
import {CreateStatelessGrid, GridColumn} from './GenericStatelessGrid';

export interface StatelessGridComponentType {}

export interface StatelessGridProps {
    columns: Array<GridColumn<any>>;
    rows: Array<any>;
    onSelected?: (row: any) => void;
    isSelected?: (row: any) => boolean;
    /** Classname to append to top level element */
    className?: string;
}

/**
 * Generic Stateless Grid
 * 
 * If you need type checking, you should use `GenericStatelessGrid` instead.
 * 
 * @param props Control properties (defined in `StatelessGridProps` interface)
 */
export const StatelessGrid: React.StatelessComponent<StatelessGridProps> = (props: StatelessGridProps) => {
    const Grid = CreateStatelessGrid<any>();
    return <Grid {...props}/>;
};

export default StatelessGrid;
