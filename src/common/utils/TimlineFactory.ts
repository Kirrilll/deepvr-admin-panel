import { TimelineType } from "../../entities/TimelineTypes";
import { TimelineDirector } from "../../entities/TimelineUtilsTypes";
import TimelineDefaultDirector from "./TimelineDefaultDirector";
import TimelineTransposedDirector from "./TimelineTransposedDirector";

class TimelineFactory {
    static createTimeline(type: TimelineType): TimelineDirector {
        switch (type) {
            case 'default':
                return TimelineDefaultDirector.instance;
            default:
                return TimelineTransposedDirector.instance;
        }
    }
}

export default TimelineFactory;