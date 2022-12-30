const { Router } = require("express");
const {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  updateStudent,
} = require("../Controllers/student");
const verifyUser = require("../helpers/verifyToken");

const router = Router();

router.post("/new", verifyUser, createStudent);
router.get("/all", verifyUser, getAllStudents);
router.get("/one/:id", verifyUser, getStudent);
router.put("/update/:id", verifyUser, updateStudent);
router.delete("/delete/:id", verifyUser, deleteStudent);

module.exports = router;
