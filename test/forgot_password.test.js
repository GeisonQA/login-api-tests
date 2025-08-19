const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const posForgot_password = require('../fixtures/postForgot_password.json')


describe('Post', () => {
    describe('Post/forgot-password', () => {
        it('Validar o recebimento do token com email valido e status 200', async () => {

            const emailValido = { ...posForgot_password }
            const response = await request(process.env.BASE_URL)
                .post('/forgot-password')
                .set('Content-type', 'Application/json')
                .send(emailValido)

            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Token gerado. Expira em 15 minutos.")

        });

        it('Validar que ao informar email invalido retorna 404', async () => {

            const emailValido = { ...posForgot_password }
            emailValido.email = "juliolima@test.com"

            const response = await request(process.env.BASE_URL)
                .post('/forgot-password')
                .set('Content-type', 'Application/json')
                .send(emailValido)

            expect(response.status).to.equal(404)
            expect(response.body.error).to.equal("Usuário inválido.")

        });

    });

});
