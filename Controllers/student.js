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
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const students = await Student.find();
    const results = {};
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    if (endIndex < students.length()) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    results.result = students.slice(startIndex, endIndex);
    res.status(200).json(results);
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
