
export interface Time {
    hours: number,
    minutes: number,
    time: string
}

export default class TimeHelper {

    private static readonly MAX_DAY_MINUTES: number = 1439;


    static isEquals(tFirstStr: string, tSecondStr: string): number {
        const tFirst = TimeHelper.transformStringToTime(tFirstStr);
        const tSecond = TimeHelper.transformStringToTime(tSecondStr);
        
        const tFirtsHours = tFirst.hours + tFirst.minutes / 60;
        const tSecondHours = tSecond.hours + tSecond.minutes / 60;
        return tFirtsHours - tSecondHours;
    }

    static isNextOrPrev(tFirstStr: string, tSecondStr: string): boolean{
        return Math.abs(TimeHelper.isEquals(tFirstStr, tSecondStr)) <= 1;
    }

    static transformStringToTime(value: string): Time {
        const timeSplitted = value.split(':');
        const hours = Number.parseInt(timeSplitted[0]);
        const minutes = Number.parseInt(timeSplitted[1]);
        return ({
            hours: hours,
            minutes: minutes,
            time: value
        });
    }

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