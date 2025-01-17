class CountriesHandler {
    constructor(service) {
        this.service = service;
    }
    
    async getAllCountriesHandler(request, h) {
      const { name, capital, code, page, size } = request.query;
      const countries = await this.service.getAllCountries(name, capital, code, page, size);
      const response = h.response({
          status: 'success',
          data: {
              countries
          },
        });
        return response;
    }

    async getCountriesByCodeHandler(request, h) {
        const { code } = request.params;
        const country = await this.service.getCountriesByCode(code);
        return {
            status: 'success',
            data: {
                country,
            },
        };
    }

    async getCountriesByNameAndLanguageHandler(request, h) {
        const { name, language } = request.query;
        const country = await this.service.getCountriesByNameAndLanguage(name, language);
        return {
            status: 'success',
            data: {
                country,
            },
        };
    }

    async createCountryHandler(request, h) {
        const { name, names, capital, flag, code, altCode } = request.payload;
        const country = await this.service.createCountry(name, names, capital, flag, code, altCode);
        return h.response({
            status: 'success',
            data: {
                country,
            },
        }).code(201);
    }
}

module.exports = CountriesHandler;