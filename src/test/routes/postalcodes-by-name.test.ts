import request from 'supertest';
import { test, describe } from '@jest/globals';
import { strict as assert } from 'assert';

import app from '../../app';

describe('finding postal codes by giving a postal district name', () => {

    test('only postal code for Korvatunturi is 99999', async () => {
        const response = await request(app).get('/postalcodes/korvatunturi');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.body.numbers, 'Response JSON should have attribute `numbers`');

        assert.strictEqual(response.body.numbers[0], '99999');
    });

    test('Helsinki has multiple postal codes', async () => {
        const response = await request(app).get('/postalcodes/helsinki');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.body.name, 'Response JSON should have attribute `numbers`');
        assert.strictEqual(response.body.numbers.includes('99999'), false, `Helsinki should not have postal code 99999.`);

        ['00100', '00730'].forEach(number => {
            assert.ok(response.body.numbers.includes(number), `Helsinki should have postal code ${number}.`);
        });
    });

    test('Tylypahka has no postal codes and returns 404', async () => {
        const response = await request(app).get('/postalcodes/tylypahka');

        assert.strictEqual(response.status, 404, `Server responded with HTTP status ${response.statusCode}, expected 404.`);
    });
});