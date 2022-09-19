import request from 'supertest';
import { test, describe, beforeAll, afterAll } from '@jest/globals';
import { strict as assert } from 'assert';

import app from '../../app';
import { PostalCode } from '../../models/postalcode';

describe('finding postal codes by giving a postal district name', () => {

    beforeAll(async () => {
        await PostalCode.truncate();
        await PostalCode.bulkCreate([{ code: '00730', name: 'HELSINKI' }, { code: '00100', name: 'Helsinki' }, { code: '99999', name: 'Korvatunturi' }]);
    });

    afterAll(async () => {
        await PostalCode.truncate();
    });

    test('only postal code for Korvatunturi is 99999', async () => {
        const response = await request(app).get('/postalcodes/korvatunturi');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.body.numbers, 'Response JSON should have attribute `numbers`');

        assert.strictEqual(response.body.numbers[0], '99999');
    });

    test('Helsinki has multiple postal codes with different casing', async () => {
        const response = await request(app).get('/postalcodes/helsinki');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.body.name, 'Response JSON should have attribute `numbers`');

        assert.ok(response.body.numbers.includes('00730'), `Helsinki should have postal code 00730.`);
        assert.ok(response.body.numbers.includes('00100'), `Helsinki should have postal code 00100.`);

        assert.ok(response.body.numbers.includes('99999') === false, `Helsinki should not have postal code 99999.`);
    });

    test('Tylypahka has no postal codes and returns 404', async () => {
        const response = await request(app).get('/postalcodes/tylypahka');

        assert.equal(response.status, 404, `Server responded with HTTP status ${response.statusCode}, expected 404.`);
        assert.deepEqual(response.body.numbers, [], `Tylypahka has no postal codes.`);

    });
});