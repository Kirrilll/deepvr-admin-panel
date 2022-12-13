
import { TimelineType } from "../../../entities/TimelineTypes";
import { TimelineDirector } from "../../../entities/TimelineUtilsTypes";
import TimelineDefaultDirector from "./TimelineDefaultDirector";
import TimelineLoadingDirector from "./TimelineLoadingDirector";
import TimelineTransposedDirector from "./TimelineTransposedDirector";

class TimelineDirectorFactory {
    static createTimelineDirector(type: TimelineType): TimelineDirector {
        switch (type) {
            case 'default':
                return TimelineDefaultDirector.instance;
            case 'transposed':
                return TimelineTransposedDirector.instance;
            default:
                return TimelineLoadingDirector.instance;
        }
    }
}

export default TimelineDirectorFactory;