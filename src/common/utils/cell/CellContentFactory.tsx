
import { Skeleton } from "antd";
import { CellContentType, CellPivot } from "../../../entities/Cell";
import BookedCell, { DefaultBookingView, SimplifiedBookingView, SpacedBookingView } from "../../../features/selection/ui/BookedCell";
import { DefaultTableSkeleton } from "../timeline/TimelineLoadingBuilder";


class CellContentFactory {
    static createContent(pivots: CellPivot[] | null, type: CellContentType): React.ReactNode | null {
        if (pivots == null) {
            return null;
        }

        switch (type) {
            case 'loading':
                return <DefaultTableSkeleton />
            case 'simplified':
                return <BookedCell
                    pivots={pivots}
                    bookingView={SimplifiedBookingView} />
            case 'simplified-spaced':
                return <BookedCell
                    pivots={pivots}
                    bookingView={SpacedBookingView}
                />
            default:
                return <BookedCell
                    pivots={pivots}
                    bookingView={DefaultBookingView} />
        }
    }
}

export default CellContentFactory;