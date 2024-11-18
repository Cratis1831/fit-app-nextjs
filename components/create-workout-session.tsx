"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

const CreateWorkoutSession = () => {
  const createWorkout = useMutation(api.workout.createWorkoutSession);

  const [workoutName, setworkoutName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateWorkout = async (e: FormEvent) => {
    const userId = "ashkan_1984"; //TODO: get user id from auth
    const date: Date = new Date();
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const data = await createWorkout({
        userId,
        workoutDate: date.toString(),
        workoutName,
      });

      console.log(data);
    } catch (error) {
      console.error("Error creating workout session:", error);
    }
    setIsOpen(false);
    setworkoutName("");
    setIsSubmitting(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Start Workout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Workout Session</DialogTitle>
          <DialogDescription>
            Create your new workout session here. Click Go when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateWorkout}>
          <div className="grid gap-4 py-4">
            <div className="items-center gap-4 flex justify-start">
              <Input
                id="title"
                placeholder="Workout Name..."
                className="col-span-3"
                value={workoutName}
                onChange={(e) => setworkoutName(e.target.value)}
                required
              />
            </div>
            <Button disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
              Create Workout
            </Button>
          </div>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkoutSession;
