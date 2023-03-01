import {
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  getYear,
  format,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";
import { weekDays, weekDaysAbbr } from "./utils";
import { Calendar, Day } from "./types";

export class SimpleCalendar {
  calendar!: Calendar;

  constructor(private date: Date) {
    this.generateCalendar();
  }

  prevMonth(): Calendar {
    this.date = subMonths(this.date, 1);
    return this.generateCalendar();
  }

  nextMonth(): Calendar {
    this.date = addMonths(this.date, 1);
    return this.generateCalendar();
  }

  isSameDay(dateA: Date, dateB: Date): boolean {
    return isSameDay(dateA, dateB);
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  setSelectedDay(date: Date): Calendar {
    this.calendar.selectedDay = date;

    const days = this.calendar.days.map((day) => ({
      ...day,
      isSelected: isSameDay(date, day.date),
    }));

    return (this.calendar = { ...this.calendar, days });
  }

  getSelectedDay(): Day | undefined {
    return this.calendar.days.find((day) => day.isSelected);
  }

  private generateCalendar(): Calendar {
    return (this.calendar = {
      year: getYear(this.date),
      yearAbbr: +format(this.date, "yy"),
      month: format(this.date, "MMMM"),
      monthAbbr: format(this.date, "MMM"),
      weekDays: weekDays(),
      weekDaysAbbr: weekDaysAbbr(),
      selectedDay: this.calendar?.selectedDay,
      days: this.generateDays(this.date),
    });
  }

  private generateDays(date: Date): Day[] {
    const startOfTheMonth = startOfMonth(date);
    const endOfTheMonth = endOfMonth(date);
    const startDate = startOfWeek(startOfTheMonth);
    const endDate = endOfWeek(endOfTheMonth);
    const days: Day[] = [];

    let currentDate = startDate;

    while (currentDate <= endDate) {
      days.push({
        date: currentDate,
        day: currentDate.getDate(),
        isSameMonth: isSameMonth(currentDate, date),
        isToday: isSameDay(currentDate, new Date()),
        isSelected: false,
      });
      currentDate = addDays(currentDate, 1);
    }

    return days;
  }
}
