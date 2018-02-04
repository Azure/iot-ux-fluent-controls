"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Icon_1 = require("../Icon");
const CheckboxInput_1 = require("../Input/CheckboxInput");
const css = classNames.bind(require('./GenericManagementList.scss'));
/**
 * Generic Management List
 *
 * To use this component in TSX:
 *
 * ```ts
 * type CustomManagementList = GenericManagementList<Type>;
 *
 * <CustomManagementList rows={Type[]} columns={GridColumn<Type>} />
 * ```
 *
 * If you don't need type checking, you should use `ManagementList` instead.
 *
 * @param props Control properties (defined in `GenericManagementListProps` interface)
 */
class GenericManagementList extends React.PureComponent {
    render() {
        let columns = this.props.columns.map(col => []);
        this.props.columns.forEach((column, colIndex) => {
            let onClick = null;
            let labelSuffix = '';
            const sortable = column.onAscending && column.onDescending;
            if (sortable) {
                if (this.props.sortedColumn === column) {
                    let icon = '';
                    if (this.props.sortDirection === 'descending') {
                        icon = 'chevronDown';
                        onClick = event => column.onAscending();
                    }
                    else {
                        icon = 'chevronUp';
                        onClick = event => column.onDescending();
                    }
                    labelSuffix = React.createElement(Icon_1.Icon, { icon: icon, fontSize: 12, className: css('sort-direction'), attr: this.props.attr.rowHeaderChevron });
                }
                else {
                    onClick = column.defaultDirection === 'descending'
                        ? event => column.onDescending()
                        : event => column.onAscending();
                }
            }
            columns[colIndex].push(React.createElement(Attributes_1.Elements.button, { type: 'button', className: css('column-header'), key: `header-${colIndex}`, onClick: onClick, disabled: !sortable, attr: this.props.attr.rowHeaderButton },
                column.label,
                labelSuffix));
            columns[colIndex].push(this.props.rows.map((row, rowIndex) => {
                let content;
                if (column.mapColumn instanceof Function) {
                    content = column.mapColumn(row);
                }
                else {
                    const colValue = row[column.mapColumn];
                    if (typeof (colValue) === 'string' ||
                        colValue instanceof React.Component ||
                        colValue instanceof React.PureComponent) {
                        content = colValue;
                    }
                    else {
                        if (DEBUG) {
                            console.error('Method Error: Management List Column property mapColumn must return a valid React Node');
                        }
                    }
                }
                return (React.createElement(Attributes_1.Elements.label, { className: css('column-content'), key: rowIndex, htmlFor: `${this.props.name}-select-${rowIndex}_checkbox`, attr: Attributes_1.mergeAttributes(this.props.attr.rowContent, row.attr) }, content));
            }));
        });
        if (this.props.onSelect && this.props.isSelected) {
            const selected = this.props.rows.map(row => this.props.isSelected instanceof Function
                ? this.props.isSelected(row)
                : row[this.props.isSelected]);
            const allSelected = selected.filter(row => row).length === selected.length;
            const checkboxCol = [];
            const selectAll = !this.props.onSelectAll
                ? React.createElement(Attributes_1.Elements.div, { className: css('checkbox-empty'), attr: this.props.attr.selectAllEmpty })
                : React.createElement(CheckboxInput_1.CheckboxInput, { name: `${this.props.name}-select-all`, label: React.createElement(Attributes_1.Elements.div, { className: css('select-all-label') }, this.props.selectAllLabel), className: css({
                        'list-checkbox-container': allSelected
                    }), checked: allSelected, onChange: newValue => this.props.onSelectAll(newValue), attr: Attributes_1.mergeAttributeObjects(this.props.attr.selectAllCheckbox, {
                        checkbox: {
                            className: css('list-checkbox-button')
                        },
                        checkmarkIcon: {
                            container: { className: css('list-checkbox-checkmark') }
                        },
                    }, ['container', 'label', 'input', 'text', 'checkbox', 'indeterminateFill', 'checkmarkIcon', 'border']) });
            checkboxCol.push(React.createElement(Attributes_1.Elements.div, { className: css('column-header', 'checkbox', {
                    'checkbox-empty': !this.props.onSelectAll
                }), key: 'select-all', attr: this.props.attr.selectAllContainer }, selectAll));
            this.props.rows.forEach((row, index) => {
                let selectLabel;
                if (this.props.selectLabel instanceof Function) {
                    selectLabel = this.props.selectLabel(row);
                }
                else {
                    const colValue = row[this.props.selectLabel];
                    if (typeof (colValue) === 'string' ||
                        colValue instanceof React.Component ||
                        colValue instanceof React.PureComponent) {
                        selectLabel = colValue;
                    }
                    else {
                        if (DEBUG) {
                            console.error('Method Error: Management List Column property selectLabel must return a valid React Node');
                        }
                    }
                }
                const isSelected = this.props.isSelected instanceof Function
                    ? this.props.isSelected(row)
                    : !!row[this.props.isSelected];
                checkboxCol.push(React.createElement(Attributes_1.Elements.div, { className: css('column-content', 'checkbox'), key: `select-${index}`, attr: Attributes_1.mergeAttributes(this.props.attr.selectRowContent, row.attr) },
                    React.createElement(CheckboxInput_1.CheckboxInput, { name: `${this.props.name}-select-${index}`, label: React.createElement(Attributes_1.Elements.div, { className: css('select-all-label') }, selectLabel), className: css({
                            'list-checkbox-container': isSelected
                        }), checked: isSelected, onChange: newValue => this.props.onSelect(row, newValue), attr: Attributes_1.mergeAttributeObjects(this.props.attr.selectRowCheckbox, {
                            checkbox: {
                                className: css('list-checkbox-button')
                            },
                            checkmarkIcon: {
                                container: { className: css('list-checkbox-checkmark') }
                            },
                        }, ['container', 'label', 'input', 'text', 'checkbox', 'indeterminateFill', 'checkmarkIcon', 'border']) })));
            });
            columns = [checkboxCol, ...columns];
        }
        return (React.createElement(Attributes_1.Elements.div, { className: css('list-container'), attr: this.props.attr.container }, columns.map((col, index) => {
            const style = {};
            const offset = columns.length - this.props.columns.length;
            let column = this.props.columns[index - offset];
            if (index >= offset) {
                if (column.width) {
                    style.flexBasis = `${column.width}px`;
                }
            }
            else {
                column = { attr: {} };
            }
            return (React.createElement(Attributes_1.Elements.div, { className: css('column', {
                    'checkbox': index === 0
                        && this.props.isSelected
                        && this.props.onSelect,
                    'auto-width': index >= offset ? !column.width : false
                }), key: index, style: style, attr: Attributes_1.mergeAttributes(this.props.attr.column, column.attr) }, col));
        })));
    }
}
GenericManagementList.defaultProps = {
    name: 'management-list',
    selectAllLabel: 'Select All',
    selectLabel: () => '',
    defaultDirection: 'ascending',
    attr: {
        container: {},
        column: {},
        rowHeader: {},
        rowContent: {},
        rowHeaderChevron: {},
        selectAllContainer: {},
        selectAllEmptyContainer: {},
        selectAllCheckbox: {},
        selectRowContainer: {},
        selectRowCheckbox: {},
    }
};
exports.GenericManagementList = GenericManagementList;
exports.default = GenericManagementList;

//# sourceMappingURL=GenericManagementList.js.map
