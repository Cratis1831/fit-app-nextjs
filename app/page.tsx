"use client";
import CreateWorkoutSession from "@/components/create-workout-session";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const getAllWorkouts = useQuery(api.workout.getAllWorkouts, {
    userId: "ashkan_1984",
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CreateWorkoutSession />
      <div className="pt-10">
        <ul>
          {getAllWorkouts?.map((workout) => (
            <li key={workout._id}>
              {workout.userId} - {workout.workoutName} - {workout.workoutDate}
              {workout.exerciseSet?.length}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
