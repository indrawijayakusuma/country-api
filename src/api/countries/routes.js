const Joi = require('joi');
const routes = (handler) => [
    {
      method: 'GET',
      path: '/api/countries',
      options: {
        validate: {
            query: Joi.object({
                name: Joi.string().optional(),
                capital: Joi.string().optional(),
                code: Joi.string().optional(),
                page: Joi.number().integer().min(1).default(1),
                size: Joi.number().integer().min(1).default(10),
            }),
        },
      },
      handler: (request, h) => handler.getAllCountriesHandler(request, h),
    },
    {
      method: 'GET',
      path: '/api/countries/{code}',
      handler: (request, h) => handler.getCountriesByCodeHandler(request, h),
    },
    {
      method: 'GET',
      path: '/api/countries/search',
      options: {
        validate: {
            query: Joi.object({
                name: Joi.string().required(),
                language: Joi.string().required(),
            }),
        },
      },
      handler: (request, h) => handler.getCountriesByNameAndLanguageHandler(request, h),
    },
    {
      method: 'POST',
      path: '/api/countries',
      options: {
        validate: {
            payload: Joi.object({
                name: Joi.string().required(),
                names: Joi.string().required(),
                capital: Joi.string().required(),
                flag: Joi.string().required(),
                code: Joi.string().max(4).required(),
                altCode: Joi.string().max(4).optional(),
            }),
        },
      },
      handler: (request, h) => handler.createCountryHandler(request, h),
    },

    
  ];
  
  module.exports = routes;
  