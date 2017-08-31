import * as React from 'react';
import * as classNames from 'classnames/bind';
import { TextField } from '../../Form';

export class FormTest extends React.Component<any, any> {
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

// export const FormTest = () => {
    
//     const out1 = () => {
//         return (
//             <TextField name='test1' value='test1' label={'Coming soon!'} required>
//             </TextField>
//         );
//     };

//     const out2 = () => {
//         return (
//             <TextField name='test1' value='testdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd1' label='Coming soon!' required>
//             </TextField>
//         );
//     };

//     const out3 = () => {
//         return (
//             <TextField name='test1' value='test1' label='Coming soon!' disabled>
//             </TextField>
//         );
//     };

//     const out4 = () => {
//         return (
//             <TextField name='test1' value='test1' label='Coming soon!' placeholder='Coming!'>
//             </TextField>
//         );
//     };

//     const out5 = () => {
//         return (
//             <TextField name='test1' value='test1' label='Coming s!' placeholder='email' >
//             </TextField>
//         );
//     };

//     return (
//         <div>
//             {out1()}
//             {out2()}
//             {out3()}
//             {out4()}
//             {out5()}
//         </div>
//     );
// };
