import { PostalCode } from '../../models/postalcode';
import { test, describe, beforeEach, afterEach } from '@jest/globals';
import { strict as assert } from 'assert';

describe('PostalCode data model', () => {

    beforeEach(async () => {
        await PostalCode.truncate();
    });

    afterEach(async () => {
        await PostalCode.truncate();
    });

    test('is initially empty', async () => {
        const codes = await PostalCode.findAll();
        assert.equal(codes.length, 0);
    });

    test('can be added with create', async () => {
        let result = await PostalCode.create({ code: '90210', name: 'Beverly Hills' });

        assert.ok(result.id > 0);
        assert.equal(await PostalCode.count(), 1);
    });

    test('can be searched with name or number', async () => {
        let original = await PostalCode.create({ code: '90210', name: 'Beverly Hills' });

        let byName = await PostalCode.findOne({ where: { name: 'Beverly Hills' } });
        let byCode = await PostalCode.findOne({ where: { code: '90210' } });

        assert.equal(byName?.code, original.code);
        assert.equal(byCode?.name, original.name);
    });
});
