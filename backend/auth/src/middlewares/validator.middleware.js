const { body, validationResult } = require("express-validator");

const respondWithValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error: Required fields are missing or invalid",
      errors: errors.array(),
    });
  }
  next();
};

const registerUserValidations = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  body("fullName.firstName")
    .isString()
    .withMessage("First name must be a string")
    .notEmpty()
    .withMessage("First name is required")
    .bail()
    .customSanitizer((value) => {
      if (!value) return value;
      const trimmed = value.trim();
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    })
    .matches(/^[A-Z][a-zA-Z]*$/)
    .withMessage(
      "First name must start with a capital letter and contain only letters"
    ),
  body("fullName.lastName")
    .isString()
    .withMessage("Last name must be a string")
    .notEmpty()
    .withMessage("Last name is required")
    .bail()
    .customSanitizer((value) => {
      if (!value) return value;
      const trimmed = value.trim();
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    })
    .matches(/^[A-Z][a-zA-Z]*$/)
    .withMessage(
      "Last name must start with a capital letter and contain only letters"
    ),
  body("role")
    .optional()
    .isIn(["user", "seller"])
    .withMessage("Role must be either 'user' or 'seller'"),
  respondWithValidationErrors,
];

const loginUserValidations = [
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    if (!req.body.email && !req.body.username) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Either email or username is required" }] });
    }
    respondWithValidationErrors(req, res, next);
  },
];

const addUserAddressValidations = [
  body("street")
    .isString()
    .withMessage("Street must be a string")
    .notEmpty()
    .withMessage("Street is required"),
  body("city")
    .isString()
    .withMessage("City must be a string")
    .notEmpty()
    .withMessage("City is required"),
  body("state")
    .isString()
    .withMessage("State must be a string")
    .notEmpty()
    .withMessage("State is required"),
  body("pincode")
    .isString()
    .withMessage("Pincode must be a string")
    .notEmpty()
    .withMessage("Pincode is required")
    .bail()
    .isNumeric()
    .withMessage("Pincode must be numeric")
    .isLength({ min: 4 })
    .withMessage("Pincode must be at least 4 digits long"),
  body("country")
    .isString()
    .withMessage("Country must be a string")
    .notEmpty()
    .withMessage("Country is required"),
  body("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be a boolean"),
  respondWithValidationErrors,
];

module.exports = {
  registerUserValidations,
  loginUserValidations,
  addUserAddressValidations,
};
