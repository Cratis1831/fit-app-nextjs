import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createWorkoutSession = mutation({
  args: { userId: v.string(), workoutDate: v.string() },
  handler: async (ctx, args) => {
    const workoutSessionId = await ctx.db.insert("workoutSession", {
      userId: args.userId,
      workoutDate: args.workoutDate,
    });
    return workoutSessionId;
  },
});

//get all workout sessions
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
