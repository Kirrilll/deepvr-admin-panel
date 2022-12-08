import WorkingShiftResponse, { WorkingShiftView } from "../../entities/WorkingShift";
import TimeHelper from "../helpers/TimeHelper";


export default class WorkingParamsMapper {

    static toModel = (response: WorkingShiftResponse | null): WorkingShiftView=> {
        if(response === null) {
            return ({
                glasses: 0,
                time: []
            })
        }
        let workingShiftArr: Array<string> = [];
        

        const startTime = TimeHelper.getTimeInMinutes(response.start_at);
        const endTime = TimeHelper.getTimeInMinutes(response.end_at);
        const interval = Number.parseInt(response.interval);

        for (let time = startTime; time <= endTime; time += interval) {
            workingShiftArr.push(TimeHelper.getTimeFromMinutes(time));
        }

        return {
            glasses: Number.parseInt(response.glasses),
            time: workingShiftArr
        };
    }

}