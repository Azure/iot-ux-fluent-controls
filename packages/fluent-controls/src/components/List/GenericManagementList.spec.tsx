import * as React from 'react';
import * as sinon from 'sinon';
import * as classNames from 'classnames/bind';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { GenericManagementList, GenericManagementListAttributes } from './GenericManagementList';
import { keyCode } from '../../Common';
import { TestHookWrapper } from '../Tests';
const css = classNames.bind(require('./GenericManagementList.scss'));

export interface Row {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
    col6: string;
}

class ManagementList extends GenericManagementList<Row> {}

describe('<GenericManagementList />', () => {
    it('passes down attributes from Column and Row objects', () => {
        const rowRefs: HTMLDivElement[] = [];
        const colRefs: HTMLDivElement[] = [];
        
        const createRow = (row: number) => {
            return {
                col1: `Col 1 Row ${row}`,
                col2: `Col 2 Row ${row}`,
                col3: `Col 3 Row ${row}`,
                col4: `Col 4 Row ${row}`,
                col5: `Col 5 Row ${row}`,
                col6: `Col 6 Row ${row}`,
                attr: {
                    className: `test-row-${row}`,
                    ref: (element) => rowRefs.push(element),
                    'data-test-hook': `test-row-${row}`
                }
            };
        };
        const createCol = (col: number) => {
            return {
                label: `Column ${col}`,
                mapColumn: row => row[`col${col}`],
                attr: {
                    className: `test-col-${col}`,
                    ref: (element) => colRefs.push(element),
                    'data-test-hook': `test-col-${col}`
                }
            };
        };

        const wrapper = new TestHookWrapper<GenericManagementListAttributes>(
            <ManagementList
                columns={[
                    createCol(1),
                    createCol(2),
                    createCol(3),
                    createCol(4),
                    createCol(5),
                    createCol(6),
                ]}
                rows={[
                    createRow(1),
                    createRow(2),
                    createRow(3),
                    createRow(4),
                    createRow(5),
                    createRow(6),
                ]}
            />,
            []
        );

        expect(wrapper.find('test-row-1').first().hasClass('test-row-1')).to.equal(true);
        expect(wrapper.find('test-row-1').first().hasClass('test-row-6')).to.equal(false);
        expect(wrapper.find('test-row-1').first().hasClass(css('column-content'))).to.equal(true);

        expect(wrapper.find('test-row-6').first().hasClass('test-row-6')).to.equal(true);
        expect(wrapper.find('test-row-6').first().hasClass('test-row-1')).to.equal(false);
        expect(wrapper.find('test-row-6').first().hasClass(css('column-content'))).to.equal(true);

        expect(wrapper.find('test-col-1').first().hasClass('test-col-1')).to.equal(true);
        expect(wrapper.find('test-col-1').first().hasClass('test-col-6')).to.equal(false);
        expect(wrapper.find('test-col-1').first().hasClass(css('column'))).to.equal(true);

        expect(wrapper.find('test-col-6').first().hasClass('test-col-6')).to.equal(true);
        expect(wrapper.find('test-col-6').first().hasClass('test-col-1')).to.equal(false);
        expect(wrapper.find('test-col-6').first().hasClass(css('column'))).to.equal(true);
    });
});
