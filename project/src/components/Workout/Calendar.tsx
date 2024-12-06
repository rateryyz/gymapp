import React from "react";
import { motion } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { useWorkoutStore } from "../../store/workoutStore";
import { CalendarIcon } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function Calendar() {
  const { selectedDate, setSelectedDate, workouts } = useWorkoutStore();
  const currentDate = parseISO(selectedDate);
  const { language } = useLanguage();

  const goToNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1);
    setSelectedDate(format(nextMonth, "yyyy-MM-dd"));
  };

  const goToPreviousMonth = () => {
    const prevMonth = subMonths(currentDate, 1);
    setSelectedDate(format(prevMonth, "yyyy-MM-dd"));
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getDayClass = (day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd");
    const hasWorkout = workouts.some((w) => w.date === dayStr);
    const isSelected = isSameDay(day, currentDate);
    const today = isToday(day);

    return `
      relative h-10 w-10 rounded-lg flex items-center justify-center
      ${hasWorkout ? "bg-orange-600 text-white" : "bg-gray-700 text-white"}
      ${isSelected ? "ring-2 ring-orange-500" : ""}
      ${today ? "font-bold" : ""}
      hover:bg-orange-700 transition-colors cursor-pointer
    `;
  };

  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="text-gray-400 hover:text-white"
        >
          ←
        </button>
        <h2 className="text-2xl font-bebas-neue text-orange-500 flex items-center">
          <CalendarIcon className="mr-2" />
          {format(currentDate, language === "English" ? "MMMM yyyy" : "LLLL yyyy")}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-gray-400 hover:text-white"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-montserrat text-gray-400"
          >
            {language === "English" ? day : day === "Sun" ? "Dom" : day === "Mon" ? "Seg" : day === "Tue" ? "Ter" : day === "Wed" ? "Qua" : day === "Thu" ? "Qui" : day === "Fri" ? "Sex" : "Sáb"}
          </div>
        ))}

        {days.map((day) => (
          <motion.button
            key={day.toString()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={getDayClass(day)}
            onClick={() => setSelectedDate(format(day, "yyyy-MM-dd"))}
          >
            {format(day, "d")}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
