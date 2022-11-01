interface WorkingTime {
    start_at: string,
    end_at: string,
    interval: string,
    glasses: string
}

export interface WorkingShiftView{
    time: string[],
    glasses: number
}

type WorkingShiftResponse = WorkingTime;

export default WorkingShiftResponse;