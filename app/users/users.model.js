import joi from 'joi';
import emailValidator from 'email-validator';

const userSchema = joi.object({
  firstName: joi.string().min(3).trim().required(),
  lastName: joi.string().min(3).trim().required(),
  phoneNumber: joi.string().min(11).trim().required(),
  email:joi.string().email(),
});

export const validate = (userBody) => {
  return userSchema.validate(userBody);

};


