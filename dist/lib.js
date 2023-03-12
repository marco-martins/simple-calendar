"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCalendar = void 0;
const date_fns_1 = require("date-fns");
const utils_1 = require("./utils");
class SimpleCalendar {
    constructor(date) {
        this.date = date;
        this.generateCalendar();
    }
    prevMonth() {
        this.date = (0, date_fns_1.subMonths)(this.date, 1);
        return this.generateCalendar();
    }
    nextMonth() {
        this.date = (0, date_fns_1.addMonths)(this.date, 1);
        return this.generateCalendar();
    }
    isSameDay(dateA, dateB) {
        return (0, date_fns_1.isSameDay)(dateA, dateB);
    }
    isToday(date) {
        return (0, date_fns_1.isToday)(date);
    }
    setSelectedDay(date) {
        this.calendar.selectedDay = date;
        const days = this.calendar.days.map((day) => (Object.assign(Object.assign({}, day), { isSelected: (0, date_fns_1.isSameDay)(date, day.date) })));
        return (this.calendar = Object.assign(Object.assign({}, this.calendar), { days }));
    }
    getSelectedDay() {
        return this.calendar.days.find((day) => day.isSelected);
    }
    getYearsRange(startYear, endYear) {
        const start = new Date().setFullYear(startYear);
        const end = new Date().setFullYear(endYear);
        return (0, date_fns_1.eachYearOfInterval)({ start, end }).map((date) => date.getFullYear());
    }
    generateCalendar() {
        var _a;
        return (this.calendar = {
            year: (0, date_fns_1.getYear)(this.date),
            yearAbbr: +(0, date_fns_1.format)(this.date, "yy"),
            month: (0, date_fns_1.format)(this.date, "MMMM"),
            monthAbbr: (0, date_fns_1.format)(this.date, "MMM"),
            weekDays: (0, utils_1.weekDays)(),
            weekDaysAbbr: (0, utils_1.weekDaysAbbr)(),
            selectedDay: (_a = this.calendar) === null || _a === void 0 ? void 0 : _a.selectedDay,
            days: this.generateDays(this.date),
        });
    }
    generateDays(date) {
        const startOfTheMonth = (0, date_fns_1.startOfMonth)(date);
        const endOfTheMonth = (0, date_fns_1.endOfMonth)(date);
        const startDate = (0, date_fns_1.startOfWeek)(startOfTheMonth);
        const endDate = (0, date_fns_1.endOfWeek)(endOfTheMonth);
        const days = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
            days.push({
                date: currentDate,
                day: currentDate.getDate(),
                isSameMonth: (0, date_fns_1.isSameMonth)(currentDate, date),
                isToday: (0, date_fns_1.isSameDay)(currentDate, new Date()),
                isSelected: false,
            });
            currentDate = (0, date_fns_1.addDays)(currentDate, 1);
        }
        return days;
    }
}
exports.SimpleCalendar = SimpleCalendar;
