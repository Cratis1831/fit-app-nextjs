"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";

const WorkoutIdPage = () => {
  const { workoutId } = useParams<{ workoutId: Id<"workoutSession"> }>();
  const workout = useQuery(api.workout.getWorkoutById, {
    workoutId,
  });

  const createExerciseSet = useMutation(api.workout.createExerciseSet);

  const handleCreateExerciseSet = async () =>
    await createExerciseSet({
      workoutId,
      exerciseId: "jn7fv2dd02vb8hcgrr5yqy9j4s7540qz" as Id<"exercises">,
      sets: 1,
      reps: 10,
      weight: 100,
    });

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Button onClick={handleCreateExerciseSet}>Click me</Button>
        <h1>Workout Name: {workout?.workoutSession.workoutName}</h1>
        <div>
          {workout?.workoutSets.map((set) => {
            return (
              <div key={set._id}>
                <p>Set Number: {set.setNumber}</p>
                <p>Reps: {set.reps}</p>
                <p>Weight: {set.weight}</p>
                <p>Set Note: {set.setNote}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutIdPage;
