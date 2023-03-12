import { describe, it, expect } from "vitest";
import { SimpleCalendar } from "./lib";
import { weekDays, weekDaysAbbr } from "./utils";

describe("Simple calendar lib", () => {
  it("should return a month calendar for the given date", () => {
    const date = new Date("2023-02-11");
    const simpleCalendar = new SimpleCalendar(date);
    const calendar = simpleCalendar.calendar;

    expect(calendar.year).toBe(2023);
    expect(calendar.yearAbbr).toBe(23);
    expect(calendar.month).toBe("February");
    expect(calendar.monthAbbr).toBe("Feb");
    expect(calendar.weekDays).toEqual(expect.arrayContaining(weekDays()));
    expect(calendar.weekDaysAbbr).toEqual(
      expect.arrayContaining(weekDaysAbbr())
    );
    expect(calendar.days).toBeInstanceOf(Array);
  });

  describe("calendar days", () => {
    it("should return the first day of the month", () => {
      const date = new Date("2023-02-11");
      const simpleCalendar = new SimpleCalendar(date);
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
      const simpleCalendar = new SimpleCalendar(date);
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
      const simpleCalendar = new SimpleCalendar(date);
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
      const simpleCalendar = new SimpleCalendar(date);
      const calendar = simpleCalendar.prevMonth();
      expect(calendar.month).toBe("January");
    });
  });

  describe("nextMonth", () => {
    it("should return the next month calendar", () => {
      const date = new Date("2023-02-11");
      const simpleCalendar = new SimpleCalendar(date);
      const calendar = simpleCalendar.nextMonth();
      expect(calendar.month).toBe("March");
    });
  });

  describe("isSameDay", () => {
    const date = new Date("2023-02-11");
    const simpleCalendar = new SimpleCalendar(date);

    it("should return true if the dates are the same", () => {
      expect(simpleCalendar.isSameDay(date, date)).toBeTruthy();
    });

    it("should return false if the dates are not the same", () => {
      const dateA = new Date("2023-02-11");
      const dateB = new Date("2023-02-12");
      expect(simpleCalendar.isSameDay(dateA, dateB)).toBeFalsy();
    });
  });

  describe("isToday", () => {
    const date = new Date();
    const simpleCalendar = new SimpleCalendar(date);

    it("should return false if the date are today", () => {
      expect(simpleCalendar.isToday(date)).toBeTruthy();
    });

    it("should return false if the date are not today", () => {
      date.setDate(date.getDate() + 1); // tomorrow
      expect(simpleCalendar.isToday(date)).toBeFalsy();
    });
  });

  describe("setSelectedDay", () => {
    it("should return the selected day", () => {
      const date = new Date("2023-02-01");
      const simpleCalendar = new SimpleCalendar(date);
      date.setDate(date.getDate() + 1); // tomorrow
      const calendar = simpleCalendar.setSelectedDay(date);
      const selectedDay = calendar.days.at(4);

      expect(calendar.selectedDay).toEqual(date);
      expect(selectedDay?.day).toBe(2);
      expect(selectedDay?.isSelected).toBeTruthy();
    });

    it("should return only one selected day", () => {
      const date = new Date("2023-02-01");
      const simpleCalendar = new SimpleCalendar(date);
      date.setDate(date.getDate() + 1); // tomorrow
      date.setDate(date.getDate() + 1); // after tomorrow
      const calendar = simpleCalendar.setSelectedDay(date);
      const selectedDays = calendar.days.filter((day) => day.isSelected);

      expect(selectedDays).toHaveLength(1);
    });

    it("should restore the selected day after month move", () => {
      const date = new Date("2023-02-01");
      const simpleCalendar = new SimpleCalendar(date);
      date.setDate(date.getDate() + 1); // tomorrow

      simpleCalendar.setSelectedDay(date);
      simpleCalendar.nextMonth();
      const calendar = simpleCalendar.prevMonth();
      const selectedDay = calendar.days.at(4);

      expect(calendar.month).toBe("February");
      expect(selectedDay?.day).toBe(2);
    });
  });

  describe("getSelectedDay", () => {
    const date = new Date("2023-02-01");
    const simpleCalendar = new SimpleCalendar(date);

    it("should return the selected day", () => {
      date.setDate(date.getDate() + 1); // tomorrow
      simpleCalendar.setSelectedDay(date);
      const selectedDay = simpleCalendar.getSelectedDay();

      expect(selectedDay?.date).toEqual(
        new Date(new Date("2023-02-02").setHours(0, 0, 0, 0))
      );
    });
  });

  describe("getYearsRange", () => {
    it("should return a range of years", () => {
      const date = new Date("2023-02-01");
      const simpleCalendar = new SimpleCalendar(date);
      const yearsRange = simpleCalendar.getYearsRange(2018, 2023);
      expect(yearsRange).toEqual(
        expect.arrayContaining([2018, 2019, 2020, 2021, 2022, 2023])
      );
    });
  });
});
