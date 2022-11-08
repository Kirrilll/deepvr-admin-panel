import WorkingShiftResponse, { WorkingShiftView } from "../../entities/WorkingShift";


export default class TimeMapper {

    timeToMinutes = (time: string): number => {
        const timeSplitted = time.split(':');

        const hours = Number.parseInt(timeSplitted[0]);
        const minutes = Number.parseInt(timeSplitted[1]);
        const timeInMinutes = hours * 60 + minutes;

        return timeInMinutes;
    }

    minutesToTime = (minutes: number): string => {
        const _hours = Math.ceil(minutes / 60);
        const _minutes = minutes - _hours * 60;

        const hoursStr = _hours >= 10 ? _hours : `0${_hours}`;
        const minutesStr = _minutes >= 10 ? _minutes : `0${_minutes}`;

        return hoursStr + ':' + minutesStr;
    }

    transformToModel = (response: WorkingShiftResponse): WorkingShiftView=> {

        let workingShiftArr: Array<string> = [];
        
        const startTime = this.timeToMinutes(response.start_at);
        const endTime = this.timeToMinutes(response.end_at);
        const interval = Number.parseInt(response.interval);

        for (let time = startTime; time <= endTime; time += interval) {
            workingShiftArr.push(this.minutesToTime(time));
        }

        return {
            glasses: Number.parseInt(response.glasses),
            time: workingShiftArr
        };
    }

}