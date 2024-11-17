"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState("ashkan_1984");
  const createWorkout = useMutation(api.workout.createWorkoutSession);
  const getAllWorkouts = useQuery(api.workout.getAllWorkouts, { userId });

  const handleCreateWorkout = async () => {
    const userId = "ashkan_1984 ";
    const date: Date = new Date();
    try {
      const data = await createWorkout({
        userId,
        workoutDate: date.toString(),
      });
      setUserId(userId);
      console.log(data);
    } catch (error) {
      console.error("Error creating workout session:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button size={"lg"} onClick={handleCreateWorkout}>
        Create Workout Session
      </Button>
      <div>
        <ul>
          {getAllWorkouts?.map((workout) => (
            <li key={workout._id}>
              {workout.userId} - {workout.workoutDate}
              {workout.exerciseSet?.length}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
