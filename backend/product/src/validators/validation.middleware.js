const { body, validationResult } = require("express-validator");

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: errors.array() });
  }
  next();
}

const createProductValidators = [
  body("title").isString().trim().notEmpty().withMessage("title is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .trim()
    .isLength({ max: 500 })
    .withMessage("description max length is 500 characters"),
  body("priceAmount")
    .notEmpty()
    .withMessage("priceAmount is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("priceAmount must be a number > 0"),
  body("priceCurrency")
    .optional()
    .isString()
    .withMessage("priceCurrency must be a string")
    .customSanitizer((value) => value.toUpperCase())
    .isIn(["USD", "INR"])
    .withMessage("priceCurrency must be USD or INR"),
  // Optional initial stock for product creation
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('stock must be an integer >= 0')
    .toInt(),
  body("images").custom((_, { req }) => {
    if (!req.files || req.files.length === 0) {
      throw new Error("At least one product image is required");
    }
    return true;
  }),
  handleValidationErrors,
];

// PATCH /api/products/:id validators
// All fields optional, but if provided must satisfy constraints.
// Accepts either flat priceAmount/priceCurrency (legacy style) OR nested price object.
const updateProductValidators = [
  body("title")
    .optional()
    .isString().withMessage("title must be a string")
    .trim()
    .notEmpty().withMessage("title cannot be empty"),
  body("description")
    .optional()
    .isString().withMessage("description must be a string")
    .trim()
    .isLength({ max: 500 }).withMessage("description max length is 500 characters"),
  // Support nested price object
  body("price.amount")
    .optional()
    .isFloat({ gt: 0 }).withMessage("price.amount must be a number > 0"),
  body("price.currency")
    .optional()
    .isString().withMessage("price.currency must be a string")
    .customSanitizer(v => v.toUpperCase())
    .isIn(["USD", "INR"]).withMessage("price.currency must be USD or INR"),
  // Also support flat style fields if controller later adds mapping
  // Allow updating stock manually (e.g. corrections). Must be int >= 0.
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('stock must be an integer >= 0')
    .toInt(),
  body("priceAmount")
    .optional()
    .isFloat({ gt: 0 }).withMessage("priceAmount must be a number > 0"),
  body("priceCurrency")
    .optional()
    .isString().withMessage("priceCurrency must be a string")
    .customSanitizer(v => v.toUpperCase())
    .isIn(["USD", "INR"]).withMessage("priceCurrency must be USD or INR"),
  // Images optional on update; if provided ensure array of files present
  body("images").custom((_, { req }) => {
    if (req.files && req.files.length === 0) {
      throw new Error("If images key is present it must include at least one file");
    }
    return true;
  }),
  handleValidationErrors,
];

module.exports = { createProductValidators, updateProductValidators };
