
import { ColumnsType, ColumnType } from "antd/lib/table";
import {Room} from "../../../entities/Room";
import { SheduleTime, CellPivot, OrderCellMatrix, Row } from "../../../entities/TimelineTypes";
import { TimelineBuilder } from "../../../entities/TimelineUtilsTypes";
import Cell from "../../../features/timeline/ui/Cell";


type RowTransposed = Row<SheduleTime>;
//TODO пофиксить формат данных
class TimelineTransposedBuilder implements TimelineBuilder {

    buildSummary = (...args: any[]) => undefined;

    private buildGlasses(allGlassesCount: number, shedule: (CellPivot | null)[]) {
        if (shedule.length == 0) return allGlassesCount;
        return allGlassesCount - shedule
            .map(cell => cell?.order.bookings[cell.bookingIndex].guestCount ?? 0)
            .reduce((prev, next) => prev + next);
    }

    buildData(globalData: OrderCellMatrix, times: string[], glasses: number): RowTransposed[] {
        return times.map((time, index) => {
            const shedule = globalData.at(index) ?? [];
            return ({
                leadingCol: {
                    key: time,
                    time: time,
                    restGlasses: this.buildGlasses(glasses, shedule)
                },
                shedule: shedule
            })
        });
    }

    buildColumns(rooms: Room[]) {
        const columns: ColumnsType<Row<SheduleTime>> = [
            {
                title: 'Залы',
                key: 'rooms',
                dataIndex: 'rooms',
                width: '95px',
                fixed: 'left',
                render: (title, data) => <div className="room-name">
                    {data.leadingCol.time}
                    <p className="glasses-count">{`(≤ ${data.leadingCol.restGlasses} чел.)`}</p>
                </div>
            },
            ...rooms.map<ColumnType<RowTransposed>>((room, index) => ({
                title: room.title,
                key: room.id,
                dataIndex: room.id,
                render: (value, data) => <Cell
                    roomId={room.id}
                    time={data.leadingCol.time}
                    pivot={data.shedule[index]}
                />
            }))
        ]
        return columns;
    };

}

export default TimelineTransposedBuilder