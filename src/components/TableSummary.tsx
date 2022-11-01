import { Table } from 'antd';
import React from 'react';
import BookingView from '../entities/BookingView';


interface TableSummaryProps {
    columns: Array<BookingView | null>[];
}

const TableSummary: React.FC<TableSummaryProps> = ({ columns }) => {

    const buildFreeGlassesCount = (col: (BookingView | null)[]): number => {
        if (col.length == 0) return 20;
        return 20 - col
            .map(info => info?.guestCount ?? 0)
            .reduce((prev, next) => prev + next);
    }


    return (
        <Table.Summary>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Св. шлемы</Table.Summary.Cell>
                {columns
                    .map((col, index) => <Table.Summary.Cell 
                        key={index}
                        index={index + 1}>
                        {buildFreeGlassesCount(col)}
                    </Table.Summary.Cell>)}
            </Table.Summary.Row>
        </Table.Summary>
    )
}

export default TableSummary;