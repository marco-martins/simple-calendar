"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCalendar = void 0;
const date_fns_1 = require("date-fns");
class SimpleCalendar {
    constructor({ date = new Date() } = {}) {
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
    setSelectedDay({ date }) {
        this.calendar.selectedDay = date;
        const days = this.calendar.days.map((day) => (Object.assign(Object.assign({}, day), { isSelected: (0, date_fns_1.isSameDay)(date, day.date) })));
        return (this.calendar = Object.assign(Object.assign({}, this.calendar), { days }));
    }
    getSelectedDay() {
        return this.calendar.days.find((day) => day.isSelected);
    }
    getWeekDays({ short = false } = {}) {
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
    getMonths({ short = false } = {}) {
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
    getYears({ startYear, endYear, short, }) {
        const start = new Date().setFullYear(+startYear);
        const end = new Date().setFullYear(+endYear);
        const years = (0, date_fns_1.eachYearOfInterval)({ start, end }).map((date) => date.getFullYear().toString());
        return short ? years.map((month) => month.slice(-2)) : years;
    }
    generateCalendar() {
        var _a;
        return (this.calendar = {
            year: (0, date_fns_1.getYear)(this.date),
            yearShort: +(0, date_fns_1.format)(this.date, "yy"),
            month: (0, date_fns_1.format)(this.date, "MMMM"),
            monthShort: (0, date_fns_1.format)(this.date, "MMM"),
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
