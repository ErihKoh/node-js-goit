const Joi = require('joi')

const schemaCreateCat = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().min(1).max(45).required(),
  isVaccinated: Joi.boolean().optional(),
})

const schemaUpdateCat = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  age: Joi.number().integer().min(1).max(45).optional(),
  isVaccinated: Joi.boolean().optional(),
})

const schemaUpdateStatusCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
})

const validate = (shema, obj, next) => {
  const { error } = shema.validate(obj)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
    })
  }
  next()
}

module.exports.createCat = (req, _res, next) => {
  return validate(schemaCreateCat, req.body, next)
}

module.exports.updateCat = (req, _res, next) => {
  return validate(schemaUpdateCat, req.body, next)
}

module.exports.updateStatusCat = (req, res, next) => {
  return validate(schemaUpdateStatusCat, req.body, next)
}
