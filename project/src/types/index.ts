export type UserRole = 'student' | 'trainer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  studentId: string;
  trainerId: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}