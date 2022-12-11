
import { Skeleton } from "antd";
import { CellContentType, CellPivot } from "../../../entities/Cell";
import BookedCell from "../../../features/timeline/ui/BookedCell";
import { DefaultTableSkeleton } from "../timeline/TimelineLoadingBuilder";


class CellContentFactory {
    static createContent(pivot: CellPivot | null, type: CellContentType): React.ReactNode | null {
        if(type == 'loading'){
            return <DefaultTableSkeleton/>
        }
        if(pivot == null){
            return null;
        }
        if(type == 'default'){
            return <BookedCell pivot={pivot}/>
        }
        if(type == 'simplified'){
            return <BookedCell isSimplified = {true} pivot = {pivot}/>
        }
    }
}

export default CellContentFactory;