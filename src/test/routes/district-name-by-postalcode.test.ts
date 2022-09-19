import request from 'supertest';
import { test, describe, beforeAll, afterAll } from '@jest/globals';
import { strict as assert } from 'assert';

import app from '../../app';
import { PostalCode } from '../../models/postalcode';

describe('finding postal district names by giving a postal code', () => {

    beforeAll(async () => {
        await PostalCode.truncate();
        await PostalCode.bulkCreate([{ code: '00730', name: 'HELSINKI' }, { code: '00100', name: 'Helsinki' }, { code: '99999', name: 'Korvatunturi' }]);
    });

    afterAll(async () => {
        await PostalCode.truncate();
    });

    test('postal district for code 99999 is Korvatunturi', async () => {
        const response = await request(app).get('/postalcodes?number=99999');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.headers['content-type'].includes('json'), `Expected JSON, got "${response.headers['content-type']}"`);
        assert.ok(response.body.name, 'Response should have attribute `name`');
        assert.equal(response.body.name.toLowerCase(), 'korvatunturi');
    });

    test('postal district for code 00100 is Helsinki', async () => {
        const response = await request(app).get('/postalcodes?number=00100');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.headers['content-type'].includes('json'), `Expected JSON, got "${response.headers['content-type']}"`);
        assert.ok(response.body.name, 'Response should have attribute `name`');
        assert.equal(response.body.name?.toLowerCase(), 'helsinki');
    });

    test('unknown postal code returns 404', async () => {
        const response = await request(app).get('/postalcodes?number=-1');

        assert.equal(response.status, 404, `Server responded with HTTP status ${response.statusCode}, expected 404.`);
        assert.ok(response.headers['content-type'].includes('json'), `Expected JSON, got "${response.headers['content-type']}"`);
        assert.equal(response.body.name, null, 'Attribute `name` should be null');
    });
});