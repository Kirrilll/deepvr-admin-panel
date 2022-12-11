
import { CellPivot } from "../../entities/Cell";
import { OrderView } from "../../entities/Order";
import { Room } from "../../entities/Room";
import { OrderCellMatrix, TimelineView } from "../../entities/TimelineTypes";
import TimelineFactory from "../utils/timeline/TimelineFactory";


type OrderMapDefault = Map<number, Map<string, CellPivot | null>>;
type OrderMapTransposed = Map<string, Map<number, CellPivot | null>>;

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