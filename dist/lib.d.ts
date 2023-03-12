import { Calendar } from "./types/calendar";
import { Day } from "./types/day";
export declare class SimpleCalendar {
    date: Date;
    calendar: Calendar;
    constructor({ date }?: {
        date?: Date;
    });
    prevMonth(): Calendar;
    nextMonth(): Calendar;
    setSelectedDay({ date }: {
        date: Date;
    }): Calendar;
    getSelectedDay(): Day | undefined;
    getWeekDays({ short }?: {
        short?: boolean;
    }): string[];
    getMonths({ short }?: {
        short?: boolean;
    }): string[];
    getYears({ startYear, endYear, short, }: {
        startYear: number | string;
        endYear: number | string;
        short?: boolean;
    }): string[];
    private generateCalendar;
    private generateDays;
}
