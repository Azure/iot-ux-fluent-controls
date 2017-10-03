```jsx
const rows = [
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

const cols = [
    {
        label: 'NAME',
        mapColumn: (row) => row.name,
        onAscending: (rows) => rows,
        onDescending: (rows) => rows,
        hidden: false
    },
    {
        label: 'OWNER',
        mapColumn: (row) => row.owner,
        onAscending: (rows) => rows,
        onDescending: (rows) => rows,
        hidden: false
    },
    {
        label: 'LAST UPDATED',
        mapColumn: (row) => row.lastUpdated.toUTCString(),
        onAscending: (rows) => rows,
        onDescending: (rows) => rows,
        hidden: false
    },
    {
        label: 'CLASSIFICATION',
        mapColumn: (row) => row.classification.join(' - '),
        onAscending: (rows) => rows,
        onDescending: (rows) => rows,
        hidden: false
    }
];


<StatelessGrid
    rows={rows}
    columns={cols}
    onSelected={(row) => alert(row)}
    isSelected={(row) => false}
/>
```