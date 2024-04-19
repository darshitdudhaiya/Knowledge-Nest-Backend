import Joi from "joi";

const UpdateAssignedSubjectsSchema = Joi.object({
  FacultyId: Joi.number().required(),
  SubjectId: Joi.number().required(),
});

export default UpdateAssignedSubjectsSchema;