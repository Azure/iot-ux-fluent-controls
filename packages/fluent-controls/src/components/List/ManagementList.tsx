import * as React from 'react';
import {MethodNode, GridColumn, SortDirection} from '../../Common';
import {CreateManagementList} from './GenericManagementList';

export interface ManagementListComponentType {}

export interface ManagementListProps {
    /**
     * List of `GridColumn` objects that provide mappings from row type T to
     * column values and sorting 
     * 
     * See documentation for GridColumn<any> for more information
     */
    columns: Array<GridColumn<any>>;
    /**
     * List of row objects
     * 
     * This can be a list of anything that satisfies the GridColumn callbacks
     * provided in props.columns
     */
    rows: Array<any>;
    /**
     * HTML input element name prefix to use for checkboxes
     * 
     * default: management-list
     */
    name?: string;
    
    /**
     * Callback for checkbox value changes
     * 
     * If this callback is not provided, row selection checkboxes will not be shown
     */
    onSelect?: (row: any, newValue: boolean) => void;
    /**
     * Callback for select all checkbox value changes
     * 
     * If this callback is not provided, select all checkbox will not be shown
     */
    onSelectAll?: (allSelected: boolean) => void;
    /**
     * A key of row type `T` or callback that returns whether a row is selected.
     * 
     * If this is not provided, row selection checkboxes will not be shown
     */
    isSelected?: ((row: any) => boolean) | string;
    
    /**
     * A key of row type `T` or callback that returns the label for the select checkbox
     * for accessibility.
     * 
     * If this is not provided, no label will be rendered.
     */
    selectLabel?: ((row: any) => MethodNode) | string;
    /**
     * A label for the select all checkbox for accessibility
     */
    selectAllLabel?: MethodNode;
    
    /** 
     * Currently sorted column
     */
    sortedColumn?: GridColumn<any>;
    /**
     * Direction of current sort
     * 
     * 'ascending' | 'descending'
     * 
     * Default: 'ascending'
     */
    sortDirection?: SortDirection;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * Management List
 * 
 * If you need type checking, you should use `GenericManagementList` with the
 * `CreateManagementList` function instead.
 * 
 * @param props Control properties (defined in `ManagementListProps` interface)
 */
export const ManagementList: React.StatelessComponent<ManagementListProps> = (props: ManagementListProps) => {
    const List = CreateManagementList<any>();
    return <List {...props}/>;
};

export default ManagementList;
