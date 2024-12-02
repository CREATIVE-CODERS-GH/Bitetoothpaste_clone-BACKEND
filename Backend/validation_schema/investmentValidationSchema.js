import Joi from "joi";

const investmentValidationSchema = Joi.object({
    userId: Joi.string(),
    productQuantity: Joi.number()
        .integer()
        .positive()
        .required(),

    sellingDuration: Joi.string()
        .required()
        .valid("1 week", "2 weeks", "1 month",),// Define valid durations if possible

    startDate: Joi.date()
        .required(),

    endDate: Joi.date()
        .greater(Joi.ref("startDate")),
        //.required(),

    isRolledOver: Joi.boolean()
        .default(false),

    profit: Joi.number()
        .positive()
        .precision(2),// Ensures at most 2 decimal places
       // .required(),

    status: Joi.string()
        .valid("active", "completed")
        .default("active")
});

export default investmentValidationSchema;


