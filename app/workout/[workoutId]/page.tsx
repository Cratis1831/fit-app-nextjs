"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

const WorkoutIdPage = () => {
  const { workoutId } = useParams<{ workoutId: Id<"workoutSession"> }>();
  const workout = useQuery(api.workout.getWorkoutById, {
    workoutId,
  });

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <p>{workout?.workoutName}</p>
      </div>
    </div>
  );
};

export default WorkoutIdPage;
