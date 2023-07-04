const { expect } = require('@jest/globals')
const app = require('../src/server/server')


describe('Testing express server', () => {


    it('should be defined', async() => {

        expect(app).toBeDefined

    })
})