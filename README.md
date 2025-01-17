Api Country 

require:
Node.js
PostgreSQL

dependencies:
Joi
hapi js
pg
uuid
dotenv

Step to run:
1. clone repo
2. npm install
3. create .env
  PGUSER=
  PGHOST=
  PGPASSWORD=
  PGDATABASE=
  PGPORT=

  HOST=localhost
  PORT=5000
4. npm start

Routes:

1. Endpoint: GET /api/countries
   Query parameter: name, capital, code, page, size

2. GET /api/countries/{code}

3. Endpoint: GET /api/countries/search
   Query parameter: name, language

4. Endpoint: POST /api/countries
   Example body json:
   {
    "name": "Indonesia",
    "names": "{\"id\": \"Indonesia\", \"en\": \"Indonesia\"}",
    "capital": "Jakarta",
    "flag": "indonesia_flag_url",
    "code": "ID",
    "altCode": "INA"
  }
