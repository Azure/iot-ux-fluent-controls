```jsx
class ManagementListDemo extends React.Component {
    constructor() {
        super();

        this.rows = [
            {
                name: 'Row Name1',
                owner: 'Owner Name1',
                lastUpdated: new Date(),
                classification: ['owner'],
                actions: []
            },
            {
                name: 'Row Name2',
                owner: 'Owner Name2',
                lastUpdated: new Date(),
                classification: ['owner', 'test'],
                actions: []
            },
            {
                name: 'Row Name3',
                owner: 'Owner Name3',
                lastUpdated: new Date(),
                classification: ['not-owner', 'not-test'],
                actions: []
            },
            {
                name: 'Row Name4',
                owner: 'Owner Name4',
                lastUpdated: new Date(),
                classification: ['not-owner'],
                actions: []
            }
        ];

        const onAscending = (index) => () => this.setState({
            sortedColumn: this.cols[index],
            sortDirection: 'ascending'
        });
        const onDescending = (index) => () => this.setState({
            sortedColumn: this.cols[index],
            sortDirection: 'descending'
        });

        this.cols = [
            {
                label: 'NAME',
                mapColumn: (row) => row.name,
                onAscending: onAscending(0),
                onDescending: onDescending(0),
                hidden: false
            },
            {
                label: 'OWNER',
                mapColumn: (row) => row.owner,
                onAscending: onAscending(1),
                onDescending: onDescending(1),
                hidden: false
            },
            {
                label: 'LAST UPDATED',
                mapColumn: (row) => row.lastUpdated.toUTCString(),
                onAscending: onAscending(2),
                onDescending: onDescending(2),
                hidden: false
            },
            {
                label: 'CLASSIFICATION',
                mapColumn: (row) => row.classification.join(' - '),
                hidden: false
            }
        ];

        const selected = this.rows.map(row => false);

        this.state = {
            sortedColumn: null,
            sortDirection: null,
            selected: selected,
        };
    }

    onSelect(row, newValue) {
        const selected = [...this.state.selected];
        const index = this.rows.indexOf(row);
        if (index > -1) {
            selected[index] = newValue;
            this.setState({selected: selected});
        }
    }

    onSelectAll(newValue) {
        const selected = this.rows.map(row => newValue);
        this.setState({
            selected: selected
        });
    }

    isSelected(row) {
        const index = this.rows.indexOf(row);
        if (index > -1) {
            return this.state.selected[index];
        }
        return false;
    }

    onSort(column, direction) {
        this.setState({
            sortedColumn: column,
            sortDirection: direction
        });
    }

    render() {
        let rows;
        if (this.state.sortedColumn) {
            const col = this.state.sortedColumn;
            if (this.state.sortDirection === 'descending') {
                rows = this.rows.sort((first, second) =>
                    (col.mapColumn(first) > col.mapColumn(second)
                        ? -1 
                        : (col.mapColumn(second) > col.mapColumn(first) ? 1 : 0)
                    )
                );
            } else {
                rows = this.rows.sort((first, second) =>
                    (col.mapColumn(first) > col.mapColumn(second)
                        ? 1 
                        : (col.mapColumn(second) > col.mapColumn(first) ? -1 : 0)
                    )
                );
            }
        } else {
            rows = this.rows;
        }
        return <ManagementList
            rows={rows}
            columns={this.cols}

            onSelect={this.onSelect.bind(this)}
            onSelectAll={this.onSelectAll.bind(this)}
            isSelected={this.isSelected.bind(this)}

            selectLabel={row => row.label}
            
            sortedColumn={this.state.sortedColumn}
            sortDirection={this.state.sortDirection}
        />
    }
}

<ManagementListDemo />
```
