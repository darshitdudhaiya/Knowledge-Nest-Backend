import Joi from "joi";

const UpdateAssignmentMarksRequestSchema = Joi.object({
  Marks: Joi.number().required(),
  AssignmentSubmissionId: Joi.number().required(),
});

export default UpdateAssignmentMarksRequestSchema;