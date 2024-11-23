"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const ExercisListPage = () => {
  const exercises = useQuery(api.workout.getAllExercises);
  return (
    <div>
      <h1>Exercises</h1>
      <div>
        {exercises?.map((exercise) => {
          return (
            <div key={exercise._id}>
              <p>Exercise Name: {exercise.exerciseName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExercisListPage;
