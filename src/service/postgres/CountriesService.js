const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
const { v4: uuidv4 } = require('uuid');

class CountriesService {
  constructor() {
    this.pool = new Pool();
  }

  async getAllCountries(name, capital, code, page, size) {
    const offset = (page - 1) * size;

    const filters = [];
    if (name) filters.push(`name ILIKE '%${name}%'`);
    if (capital) filters.push(`capital ILIKE '%${capital}%'`);
    if (code) filters.push(`code = '${code}'`);

    const filterQuery = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const query = `SELECT * FROM countries ${filterQuery} LIMIT $1 OFFSET $2`;

    const result = await this.pool.query(query, [size, offset]);
    return result.rows;
  }

  async getCountriesByCode(code) {
    const query = 'SELECT * FROM countries WHERE code = $1';
    const result = await this.pool.query(query, [code]);

    if (result.rows.length === 0) {
        throw new NotFoundError('Country not found');
    }

    return result.rows[0]
  }

  async getCountriesByNameAndLanguage(name, language) {
    const query = `SELECT * FROM countries WHERE name = $1 AND names::jsonb @> $2::jsonb`;
    const result = await this.pool.query(query, [name, JSON.stringify({ [language]: name })]);

    if (result.rows.length === 0) {
        throw new NotFoundError('Country not found');
    }

    return h.response(result.rows[0]);
  }

  async createCountry(name, names, capital, flag, code, altCode) {
    const uuid = uuidv4();
    const id = parseInt(uuid.replace(/-/g, '').slice(0, 6), 16);
    console.log(id);
    const existingCountry = await this.pool.query('SELECT * FROM countries WHERE code = $1', [code]);

    if (existingCountry.rows.length > 0) {
        throw new InvariantError('Country code already exists');
    }

    const query = `
        INSERT INTO countries (id, name, names, capital, flag, code, alt_code)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
    const result = await this.pool.query(query, [id, name, JSON.stringify(names), capital, flag, code, altCode]);

    return result.rows[0];
  }
}

module.exports = CountriesService;