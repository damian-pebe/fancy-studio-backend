import express from "express";
import supabase from "../../db.js";

const bookedTimes = express.Router();

bookedTimes.get("/", async (req, res) => {
  try {
    const result = await supabase`
      SELECT selected_day, selected_time FROM schedule_meetings`;

    let map = new Map();

    for (const item of result) {
      const { selected_day, selected_time } = item;
      const dayKey = new Date(selected_day).toISOString().split("T")[0];
      const existing = map.get(dayKey) || [];

      let [hourStr, minAndPeriod] = selected_time.split(":");
      let hour = parseInt(hourStr, 10);
      const period = minAndPeriod.split(" ")[1];
      if (period === "PM" && hour !== 12) hour += 12;

      existing.push(hour);
      map.set(dayKey, existing);
    }

    res.status(200).json({
      data: Object.fromEntries(map),
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching DATE TIMES",
    });
  }
});

export { bookedTimes };
