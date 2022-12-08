import moment from "moment";
import React, { useEffect, useState } from "react";
import TimeHelper from "../helpers/TimeHelper";

export const MAX_SELECTABLE_TIME_DIFF = -50 / 60;

interface HookAttrs {
    maxTimeDiff?: number,
    time: string,
    date: moment.Moment
}



const useTimeChecker = (attrs: HookAttrs) => {
    const { time, maxTimeDiff, date } = attrs;
    const _maxTimeDiff = maxTimeDiff ?? MAX_SELECTABLE_TIME_DIFF;
    const [isAfter, setAfter] = useState(false);


    const checkTime = () => {
        const currTime = moment().format('HH:mm');
        const timeDiff = TimeHelper.getTimeDiff(time, currTime);
        const isAfterTemp = timeDiff > _maxTimeDiff;
        if (isAfterTemp != isAfter) {
            setAfter(isAfterTemp);
        }
    }

    useEffect(() => {
        if (date.isAfter(moment(), 'date')) {
            setAfter(true);
            return;
        }
        if (date.isBefore(moment(), 'date')) {
            setAfter(false);
            return;
        }
        checkTime();
        const interval = setInterval(checkTime, 1000);
        return () => clearInterval(interval);;
    }, [date])

    return isAfter;
}

export default useTimeChecker;