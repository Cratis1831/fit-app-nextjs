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
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(100);
    return tasks;
  },
});

//get workout by id
export const getWorkoutById = query({
  args: { workoutId: v.id("workoutSession") },
  handler: async (ctx, args) => {
    const workoutSession = await ctx.db.get(args.workoutId);

    if (!workoutSession) {
      throw new Error("Workout not found");
    }

    const workoutSets = await ctx.db
      .query("workoutSets")
      .withIndex("by_workoutId", (q) => q.eq("workoutId", workoutSession._id))
      .order("desc")
      .take(100);

    return { workoutSession, workoutSets };
  },
});

//create exercise set
export const createExerciseSet = mutation({
  args: {
    workoutId: v.id("workoutSession"),
    exerciseId: v.id("exercises"),
    reps: v.number(),
    sets: v.number(),
    weight: v.number(),
  },
  handler: async (ctx, args) => {
    const workoutSession = await ctx.db.get(args.workoutId);

    if (!workoutSession) {
      throw new Error("Workout not found");
    }

    const workoutSet = await ctx.db.insert("workoutSets", {
      workoutId: args.workoutId,
      exerciseId: args.exerciseId,
      reps: args.reps,
      setNumber: args.sets,
      weight: args.weight,
    });

    return workoutSet;
  },
});

//get all workout sets by workout id
export const getWorkoutSets = query({
  args: { workoutId: v.id("workoutSession") },
  handler: async (ctx, args) => {
    const workoutSets = await ctx.db
      .query("workoutSets")
      .withIndex("by_workoutId", (q) => q.eq("workoutId", args.workoutId))
      .order("desc")
      .take(100);

    return workoutSets;
  },
});

//get all exercises
export const getAllExercises = query({
  handler: async (ctx) => {
    const exercises = await ctx.db.query("exercises").take(100);
    return exercises;
  },
});
