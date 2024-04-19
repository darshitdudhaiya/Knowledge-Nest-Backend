import Joi from "joi";

const AssignedSubjectsSchema = Joi.object({
  FacultyId: Joi.number().required(),
  SubjectId: Joi.number().required(),
});

export default AssignedSubjectsSchema;