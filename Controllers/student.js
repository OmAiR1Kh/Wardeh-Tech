const Student = require("../Models/student");
const expressAsyncHandler = require("express-async-handler");
const Users = require("../Models/user");

const createStudent = expressAsyncHandler(async (req, res, next) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(200).json("Student Created Successfully");
  } catch (error) {
    next(error);
  }
});

const getAllStudents = expressAsyncHandler(async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

const getStudent = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json("Student Not Found");
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
});

const updateStudent = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ data: student, msg: "Student Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});

const deleteStudent = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    await Student.findByIdAndDelete(id);
    res.status(200).json("Student Deleted Successfully");
  } catch (error) {}
});

module.exports = {
  createStudent,
  deleteStudent,
  updateStudent,
  getAllStudents,
  getStudent,
};
