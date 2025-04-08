import express from "express";
import { Student}  from "../models/student.js";

const router = express.Router();

// Create a new student

router.post("/", async (req, res) => {
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all students
router.get("/", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Get a student by ID'
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update a student by ID


router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a student by ID

router.delete("/:id", async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) return res.status(404).json({ error: "Student not found" });
      res.status(200).json({ message: "Student deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  export default router;
  