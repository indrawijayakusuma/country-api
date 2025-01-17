const routes = require('./routes');
const CountriesHandler = require('./handler');

module.exports = {
  name: 'countries',
  version: '1.0.0',
  register: async (server, {service}) => {
    const countriesHandler = new CountriesHandler(
        service,
        // validator
    );
    server.route(routes(countriesHandler));
  },
};
