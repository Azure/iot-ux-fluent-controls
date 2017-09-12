import * as React from 'react';
import * as classNames from 'classnames/bind';
import { TextField } from '../../Form';
import { SelectField } from '../../Form';
import { RadioField } from '../../Form';

export const FormFieldTest = () => {
    return (
        <div>
            <div><RadioFieldTest /></div>
            <div><SelectFieldTest /></div>
            <div><TextFieldTest /></div>
        </div>
    );
};

interface SelectObj {
    output: string;
}

export class SelectFieldTest extends React.Component<any, any> {
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
            <div style={{ margin: '20px'}}>
                {this.create(0)}
                {this.create(1)}
                {this.create(2)}
                {this.create(3)}
                {this.create(4)}
            </div>
        );
    }
}

export class RadioFieldTest extends React.Component<any, any> {
    names: string[];
    labels: string[];
    errors: string[];

    constructor(props: any) {
        super(props);

        this.create = this.create.bind(this);

        let out5 = { output: 'output5' };
        this.state = {
            values: [
                { output: 'o1'},
                { output: 'out2'},
                { output: 'oput3'},
                { output: 'output4'},
                out5,
            ],
            options: [
                { output: 'o1'},
                { output: 'out2'},
                { output: 'oput3'},
                { output: 'output4'},
                out5,
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
                newErrors[index] = '----------- Thiss field must be at least 3 characters long';
            } else {
                newErrors[index] = null;
            }
            this.setState({values: newValues, errors: newErrors});
        };

        const options = this.state.options.map(opt => {
            let label;
            if (index % 2 === 0) {
                label = <span>{`-----${opt.output}`}<br/>asd</span>;
            } else {
                label = <span>{`-----${opt.output}`}</span>;
            }
            return { label: label, value: opt };
        });
            
        return (
            <RadioField
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
            <div style={{ margin: '20px'}}>
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

        return (
            <TextField 
                name={this.names[index]}
                value={this.state.values[index]}
                label={this.labels[index]}
                error={this.state.errors[index]}
                placeholder={this.placeholders[index]}
                onChange={onChange}
                disabled={index === 4 ? true : false}
                required={index % 2 ? true : false}
            />
        );
    }

    render() {
        return (
            <div style={{ margin: '20px'}}>
                {this.create(0)}
                {this.create(1)}
                {this.create(2)}
                {this.create(3)}
                {this.create(4)}
            </div>
        );
    }
}
