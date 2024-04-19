import Joi from "joi";

const studentDataValidator = Joi.object({
  Name: Joi.string().max(100),
  Email: Joi.string(),
  Gender: Joi.string().max(10),
  Contact: Joi.string().min(10).max(10),
  Address: Joi.string().max(200),
  Password: Joi.string(),
  IsActivate: Joi.boolean(),
  EnrollmentNumber: Joi.string().min(12).max(12),
  SemesterId: Joi.number().required(),
  ClassId: Joi.number().required(),
});

const facultyDataValidator = Joi.object({
  Email: Joi.string(),
  Name: Joi.string().max(100),
  Gender: Joi.string().max(10),
  Contact: Joi.string().min(10).max(10),
  Address: Joi.string().max(200),
  Password: Joi.string(),
  IsActivate: Joi.boolean(),
  AssignedSubjects: Joi.array().items(Joi.string().required()),
});

const adminDataValidator = Joi.object({
  Email: Joi.string(),
  Name: Joi.string().max(100),
  Gender: Joi.string().max(10),
  Contact: Joi.string().min(10).max(10),
  Address: Joi.string().max(200),
  Password: Joi.string(),
  IsActivate: Joi.boolean(),
});

export { studentDataValidator, facultyDataValidator, adminDataValidator };
