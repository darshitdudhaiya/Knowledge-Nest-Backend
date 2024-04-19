import Joi from "joi";

const UserRolesSchema = Joi.object({
  Name: Joi.string().max(50).required(),
});

export default UserRolesSchema;
