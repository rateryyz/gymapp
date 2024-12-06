import { UserRole } from './index';

export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
  restTime: number; // in seconds
  notes?: string;
}

export interface DailyWorkout {
  id: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
}

export interface WorkoutHistory {
  date: string;
  exercises: Exercise[];
}

export interface WorkoutPermissions {
  canEdit: boolean;
  canDelete: boolean;
  canComplete: boolean;
}

export const getWorkoutPermissions = (role: UserRole): WorkoutPermissions => ({
  canEdit: role === 'trainer',
  canDelete: role === 'trainer',
  canComplete: role === 'student',
});