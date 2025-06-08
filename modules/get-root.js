import express from "express";

const getRoot = express.Router();

getRoot.get("/", async (req, res) => {
  try {
    
    res.status(200).json({
      message: "Hello from Fancy Backend Root",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error from /GET Fancy Backend Root",
    });
  }
});

export { getRoot };
