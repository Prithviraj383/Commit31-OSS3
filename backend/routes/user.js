const validateRequest = require("../middlewares/validateRequest");
const { query } = require("express-validator");
const express = require("express");
const router = express.Router();

const { getUserProfile } = require("../controllers/userController");

const userQueryValidator = [
  query("id").optional().isMongoId().withMessage("Invalid user id"),
];

router.get(
  "/me",
  userQueryValidator,
  validateRequest,
  getUserProfile
);

module.exports = router;