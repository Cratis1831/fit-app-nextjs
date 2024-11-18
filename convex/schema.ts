import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  workoutSession: defineTable({
    userId: v.string(),
    workoutDate: v.string(),
    workoutName: v.string(),
    workoutNote: v.optional(v.string()),
    exerciseSet: v.optional(
      v.array(
        v.object({
          exerciseId: v.id("exercises"),
          exerciseNote: v.string(),
          exerciseOrder: v.float64(),
          sets: v.array(
            v.object({
              setNumber: v.float64(),
              reps: v.float64(),
              weight: v.float64(),
              setNote: v.string(),
            })
          ),
        })
      )
    ),
  }),
  exercises: defineTable({
    bodyPartId: v.id("bodyParts"),
    exerciseName: v.string(),
    exerciseNote: v.string(),
  }),
  bodyParts: defineTable({
    bodyPartName: v.string(),
  }),
  activeSession: defineTable({
    userId: v.string(),
    activeWorkoutSession: v.id("workoutSession"),
  }),
});
