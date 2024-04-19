import Joi from "joi";

const QuizeSubmissionRecordsSchema = Joi.object({
  QuizeSubmissionId: Joi.number().required(),
  QuestionId: Joi.number().required(),
  OptionId: Joi.number().required()
});

export default QuizeSubmissionRecordsSchema;