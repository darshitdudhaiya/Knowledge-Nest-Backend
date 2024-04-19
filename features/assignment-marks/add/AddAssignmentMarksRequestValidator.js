import Joi from "joi";

const AddAssignmentMarksRequestSchema = Joi.object({
  Marks: Joi.number().required(),
  AssignmentSubmissionId: Joi.number().required(),
});

export default AddAssignmentMarksRequestSchema;
