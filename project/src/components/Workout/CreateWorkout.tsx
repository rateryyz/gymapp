import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, X } from 'lucide-react';
import { useLanguage } from "../../context/LanguageContext";
import { Exercise } from "../../types/workout";

interface CreateWorkoutProps {
  initialExercise?: Exercise;
  onSave: (exercise: Exercise) => void;
  onCancel: () => void;
}

export function CreateWorkout({ initialExercise, onSave, onCancel }: CreateWorkoutProps) {
  const [exercise, setExercise] = useState<Exercise>(
    initialExercise || {
      id: crypto.randomUUID(),
      name: "",
      sets: [{ id: crypto.randomUUID(), weight: 0, reps: 12, completed: false }],
      restTime: 60,
      notes: "",
    }
  );
  const { language } = useLanguage();

  useEffect(() => {
    if (initialExercise) {
      setExercise(initialExercise);
    }
  }, [initialExercise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(exercise);
    setExercise({
      id: crypto.randomUUID(),
      name: "",
      sets: [{ id: crypto.randomUUID(), weight: 0, reps: 12, completed: false }],
      restTime: 60,
      notes: "",
    });
  };

  return (
    <div className="bg-gray-700 rounded-xl p-6 shadow-md mt-6">
      <h3 className="text-2xl font-bebas-neue text-orange-500 mb-6">
        {language === "English" ? "Create Exercise" : "Criar Exercício"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              value={exercise.name}
              onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
              placeholder={language === "English" ? "Exercise name" : "Nome do exercício"}
              className="bg-gray-600 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex space-x-2">
              <input
                type="number"
                value={exercise.sets.length}
                onChange={(e) => {
                  const newSetsCount = parseInt(e.target.value);
                  const currentSets = exercise.sets;
                  const newSets = Array.from({ length: newSetsCount }, (_, index) => 
                    currentSets[index] || { id: crypto.randomUUID(), weight: 0, reps: 12, completed: false }
                  );
                  setExercise({ ...exercise, sets: newSets });
                }}
                placeholder={language === "English" ? "Sets" : "Séries"}
                className="bg-gray-600 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="number"
                value={exercise.sets[0].reps}
                onChange={(e) => {
                  const newReps = parseInt(e.target.value);
                  setExercise({
                    ...exercise,
                    sets: exercise.sets.map(set => ({ ...set, reps: newReps }))
                  });
                }}
                placeholder={language === "English" ? "Reps" : "Repetições"}
                className="bg-gray-600 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="number"
                value={exercise.restTime}
                onChange={(e) => setExercise({ ...exercise, restTime: parseInt(e.target.value) })}
                placeholder={language === "English" ? "Rest (s)" : "Descanso (s)"}
                className="bg-gray-600 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <textarea
            value={exercise.notes}
            onChange={(e) => setExercise({ ...exercise, notes: e.target.value })}
            placeholder={language === "English" ? "Notes" : "Observações"}
            className="bg-gray-600 text-white rounded-lg px-3 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-700"
          >
            {language === "English" ? "Cancel" : "Cancelar"}
          </button>
          <button
            type="submit"
            className="bg-orange-600 text-white rounded-lg px-4 py-2 hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-700"
          >
            {initialExercise
              ? language === "English"
                ? "Update Exercise"
                : "Atualizar Exercício"
              : language === "English"
              ? "Add Exercise"
              : "Adicionar Exercício"}
          </button>
        </div>
      </form>
    </div>
  );
}

