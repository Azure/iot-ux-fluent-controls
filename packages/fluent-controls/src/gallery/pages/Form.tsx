import * as React from 'react';
import * as classNames from 'classnames/bind';
import { TextField } from '../../Form';
import { SelectField } from '../../Form';

interface SelectObj {
    output: string;
}

export class SelectInputTest extends React.Component<any, any> {
    names: string[];
    labels: string[];
    errors: string[];
    placeholders: string[];

    constructor(props: any) {
        super(props);

        this.create = this.create.bind(this);

        this.state = {
            values: [
                { output: 'o1'},
                { output: 'out2'},
                { output: 'oput3'},
                { output: 'output4'},
                { output: 'output5'},
            ],
            options: [
                { output: 'o1'},
                { output: 'out2'},
                { output: 'oput3'},
                { output: 'output4'},
                { output: 'output5'},
            ],
            errors: [
                null,
                null,
                null,
                null,
                null
            ]
        };
        
        this.names = [
            'Name1',
            'Name2',
            'Name3',
            'Name4',
            'Name5'
        ];

        this.labels = [
            'Name1',
            'Name2',
            'Name3',
            'Name4',
            'Name5'
        ];
    }

    create(index) {
        let onChange = (newValue: any) => {
            let newValues = [...this.state.values];
            newValues[index] = newValue;
            let newErrors = [...this.state.errors];
            if (newValue.output.length <= 3) {
                newErrors[index] = '------------------------------------ This field must be at least 3 characters long';
            } else {
                newErrors[index] = null;
            }
            this.setState({values: newValues, errors: newErrors});
            console.log(newValue);
        };

        const options = this.state.options.map(opt => {
            return { label: `-----${opt.output}`, value: opt };
        });
            
        return (
            <SelectField
                name={this.names[index]}
                value={this.state.values[index]}
                options={options}
                label={this.labels[index]}
                error={this.state.errors[index]}
                onChange={onChange}
                disabled={index === 4 ? true : false}
                required={index % 2 ? true : false}
            />
        );
    }

    render() {
        return (
            <div>
                {this.create(0)}
                {this.create(1)}
                {this.create(2)}
                {this.create(3)}
                {this.create(4)}
            </div>
        );
    }
}

export class TextFieldTest extends React.Component<any, any> {
    names: string[];
    labels: string[];
    errors: string[];
    placeholders: string[];

    constructor(props: any) {
        super(props);

        this.create = this.create.bind(this);

        this.state = {
            values: ['', '', '', '', ''],
            errors: [
                null,
                null,
                null,
                null,
                null
            ]
        };
        
        this.names = [
            'Name1',
            'Name2',
            'Name3',
            'Name4',
            'Name5'
        ];

        this.labels = [
            'Name1',
            'Name2',
            'Name3',
            'Name4',
            'Name5'
        ];

        this.placeholders = [
            'Placeholder!',
            '',
            'Not a placeholder but yes I am!',
            'Yes!',
            ''
        ];
    }

    create(index) {
        let onChange = (newValue: string) => {
            let newValues = [...this.state.values];
            newValues[index] = newValue;
            let newErrors = [...this.state.errors];
            if (newValue.length <= 3) {
                newErrors[index] = '------------------------------------ This field must be at least 3 characters long';
            }
            this.setState({values: newValues, errors: newErrors});
        };

        let onClear = () => {
            let newValues = [...this.state.values];
            newValues[index] = ''   ;
            let newErrors = [...this.state.errors];
            newErrors[index] = 'This field must be at least 3 characters long';
            this.setState({values: newValues, errors: newErrors});

        };
        return (
            <TextField 
                name={this.names[index]}
                value={this.state.values[index]}
                label={this.labels[index]}
                error={this.state.errors[index]}
                placeholder={this.placeholders[index]}
                onChange={onChange}
                onClear={onClear}
                disabled={index === 4 ? true : false}
                required={index % 2 ? true : false}
            />
        );
    }

    render() {
        return (
            <div>
                {this.create(0)}
                {this.create(1)}
                {this.create(2)}
                {this.create(3)}
                {this.create(4)}
            </div>
        );
    }
}
