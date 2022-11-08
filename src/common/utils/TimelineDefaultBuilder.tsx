import { ColumnsType, ColumnType } from "antd/lib/table";
import { Room } from "../../entities/Room";
import { BookingMatrix, Row } from "../../entities/TimelineTypes";
import { TimelineBuilder } from "../../entities/TimelineUtilsTypes";
import Cell from "../../features/timeline/ui/Cell";

type RowDefault = Row<Room>;


class TimelineDefaultBuilder implements TimelineBuilder{
    buildData(globalData: BookingMatrix, rooms: Room[]): RowDefault[] {
        return rooms.map<RowDefault>((room, index) => ({
            leadingCol: {
                key: room.id.toString(),
                ...room
            },
            shedule: globalData.at(index) ?? []
        }));
    };


    buildSummary(data: readonly RowDefault[]) {
        return <div>hj</div>;
    };
    // const buildSummary = (data: readonly RowData[]): React.ReactNode => {
    //     const columns = new Map<string, Array<BookingView | null>>();

    //     for (const date of workingShift) {
    //         columns.set(date, []);
    //     }
    //     for (const row of data) {
    //         const rowShedule = row.shedule;
    //         for (const date of Array.from(rowShedule.keys())) {
    //             columns.set(date, [...columns.get(date) ?? [], rowShedule.get(date) ?? null])
    //         }
    //     }
    //     return <TableSummary glasses={glasses} columns={Array.from(columns.values())} />
    // };

    buildColumns(workingShift: string[]) {
        const columns: ColumnsType<RowDefault> = [
            {
                title: 'Залы',
                key: 'rooms',
                dataIndex: 'rooms',
                width: '95px',
                fixed: 'left',
                render: (title, data) => <div className="room-name">
                    {data.leadingCol.title}
                    <p className="glasses-count">{`(≤ ${data.leadingCol.guest_max} чел.)`}</p>
                </div>
            },
            ...workingShift.map<ColumnType<RowDefault>>(time => ({
                title: time,
                key: time,
                dataIndex: time,
                render: (value, data, index) => {
                    console.log(data);
                    return <Cell
                        time={time}
                        roomId={data.leadingCol.id}
                        info={data.shedule.at(index) ?? null}
                    />
                }
            }))
        ]
        return columns as any[];
    };
}

export default TimelineDefaultBuilder;