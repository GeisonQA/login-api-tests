const request = require('supertest')
const { expect } = require('chai');
const { obterToken } = require('../helpers/autenticador')
require('dotenv').config()
const postReset_password = require('../fixtures/postReset_password.json')
const postForgot_password = require('../fixtures/postForgot_password.json')


describe('Post reset-password', () => {

    beforeEach(async () => {
        const emailValido = { ...postForgot_password }
        token = await obterToken(emailValido)
    });

    let token

    describe('Post/reset-password', () => {
        it('Deve redefinir senha com token válido e retornar status 200', async () => {

            const bodyResponse = { ...postReset_password, token: token }

            const response = await request(process.env.BASE_URL)
                .post('/reset-password')
                .set('Content-type', 'Application/json')
                .send(bodyResponse)

            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Senha redefinida com sucesso.")

            
        });

        it('Deve restornar status 400 para token invalido', async () => {

            const bodyResponse = { ...postReset_password, token: token }
            bodyResponse.token = "agtvj"

            const response = await request(process.env.BASE_URL)
                .post('/reset-password')
                .set('Content-type', 'Application/json')
                .send(bodyResponse)

            expect(response.status).to.equal(400)
            expect(response.body.error).to.equal("Token inválido ou expirado.")


        });


    });

});
