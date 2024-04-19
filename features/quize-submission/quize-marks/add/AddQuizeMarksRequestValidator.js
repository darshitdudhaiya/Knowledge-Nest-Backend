import Joi from "joi";

const QuizeMarksSchema = Joi.object({
  Marks: Joi.number().required().default(0),
  QuizeSubmissionId: Joi.number().required()
});

export default QuizeMarksSchema;