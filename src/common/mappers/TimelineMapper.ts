import { CellPivot } from "../../entities/Cell";
import { OrderCellMatrix, Timeline } from "../../entities/TimelineTypes";


type OrderMapDefault = Map<number, Map<string, CellPivot | null>>;
type OrderMapTransposed = Map<string, Map<number, CellPivot | null>>;

type TransposedTimeline = Timeline<number, string>
type DefaultTimelineView = Timeline<string, number>

export default class TimelineMapper {

    static mapToMatrix<KeyOneType, KeyTwoType, ValueType>(map: Map<KeyOneType, Map<KeyTwoType, ValueType>>): ValueType[][] {
        return Array
            .from(map.values())
            .map(innerMap => Array
                .from(innerMap.values()))
    }



    static toOrderMatrixDefault(map: OrderMapDefault): OrderCellMatrix {
        return TimelineMapper.mapToMatrix<number, string, CellPivot | null>(map);
    }

    static toOrderMatrixTransposed(map: OrderMapTransposed): OrderCellMatrix {
        return TimelineMapper.mapToMatrix<string, number, CellPivot | null>(map);
    }
}