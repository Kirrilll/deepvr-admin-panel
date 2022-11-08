import { Skeleton, TableColumnsType } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { Room } from "../../entities/Room";
import { BookingMatrix, Row } from "../../entities/TimelineTypes";
import { SummaryCallback, TimelineBuilder } from "../../entities/TimelineUtilsTypes";



const DefaultTableSkeleton: React.FC = () => {
    return (
        <div style={{ padding: '10px' }}>
            <Skeleton paragraph={false} active />
        </div>
    )
}

class TimelineLoadingBuilder implements TimelineBuilder {

    private static readonly DEFAULT_ROW_COUNT: number = 5;
    private static readonly DEFAULT_COL_COUNT: number = 12;

    buildSummary = () => undefined;

    buildData(): Row<any>[] {
        return new Array(TimelineLoadingBuilder.DEFAULT_ROW_COUNT).fill(null).map((item, index) => ({
            leadingCol: {
                key: index.toString()
            },
            shedule: new Array(TimelineLoadingBuilder.DEFAULT_COL_COUNT).fill(null)
        }))
    }
    buildColumns(): TableColumnsType<any> {
        const columns: ColumnsType<any> = [
            {
                title: <DefaultTableSkeleton />,
                key: 'rooms',
                dataIndex: 'rooms',
                width: '95px',
                fixed: 'left',
                render: (title, data) => <DefaultTableSkeleton />
            },
            ...new Array(TimelineLoadingBuilder.DEFAULT_COL_COUNT).fill(null).map<ColumnType<any>>((item, index) => ({
                title: <DefaultTableSkeleton />,
                key: index,
                dataIndex: index,
                render: (value, data, index) => {
                    return <DefaultTableSkeleton />
                }
            }))
        ]
        return columns as any[];
    }

}

export default TimelineLoadingBuilder;