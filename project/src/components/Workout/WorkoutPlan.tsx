import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, CalendarIcon } from 'lucide-react';
import { Calendar } from "./Calendar";
import { ExerciseCard } from "./ExerciseCard";
import { CreateWorkout } from "./CreateWorkout";
import { useWorkoutStore } from "../../store/workoutStore";
import { useAuthStore } from "../../store/authStore";
import { getWorkoutPermissions } from "../../types/workout";
import { useLanguage } from "../../context/LanguageContext";
import { Exercise, DailyWorkout } from "../../types/workout";

export function WorkoutPlan() {
  const { user } = useAuthStore();
  const { 
    workouts, 
    selectedDate, 
    updateExerciseWeight, 
    completeSet, 
    updateWorkout, 
    addExerciseToWorkout, 
    removeExercise,
    editExercise,
    addWorkout
  } = useWorkoutStore();
  const { language } = useLanguage();

  const currentWorkout = workouts.find((w) => w.date === selectedDate);
  const permissions = getWorkoutPermissions(user?.role || "student");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);

  const handleRemoveExercise = (exerciseId: string) => {
    if (currentWorkout) {
      removeExercise(currentWorkout.id, exerciseId);
    }
  };

  const handleEditExercise = (exerciseId: string) => {
    setEditingExerciseId(exerciseId);
  };

  const handleAddExercise = () => {
    setEditingExerciseId("new");
  };

  const handleSaveExercise = (exercise: Exercise) => {
    if (currentWorkout) {
      if (editingExerciseId === "new") {
        addExerciseToWorkout(currentWorkout.id, exercise);
      } else {
        editExercise(currentWorkout.id, editingExerciseId!, exercise);
      }
    } else {
      const newWorkout: DailyWorkout = {
        id: crypto.randomUUID(),
        date: selectedDate,
        exercises: [exercise],
        completed: false
      };
      addWorkout(newWorkout);
    }
    setEditingExerciseId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="flex justify-center">
          <CalendarIcon className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="text-center text-3xl font-bebas-neue text-white">
          {language === "English"
            ? "Workout Plan"
            : language === "Portuguese"
            ? "Plano de Treino"
            : "Plan de Entrenamiento"}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Calendar />
          </div>

          <div className="lg:col-span-2">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <h3 className="text-2xl font-bebas-neue text-orange-500">
                {language === "English"
                  ? `Workout for ${selectedDate}`
                  : language === "Portuguese"
                  ? `Treino para ${selectedDate}`
                  : `Entrenamiento para ${selectedDate}`}
              </h3>
              {currentWorkout && currentWorkout.exercises.map((exercise) => (
                <React.Fragment key={exercise.id}>
                  {editingExerciseId === exercise.id ? (
                    <CreateWorkout
                      initialExercise={exercise}
                      onSave={handleSaveExercise}
                      onCancel={() => setEditingExerciseId(null)}
                    />
                  ) : (
                    <ExerciseCard
                      exercise={exercise}
                      permissions={permissions}
                      onWeightUpdate={(setId, weight) =>
                        updateExerciseWeight(
                          currentWorkout.id,
                          exercise.id,
                          setId,
                          weight
                        )
                      }
                      onSetComplete={(setId) =>
                        completeSet(currentWorkout.id, exercise.id, setId)
                      }
                      onEdit={() => handleEditExercise(exercise.id)}
                      onRemove={() => handleRemoveExercise(exercise.id)}
                    />
                  )}
                </React.Fragment>
              ))}
              {editingExerciseId === "new" ? (
                <CreateWorkout
                  onSave={handleSaveExercise}
                  onCancel={() => setEditingExerciseId(null)}
                />
              ) : (
                permissions.canEdit && (
                  <button
                    onClick={handleAddExercise}
                    className="mt-4 flex items-center space-x-2 text-orange-500 hover:text-orange-400"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{language === "English" ? "Add Exercise" : "Adicionar Exercício"}</span>
                  </button>
                )
              )}
              {!currentWorkout && !editingExerciseId && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">
                    {language === "English"
                      ? "No workout planned for this day."
                      : language === "Portuguese"
                      ? "Nenhum treino planejado para este dia."
                      : "No hay entrenamiento planeado para este día."}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

