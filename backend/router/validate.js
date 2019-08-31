
const { body, validationResult } = require('express-validator/check');
const _ = require('lodash');
const { fields, jobs} = require('../../roleplay.fields');

const jobsValidator = _.map(jobs, (job) => job.value);

const dynamicFieldsValidator = () => {
    return _.map(fields, (field) => {
         let defaultValidator = body(`${field.model}`).not().isEmpty().withMessage(`Field "${field.label}" is required.`);
         if (field.type === 'radios' || field.type === 'select') {
             defaultValidator.isIn(field.values).withMessage(`Selected value for "${field.label} is invalid.`)
         } else if(field.type === 'textArea') {
             defaultValidator.isLength({ max: 1024 }).withMessage(`Field "${field.label}" may not be greater than 1024 characters.`)
         }
         return defaultValidator;
     })
 };

exports.validate = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Field "Name" is required.')
        .isLength({ max: 32})
        .withMessage('The "Name" field may not be greater than 32 characters.'),

    body('age')
        .not()
        .isEmpty()
        .withMessage('Field "Age" is required.')
        .isInt()
        .withMessage('Field "Age" must be an integer.')
        .isLength({ max: 2 })
        .withMessage('The "Age" may not be greater than 2.'),

    body('queueId')
        .not()
        .isEmpty()
        .withMessage('Campo "ID da Fila" é obrigatório')
        .isInt()
        .withMessage('Campo "ID da Fila" precisa ser um inteiro.'),

    body('characterFirstName')
        .not()
        .isEmpty()
        .withMessage('Field "Character First Name" is required.')
        .isLength({ max: 32})
        .withMessage('The "Character First Name"" field may not be greater than 32 characters.'),

    body('characterLastName')
        .not()
        .isEmpty()
        .withMessage('Field "Character Last Name" is required.')
        .isLength({ max: 32})
        .withMessage('The "Character Last Name"" field may not be greater than 32 characters.'),

    body('characterAge')
        .not()
        .isEmpty()
        .withMessage('Field "Character Age" is required.')
        .isInt()
        .withMessage('Field "Character Age" must be an integer.')
        .isLength({ max: 2 })
        .withMessage('The "Character Age" may not be greater than 2.'),

    body('characterJob')
        .not()
        .isEmpty()
        .withMessage('Please select a job for your character.')
        .isIn(jobsValidator)
        .withMessage('Selected job is not valid.'),

    body('characterAbout')
        .not()
        .isEmpty()
        .withMessage('Field "About character" is required.')
        .isLength({ max: 1024})
        .withMessage('The "About character" field may not be greater than 1024 characters.'),

    dynamicFieldsValidator(),

    function (req, res, next) {
        const errors = validationResult(req);
        let errorsParsed = {}

        _.map(errors.array(), (error) => {
            Object.assign(errorsParsed, {
                [error.param]: [error.msg]
            })
        })

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errorsParsed
            });
        }

        next()
    },
];
