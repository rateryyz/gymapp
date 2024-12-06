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
    restTime: number;
    notes?: string;
  }
  
  export interface DailyWorkout {
    id: string;
    date: string;
    exercises: Exercise[];
    completed: boolean; 
  }
  
  export interface WorkoutPermissions {
    canEdit: boolean;
    canComplete: boolean;
  }
  
  export function getWorkoutPermissions(role: string): WorkoutPermissions {
    switch (role) {
      case "admin":
        return { canEdit: true, canComplete: true };
      case "trainer":
        return { canEdit: true, canComplete: true };
      case "student":
        return { canEdit: false, canComplete: true };
      default:
        return { canEdit: false, canComplete: false };
    }
  }
  
  