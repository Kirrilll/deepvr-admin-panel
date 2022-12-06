import { ColumnsType, ColumnType } from "antd/lib/table";
import { CellPivot } from "../../../entities/Cell";
import { Room } from "../../../entities/Room";
import { OrderCellMatrix, Row } from "../../../entities/TimelineTypes";
import { SummaryCallback, TimelineBuilder } from "../../../entities/TimelineUtilsTypes";
import Cell from "../../../features/timeline/ui/Cell";
import TableSummary from "../../../features/timeline/ui/TableSummary";


type RowDefault = Row<Room>;


//Ячейка хранит OrderView,

//В случае если в одном ряду подряд записи с одинаковы id, объединяем ячейки, rowSpan = <order.booking.lenth>
//В случае если в одной колонне несколько записей с одинаковым id, объединяем столбцы 


//Храним обрубленную матрицу
//Передаем матрицу ячеек
class TimelineDefaultBuilder implements TimelineBuilder {

    buildSummary(glasses: number, workingShift: string[]): SummaryCallback {
        return (data: readonly RowDefault[]) => {
            const columns = new Map<string, Array<number>>();
            for (let timeColIndex = 0; timeColIndex < workingShift.length; timeColIndex++) {
                const time = workingShift[timeColIndex];
                for (const row of data) {
                    let bookedGlasses = row.shedule[timeColIndex] === null
                        ? 0
                        : row.shedule[timeColIndex]!.order.bookings[row.shedule[timeColIndex]!.bookingIndex].guestCount;
                    columns.set(time, [...(columns.get(time) ?? []), bookedGlasses]);
                }
            }
            return <TableSummary
                columns={Array
                    .from(columns.values())
                    .map(col => col
                        .reduce((prev, next) => prev + next))}
                glasses={glasses} />
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
                dataIndex: time,
                render: (value, data) => {
                    return (<Cell
                        roomId={data.leadingCol.id}
                        time={time}
                        pivot={data.shedule.at(index) ?? null}
                    />)
                }
            }))
        ]
        return columns as any[];
    };
}

export default TimelineDefaultBuilder;