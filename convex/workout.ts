import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createWorkoutSession = mutation({
  args: {
    userId: v.string(),
    workoutDate: v.string(),
    workoutName: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Get valid user id from auth + db before trying to create a workout session

    const workoutSessionId = await ctx.db.insert("workoutSession", {
      userId: args.userId,

      workoutName: args.workoutName,
    });

    if (!workoutSessionId) {
      throw new Error("Failed to create workout session");
    }

    await ctx.db.insert("activeSession", {
      userId: args.userId,
      activeWorkoutSession: workoutSessionId,
    });
    return workoutSessionId;
  },
});

//get all workout sessions by user id
export const getAllWorkouts = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("workoutSession")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(100);
    return tasks;
  },
});

//get workout by id
export const getWorkoutById = query({
  args: { workoutId: v.id("workoutSession") },
  handler: async (ctx, args) => {
    const workout = await ctx.db.get(args.workoutId);
    return workout;
  },
});

//create exercise set
export const createExerciseSet = mutation({
  args: {
    workoutId: v.id("workoutSession"),
    exerciseName: v.string(),
    reps: v.number(),
    sets: v.number(),
    weight: v.number(),
  },
  handler: async (ctx, args) => {
    const exerciseSetId = await ctx.db.patch(args.workoutId, {});

    return exerciseSetId;
  },
});

//get all workout sets by workout id
export const getWorkoutSets = query({
  args: { workoutId: v.string() },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("workoutSets")
      .filter((q) => q.eq(q.field("workoutId"), args.workoutId))
      .order("desc")
      .take(100);
    return tasks;
  },
});

//get all exercises
export const getAllExercises = query({
  handler: async (ctx) => {
    const tasks = await ctx.db.query("exercises").take(100);
    return tasks;
  },
});
