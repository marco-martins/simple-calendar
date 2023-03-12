import { Day } from "./day";
export type Calendar = {
    year: number;
    yearShort: number;
    month: string;
    monthShort: string;
    selectedDay: Date | undefined;
    days: Day[];
};
