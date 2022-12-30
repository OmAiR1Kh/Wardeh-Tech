const {
  register,
  login,
  deleteUser,
  resetPassword,
  logout,
} = require("../Controllers/User");

const { Router } = require("express");

const router = Router();

router.post("/create", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/reset/:id", resetPassword);
router.delete("/delete/:id", deleteUser);

module.exports = router;
