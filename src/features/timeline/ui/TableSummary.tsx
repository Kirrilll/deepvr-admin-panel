import { Table } from 'antd';
import React from 'react';
import { OrderView } from '../../../entities/Order';



interface TableSummaryProps {
    columns: Array<number>
    glasses: number
}

const TableSummary: React.FC<TableSummaryProps> = ({ columns, glasses }) => {




    // const buildFreeGlassesCount = (col: (OrderView | null)[]): number => {
    //     if (col.length == 0) return glasses;
    //     return glasses - col
    //         .map(info => info?.guestCount ?? 0)
    //         .reduce((prev, next) => prev + next);
    // }


    return (
        <Table.Summary>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Св. шлемы</Table.Summary.Cell>
                {columns
                    .map((col, index) => <Table.Summary.Cell 
                        key={index}
                        index={index + 1}>
                        {glasses - col}
                    </Table.Summary.Cell>)}
            </Table.Summary.Row>
        </Table.Summary>
    )
}

export default TableSummary;