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
      workoutDate: args.workoutDate,
      workoutName: args.workoutName,
    });

    if (!workoutSessionId) {
      throw new Error("Failed to create workout session");
    }

    const activeSession = await ctx.db.insert("activeSession", {
      userId: args.userId,
      activeWorkoutSession: workoutSessionId,
    });
    return activeSession;
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
