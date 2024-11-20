import { Doc } from "@/convex/_generated/dataModel";

interface CreateExerciseSetProps {
  workoutSession: Doc<"workoutSession">;
}

const CreateExerciseSet = ({ workoutSession }: CreateExerciseSetProps) => {
  return <div>{workoutSession.workoutName}</div>;
};

export default CreateExerciseSet;
