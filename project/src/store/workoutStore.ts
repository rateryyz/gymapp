import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DailyWorkout, Exercise, WorkoutSet } from '../types/workout';
import { format } from 'date-fns';

interface WorkoutState {
  workouts: DailyWorkout[];
  selectedDate: string;
  addWorkout: (workout: DailyWorkout) => void;
  updateWorkout: (id: string, workout: Partial<DailyWorkout>) => void;
  deleteWorkout: (id: string) => void;
  setSelectedDate: (date: string) => void;
  updateExerciseWeight: (workoutId: string, exerciseId: string, setId: string, weight: number) => void;
  completeSet: (workoutId: string, exerciseId: string, setId: string) => void;
  removeExercise: (workoutId: string, exerciseId: string) => void;
  editExercise: (workoutId: string, exerciseId: string, updatedExercise: Partial<Exercise>) => void;
  addExerciseToWorkout: (workoutId: string, newExercise: Exercise) => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      workouts: [],
      selectedDate: format(new Date(), 'yyyy-MM-dd'),
      
      addWorkout: (workout) =>
        set((state) => ({
          workouts: [...state.workouts, workout],
        })),
        
      updateWorkout: (id, workout) =>
        set((state) => ({
          workouts: state.workouts.map((w) =>
            w.id === id ? { ...w, ...workout } : w
          ),
        })),
        
      deleteWorkout: (id) =>
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== id),
        })),
        
      setSelectedDate: (date) =>
        set({ selectedDate: date }),
        
      updateExerciseWeight: (workoutId, exerciseId, setId, weight) =>
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  exercises: workout.exercises.map((exercise) =>
                    exercise.id === exerciseId
                      ? {
                          ...exercise,
                          sets: exercise.sets.map((set) =>
                            set.id === setId ? { ...set, weight } : set
                          ),
                        }
                      : exercise
                  ),
                }
              : workout
          ),
        })),
        
      completeSet: (workoutId, exerciseId, setId) =>
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  exercises: workout.exercises.map((exercise) =>
                    exercise.id === exerciseId
                      ? {
                          ...exercise,
                          sets: exercise.sets.map((set) =>
                            set.id === setId
                              ? { ...set, completed: !set.completed }
                              : set
                          ),
                        }
                      : exercise
                  ),
                }
              : workout
          ),
        })),

      removeExercise: (workoutId, exerciseId) =>
        set((state) => {
          const updatedWorkouts = state.workouts.map((workout) => {
            if (workout.id === workoutId) {
              const updatedExercises = workout.exercises.filter(
                (exercise) => exercise.id !== exerciseId
              );
              if (updatedExercises.length === 0) {
                
                return null;
              }
              return { ...workout, exercises: updatedExercises };
            }
            return workout;
          });
          return {
            workouts: updatedWorkouts.filter((workout) => workout !== null) as DailyWorkout[],
          };
        }),

      editExercise: (workoutId, exerciseId, updatedExercise) =>
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  exercises: workout.exercises.map((exercise) =>
                    exercise.id === exerciseId
                      ? { ...exercise, ...updatedExercise }
                      : exercise
                  ),
                }
              : workout
          ),
        })),

      addExerciseToWorkout: (workoutId, newExercise) =>
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  exercises: [...workout.exercises, newExercise],
                }
              : workout
          ),
        })),
    }),
    {
      name: 'workout-storage',
    }
  )
);

