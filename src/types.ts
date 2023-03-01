export type Day = {
  date: Date;
  day: number;
  isSameMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

export type Calendar = {
  year: number;
  yearAbbr: number;
  month: string;
  monthAbbr: string;
  weekDays: string[];
  weekDaysAbbr: string[];
  selectedDay: Date | undefined;
  days: Day[];
};
