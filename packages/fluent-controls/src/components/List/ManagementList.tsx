import * as React from 'react';
import {MethodNode, GridColumn, SortDirection} from '../../Common';
import {GenericManagementList, GenericManagementListProps} from './GenericManagementList';

export interface ManagementListComponentType {}

export type ManagementListProps = GenericManagementListProps<any>;

/**
 * Management List
 * 
 * If you need type checking, you should use `GenericManagementList` with the
 * `CreateManagementList` function instead.
 * 
 * Check `GenericManagementList` for documentation on properties
 * 
 * @param props Control properties (defined in `ManagementListProps` interface)
 */
export const ManagementList: React.StatelessComponent<ManagementListProps> = (props: ManagementListProps) => {
    return React.createElement(
        GenericManagementList,
        props,
        null
    );
};

export default ManagementList;
