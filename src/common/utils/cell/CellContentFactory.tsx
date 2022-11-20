import { CellPivot } from "../../../entities/TimelineTypes";
import BookedCell from "../../../features/timeline/ui/BookedCell";

class CellContentFactory {
    static createContent(pivot: CellPivot | null): React.ReactNode | null {
        if(pivot != null) {
            //Возвращаю BookingCellBuilder - он решает как будет выглядеть объект (передавать сюда размеры)
            return <BookedCell pivot={pivot}/>
        }
        return null;
    }
}

export default CellContentFactory;