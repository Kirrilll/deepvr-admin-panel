import { ColumnsType, ColumnType } from "antd/lib/table";
import { CellPivot } from "../../../entities/Cell";
import { Room } from "../../../entities/Room";
import { TimelineOptions } from "../../../entities/TimelineOptions";
import { OrderCellMatrix, Row } from "../../../entities/TimelineTypes";
import { SummaryCallback, TimelineBuilder } from "../../../entities/TimelineUtilsTypes";
import Cell from "../../../features/timeline/ui/Cell";
import TableSummary from "../../../features/timeline/ui/TableSummary";
import { REFERENCE_CELL_WIDTH } from "../../../features/timeline/ui/Timeline";


type RowDefault = Row<Room>;


//Ячейка хранит OrderView,

//В случае если в одном ряду подряд записи с одинаковы id, объединяем ячейки, rowSpan = <order.booking.lenth>
//В случае если в одной колонне несколько записей с одинаковым id, объединяем столбцы 


//Храним обрубленную матрицу
//Передаем матрицу ячеек
class TimelineDefaultBuilder implements TimelineBuilder {

    buildSummary(remainingGlasses: Map<string, number>): SummaryCallback {

        return (data: readonly RowDefault[]) =>  <TableSummary
                columns={Array.from(remainingGlasses.values())} />
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