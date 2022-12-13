import { Table } from 'antd';
import React from 'react';
import { OrderView } from '../../../entities/Order';



interface TableSummaryProps {
    columns: Array<number>
}

const TableSummary: React.FC<TableSummaryProps> = ({ columns}) => {

    return (
        <Table.Summary>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Св. шлемы</Table.Summary.Cell>
                {columns
                    .map((glasses, index) => <Table.Summary.Cell 
                        key={index}
                        index={index + 1}>
                        {glasses}
                    </Table.Summary.Cell>)}
            </Table.Summary.Row>
        </Table.Summary>
    )
}

export default TableSummary;