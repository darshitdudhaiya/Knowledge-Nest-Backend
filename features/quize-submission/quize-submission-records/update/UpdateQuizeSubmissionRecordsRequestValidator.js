import Joi from "joi";

const UpdateQuizeSubmissionRecordsSchema = Joi.object({
  QuizeSubmissionId: Joi.number().required(),
  QuestionId: Joi.number().required(),
  OptionId: Joi.number().required()
});

export default UpdateQuizeSubmissionRecordsSchema;