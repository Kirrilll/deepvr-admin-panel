export type TimelineModeType = 'selection' | 'idle';


export interface TimelineOptions {
    isFixed: boolean,
}

export interface TimelineMode {
    type: TimelineModeType,
    extraData?: any
}

export interface SelectionMode extends TimelineMode {
    type: TimelineModeType & 'selection',
    extraData?: string
}

export interface Idlemode extends TimelineMode {
    type: 'idle'
}
