import { ColumnsType, ColumnType } from "antd/lib/table";
import { ReactNode } from "react";
import { Room } from "../../../entities/Room";
import { OrderCellMatrix, Row } from "../../../entities/TimelineTypes";
import { SummaryCallback, TimelineBuilder } from "../../../entities/TimelineUtilsTypes";
import Cell from "../../../features/timeline/ui/Cell";
import MathHelper from "../../helpers/MathHelper";

type RowDefault = Row<Room>;


//Ячейка хранит OrderView,

//В случае если в одном ряду подряд записи с одинаковы id, объединяем ячейки, rowSpan = <order.booking.lenth>
//В случае если в одной колонне несколько записей с одинаковым id, объединяем столбцы 


//Храним обрубленную матрицу
//Передаем матрицу ячеек
class TimelineDefaultBuilder implements TimelineBuilder {

    buildSummary(glasses: number, workingShift: string[]): SummaryCallback {

        return (data: readonly RowDefault[]) => {
            for (const time of workingShift) {
                for (const row of data) {

                }
            }
            return <div>adad</div>
        }
    };


    buildData(globalData: OrderCellMatrix, rooms: Room[]): RowDefault[] {
        return rooms.map<RowDefault>((room, index) => ({
            leadingCol: {
                key: room.id.toString(),
                ...room
            },
            shedule: globalData.at(index) ?? []
        }));
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
            ...workingShift.map<ColumnType<RowDefault>>((time, index) => ({
                title: time,
                key: time,
                // onCell: (data, index) => {
                //     if(index == 2) {
                //         return {colSpan: 2}
                //     }
                //     return {colSpan: 1};
                // },
                dataIndex: time,
                render: (value, data) => {
                    return <Cell
                        time={time}
                        roomId={data.leadingCol.id}
                        pivot={data.shedule.at(index) ?? null}
                    />
                }
            }))
        ]
        return columns as any[];
    };
}

export default TimelineDefaultBuilder;