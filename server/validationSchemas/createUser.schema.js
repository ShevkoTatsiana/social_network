import Joi from "joi";
export const createUser = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeat_password: Joi.ref('password'),

  profile_photo: Joi.any(),

  social: Joi.boolean(),

  birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(2013),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
  //.with('name', 'birth_year')
  //.with('password', 'repeat_password');
