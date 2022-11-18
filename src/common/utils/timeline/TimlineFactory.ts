
import { TimelineType } from "../../../entities/TimelineTypes";
import { TimelineDirector } from "../../../entities/TimelineUtilsTypes";
import TimelineDefaultDirector from "./TimelineDefaultDirector";
import TimelineLoadingDirector from "./TimelineLoadingDirector";
import TimelineTransposedDirector from "./TimelineTransposedDirector";

class TimelineFactory {
    static createTimeline(type: TimelineType): TimelineDirector {
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

export default TimelineFactory;