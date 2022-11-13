import { ColumnsType, ColumnType } from "antd/lib/table";
import OrderView, { OrderMatrix } from "../../entities/OrderView";
import { Room } from "../../entities/Room";
import { Row, SheduleTime } from "../../entities/TimelineTypes";
import { TimelineBuilder } from "../../entities/TimelineUtilsTypes";
import Cell from "../../features/timeline/ui/Cell";

type RowTransposed = Row<SheduleTime>;
//TODO пофиксить формат данных
class TimelineTransposedBuilder implements TimelineBuilder {

    buildSummary = (...args: any[]) => undefined;

    private buildGlasses(allGlassesCount: number, shedule: (OrderView | null)[]) {
        if (shedule.length == 0) return allGlassesCount;
        return allGlassesCount - shedule
            .map(order => order?.bookings
                .map(booking => booking.guestCount)
                .reduce((prev, next) => prev + next) ?? 0)
            .reduce((prev, next) => prev + next);
    }

    buildData(globalData: OrderMatrix, times: string[], glasses: number): RowTransposed[] {
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
                    info={data.shedule[index]}
                />
            }))
        ]
        return columns;
    };

}

export default TimelineTransposedBuilder