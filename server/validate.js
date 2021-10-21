const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("username", "Please enter a username").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6,
  }),
  handleValidation,
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  handleValidation,
];

exports.validateNewRequest = [
  check("sitterProfileId", "Include a valid sitter id").notEmpty(),
  check("ownerProfileId", "Include a valid sitter id").notEmpty(),
  check("dropInDate", "Please enter a valid start date and time").notEmpty(),
  check("pickUpDate", "Please enter a valid end date and time").notEmpty(),
  handleValidation,
];

exports.validateRequestUpdate = [
  check("accepted", "accepted must be a Boolean").optional().isBoolean(),
  check("declined", "Declined must be a Boolean").optional().isBoolean(),
  handleValidation,
];

exports.validateSearchParams = [
  check("address", "address must be a string").optional().trim().isString(),
  check("dropInDate", "dropInDate must be a string")
    .optional()
    .trim()
    .isString(),
  check("dropOffDate", "dropOffDate must be a string")
    .optional()
    .trim()
    .isString(),
  handleValidation,
];

exports.validateReviewBody = [
  check("reviewee", "reviewee must be a string").isString().notEmpty(),
  check("comment", "cpmment must be a string").isString().optional(),
  check(
    "starRating",
    "Star rating must be a number between 1 and 5, both inclusive"
  )
    .notEmpty()
    .isNumeric(),
  handleValidation,
];

function handleValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
}
