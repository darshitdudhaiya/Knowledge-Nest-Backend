import Joi from "joi";

const studentDataValidator = Joi.object({
  Email: Joi.string().required(),
  Name: Joi.string().required().max(100),
  Gender: Joi.string().required().max(10),
  Contact: Joi.string().min(10).max(10),
  Address: Joi.string().max(200),
  EnrollmentNumber: Joi.string().min(12).max(12),
  SemesterId: Joi.number().required(),
  ClassId: Joi.number().required(),
});

const facultyDataValidator = Joi.object({
  Email: Joi.string().required(),
  Name: Joi.string().required().max(100),
  Gender: Joi.string().required().max(10),
  Contact: Joi.string().min(10).max(10),
  Address: Joi.string().max(200),
  AssignedSubjects: Joi.array().items(Joi.string().required()),
});

const adminDataValidator = Joi.object({
  Email: Joi.string().required(),
  Name: Joi.string().required().max(100),
  Gender: Joi.string().required().max(10),
  Contact: Joi.string().min(10).max(10),
  Address: Joi.string().max(200),
});

export { studentDataValidator, facultyDataValidator, adminDataValidator };
