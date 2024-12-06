import React from "react";
import { motion } from "framer-motion";
import { Exercise, WorkoutPermissions } from "../../types/workout";
import { Clock, Dumbbell, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from "../../context/LanguageContext";

interface ExerciseCardProps {
  exercise: Exercise;
  permissions: WorkoutPermissions;
  onWeightUpdate: (setId: string, weight: number) => void;
  onSetComplete: (setId: string) => void;
  onEdit: () => void;
  onRemove: () => void;
}

export function ExerciseCard({
  exercise,
  permissions,
  onWeightUpdate,
  onSetComplete,
  onEdit,
  onRemove,
}: ExerciseCardProps) {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-700 rounded-lg p-4 shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bebas-neue text-orange-500 flex items-center">
          <Dumbbell className="mr-2" />
          {exercise.name}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {language === "English"
                ? `${exercise.restTime}s rest`
                : language === "Portuguese"
                ? `${exercise.restTime}s de descanso`
                : `${exercise.restTime}s de descanso`}
            </span>
          </div>
          {permissions.canEdit && (
            <>
              <button
                onClick={onEdit}
                className="text-gray-400 hover:text-orange-500"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={onRemove}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {exercise.sets.map((set, index) => (
          <div
            key={set.id}
            className="flex items-center justify-between bg-gray-600 p-3 rounded-md"
          >
            <span className="text-gray-300 font-montserrat">
              {language === "English"
                ? `Set ${index + 1}`
                : language === "Portuguese"
                ? `Série ${index + 1}`
                : `Serie ${index + 1}`}
            </span>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={set.weight}
                onChange={(e) =>
                  onWeightUpdate(set.id, parseFloat(e.target.value))
                }
                className="w-20 bg-gray-700 text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder={language === "English" ? "Weight" : "Peso"}
                disabled={!permissions.canComplete}
              />
              <span className="text-gray-300">
                {set.reps}{" "}
                {language === "English" ? "reps" : language === "Portuguese" ? "reps" : "repeticiones"}
              </span>
              {permissions.canComplete && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSetComplete(set.id)}
                  className={`px-3 py-1 rounded ${
                    set.completed
                      ? "bg-orange-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-orange-600 hover:text-white"
                  } transition-colors duration-200`}
                >
                  {set.completed
                    ? language === "English"
                      ? "Done"
                      : language === "Portuguese"
                      ? "Feito"
                      : "Hecho"
                    : language === "English"
                    ? "Complete"
                    : language === "Portuguese"
                    ? "Completar"
                    : "Completar"}
                </motion.button>
              )}
            </div>
          </div>
        ))}
      </div>

      {exercise.notes && (
        <p className="mt-4 text-sm text-gray-400 italic">
          {language === "English"
            ? exercise.notes
            : language === "Portuguese"
            ? exercise.notes
            : exercise.notes}
        </p>
      )}
    </motion.div>
  );
}

