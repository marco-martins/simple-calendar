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
  eachYearOfInterval,
} from "date-fns";
import { Calendar } from "./types/calendar";
import { Day } from "./types/day";

export class SimpleCalendar {
  date: Date;
  calendar!: Calendar;

  constructor({ date = new Date() }: { date?: Date } = {}) {
    this.date = date;
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

  setSelectedDay({ date }: { date: Date }): Calendar {
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

  getWeekDays({ short = false }: { short?: boolean } = {}): string[] {
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return short ? weekDays.map((wday) => wday.slice(0, 3)) : weekDays;
  }

  getMonths({ short = false }: { short?: boolean } = {}): string[] {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return short ? months.map((month) => month.slice(0, 3)) : months;
  }

  getYears({
    startYear,
    endYear,
    short,
  }: {
    startYear: number | string;
    endYear: number | string;
    short?: boolean;
  }): string[] {
    const start = new Date().setFullYear(+startYear);
    const end = new Date().setFullYear(+endYear);
    const years = eachYearOfInterval({ start, end }).map((date) =>
      date.getFullYear().toString()
    );
    return short ? years.map((month) => month.slice(-2)) : years;
  }

  private generateCalendar(): Calendar {
    return (this.calendar = {
      year: getYear(this.date),
      yearShort: +format(this.date, "yy"),
      month: format(this.date, "MMMM"),
      monthShort: format(this.date, "MMM"),
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
