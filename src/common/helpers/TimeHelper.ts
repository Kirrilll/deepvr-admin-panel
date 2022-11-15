
export interface Time {
    hours: number,
    minutes: number,
    time: string
}

export default class TimeHelper {

    private static readonly MAX_DAY_MINUTES: number = 1439;

    static transformTimeNumToTimeStr(value: number): string {
        return value > 10 ? value.toString() : `0${value}`;
    }

    static fromDateToMinutes(date: Date): number {
        return date.getMinutes();
    }

    static fromDateToTime(date: Date): Time {
        const hours = date.getHours();
        const restMinutes = date.getMinutes();
        const hoursStr = TimeHelper.transformTimeNumToTimeStr(hours);
        const minutesStr = TimeHelper.transformTimeNumToTimeStr(restMinutes);
        return ({
            hours: hours,
            minutes: restMinutes,
            time: hoursStr + ':' + minutesStr
        });
    }
}