import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  workoutSession: defineTable({
    userId: v.string(),
    workoutName: v.string(),
    workoutNote: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
  workoutSets: defineTable({
    workoutId: v.id("workoutSession"),
    exerciseId: v.id("exercises"),
    setNumber: v.float64(),
    reps: v.float64(),
    weight: v.float64(),
    setNote: v.optional(v.string()),
  }).index("by_workoutId", ["workoutId"]),
  equipmentList: defineTable({
    equipmentName: v.string(),
  }),
  exercises: defineTable({
    bodyPartId: v.id("bodyParts"),
    equipmentId: v.id("equipmentList"),
    exerciseName: v.string(),
    exerciseNote: v.optional(v.string()),
  })
    .index("by_bodyPartId", ["bodyPartId"])
    .index("by_equipmentId", ["equipmentId"]),
  bodyParts: defineTable({
    bodyPartName: v.string(),
  }),
  activeSession: defineTable({
    userId: v.string(),
    activeWorkoutSession: v.id("workoutSession"),
  }).index("by_userId", ["userId"]),
});
