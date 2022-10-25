import { Table } from 'antd';
import React from 'react';
import { BookingInfo } from '../types';


interface TableSummaryProps {
    columns: Array<BookingInfo | null>[];
}

const TableSummary: React.FC<TableSummaryProps> = ({ columns }) => {
    const buildFreeGlassesCount = (col: (BookingInfo | null)[]) =>
        20 - col
            .map(info => info?.guestCount ?? 0)
            .reduce((prev, next) => prev + next)

    return (
        <Table.Summary>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Св. шлемы</Table.Summary.Cell>
                {columns
                    .map((col, index) => <Table.Summary.Cell
                        index={index + 1}>
                        {buildFreeGlassesCount(col)}
                    </Table.Summary.Cell>)}
            </Table.Summary.Row>
        </Table.Summary>
    )
}

export default TableSummary;