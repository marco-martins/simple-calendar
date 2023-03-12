import { describe, it, expect } from "vitest";
import { SimpleCalendar } from "./lib";

/** 
Calendar test month (February 2023)

Sun, Mon Tue, Wed, Thu, Fri, Sat

[29, 30, 31, 1, 2, 3, 4,
 5, 6, 7, 8, 9, 10, 11,
 12, 13, 14, 15, 16, 17, 18,
 19, 20, 21, 22, 23, 24, 25,
 26, 27, 28, 1, 2, 3, 4]
 
*/

describe("Simple calendar lib", () => {
  it("should return a month calendar for the given date", () => {
    const date = new Date("2023-02-11");
    const simpleCalendar = new SimpleCalendar({ date });
    const calendar = simpleCalendar.calendar;

    expect(calendar.year).toBe(2023);
    expect(calendar.yearShort).toBe(23);
    expect(calendar.month).toBe("February");
    expect(calendar.monthShort).toBe("Feb");
    expect(calendar.days).toBeInstanceOf(Array);
  });

  describe("calendar days", () => {
    it("should return the first day of the month", () => {
      const date = new Date("2023-02-11");
      const simpleCalendar = new SimpleCalendar({ date });
      const firstDay = simpleCalendar.calendar.days.at(0);

      const firstDayMock = {
        date: new Date(new Date("2023-01-29").setHours(0, 0, 0, 0)),
        day: 29,
        isSameMonth: false,
        isToday: false,
        isSelected: false,
      };

      expect(firstDay).toEqual(expect.objectContaining(firstDayMock));
    });

    it("should return the last day of the month", () => {
      const date = new Date("2023-02-11");
      const simpleCalendar = new SimpleCalendar({ date });
      const lastDay = simpleCalendar.calendar.days.at(-1);

      const lastDayMock = {
        date: new Date(new Date("2023-03-04").setHours(0, 0, 0, 0)),
        day: 4,
        isSameMonth: false,
        isToday: false,
        isSelected: false,
      };

      expect(lastDay).toEqual(expect.objectContaining(lastDayMock));
    });

    it("should return the today date", () => {
      const date = new Date();
      const simpleCalendar = new SimpleCalendar({ date });
      const dayIndex = simpleCalendar.calendar.days.findIndex(
        (i) => i.day === 11
      );

      const today = simpleCalendar.calendar.days.at(dayIndex + 1);

      const todayMock = {
        date: new Date(date.setHours(0, 0, 0, 0)),
        day: date.getDate(),
        isSameMonth: true,
        isToday: true,
        isSelected: false,
      };

      expect(today).toEqual(expect.objectContaining(todayMock));
    });
  });

  describe("prevMonth", () => {
    it("should return the previews month calendar", () => {
      const date = new Date("2023-02-11");
      const simpleCalendar = new SimpleCalendar({ date });
      const calendar = simpleCalendar.prevMonth();
      expect(calendar.month).toBe("January");
    });
  });

  describe("nextMonth", () => {
    it("should return the next month calendar", () => {
      const date = new Date("2023-02-11");
      const simpleCalendar = new SimpleCalendar({ date });
      const calendar = simpleCalendar.nextMonth();
      expect(calendar.month).toBe("March");
    });
  });

  describe("setSelectedDay", () => {
    it("should return the selected day", () => {
      const date = new Date("2023-02-01");
      const simpleCalendar = new SimpleCalendar({ date });
      date.setDate(date.getDate() + 1); // tomorrow
      const calendar = simpleCalendar.setSelectedDay({ date });
      const selectedDay = calendar.days.at(4);

      expect(calendar.selectedDay).toEqual(date);
      expect(selectedDay?.day).toBe(2);
      expect(selectedDay?.isSelected).toBeTruthy();
    });

    it("should return only one selected day", () => {
      const date = new Date("2023-02-01");
      const simpleCalendar = new SimpleCalendar({ date });
      date.setDate(date.getDate() + 1); // tomorrow
      date.setDate(date.getDate() + 1); // after tomorrow
      const calendar = simpleCalendar.setSelectedDay({ date });
      const selectedDays = calendar.days.filter((day) => day.isSelected);

      expect(selectedDays).toHaveLength(1);
    });

    it("should restore the selected day after month move", () => {
      const date = new Date("2023-02-01");
      const simpleCalendar = new SimpleCalendar({ date });
      date.setDate(date.getDate() + 1); // tomorrow

      simpleCalendar.setSelectedDay({ date });
      simpleCalendar.nextMonth();
      const calendar = simpleCalendar.prevMonth();
      const selectedDay = calendar.days.at(4);

      expect(calendar.month).toBe("February");
      expect(selectedDay?.day).toBe(2);
    });
  });

  describe("getSelectedDay", () => {
    const date = new Date("2023-02-01");
    const simpleCalendar = new SimpleCalendar({ date });

    it("should return the selected day", () => {
      date.setDate(date.getDate() + 1); // tomorrow
      simpleCalendar.setSelectedDay({ date });
      const selectedDay = simpleCalendar.getSelectedDay();

      expect(selectedDay?.date).toEqual(
        new Date(new Date("2023-02-02").setHours(0, 0, 0, 0))
      );
    });
  });

  describe("getWeeksDays", () => {
    it("should return the week names", () => {
      const simpleCalendar = new SimpleCalendar();
      const weekDays = simpleCalendar.getWeekDays();
      expect(weekDays).toEqual(
        expect.arrayContaining([
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ])
      );
    });

    it("should return the week days in the short format", () => {
      const simpleCalendar = new SimpleCalendar();
      const weekDays = simpleCalendar.getWeekDays({ short: true });
      expect(weekDays).toEqual(
        expect.arrayContaining([
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ])
      );
    });
  });

  describe("getMonths", () => {
    it("should return the months", () => {
      const simpleCalendar = new SimpleCalendar();
      const months = simpleCalendar.getMonths();
      expect(months).toEqual(
        expect.arrayContaining([
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
        ])
      );
    });

    it("should return the months in the short format", () => {
      const simpleCalendar = new SimpleCalendar();
      const months = simpleCalendar.getMonths({ short: true });
      expect(months).toEqual(
        expect.arrayContaining([
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ])
      );
    });
  });

  describe("getYears", () => {
    it("should return the years range", () => {
      const simpleCalendar = new SimpleCalendar();
      const years = simpleCalendar.getYears({
        startYear: 2018,
        endYear: 2023,
      });
      expect(years).toEqual(
        expect.arrayContaining(["2018", "2019", "2020", "2021", "2022", "2023"])
      );
    });

    it("should return the of years in short format", () => {
      const simpleCalendar = new SimpleCalendar();
      const years = simpleCalendar.getYears({
        startYear: 2018,
        endYear: 2023,
        short: true,
      });
      expect(years).toEqual(
        expect.arrayContaining(["18", "19", "20", "21", "22", "23"])
      );
    });
  });
});
