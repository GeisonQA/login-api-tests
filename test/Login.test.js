const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')


describe('Login', () => {
    describe('Post/login', () => {

        it('Validar que, para credenciais válidas, a API retorne status 200 e a mensagem Login realizado com sucesso', async () => {

            const bodyLogin = { ...postLogin }

            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-type', 'Application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Login realizado com sucesso!")
        });

        it("Validar que, ao realizar login com credenciais inválidas, a API retorne status 401 Unauthorized e a mensagem 'Credenciais inválidas'.", async () => {

            const bodyLogin = { ...postLogin }
            bodyLogin.password = '1234'

            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-type', 'Application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(401)
            expect(response.body.error).to.equal("Credenciais inválidas.")


        });

        it("Validar que, após 3 tentativas consecutivas de login com credenciais inválidas, a conta seja bloqueada por 1 minuto.", async () => {


            for (let i = 0; i < 2; i++) {

                const bodyLogin = { ...postLogin }
                bodyLogin.password = "123"

                const response = await request(process.env.BASE_URL)
                    .post('/login')
                    .set('Content-type', 'Application/json')
                    .send(bodyLogin)

                expect(response.body.error).to.equal("Credenciais inválidas.")
                expect(response.status).to.equal(401)


            }

            const bodyLogin = { ...postLogin }
            bodyLogin.password = "123"

            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-type', 'Application/json')
                .send(bodyLogin)


            expect(response.status).to.equal(423)
            expect(response.body.error).to.equal("Usuário bloqueado por 1 minuto após 3 tentativas inválidas.")


            const responseQuartaTentativa = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-type', 'Application/json')
                .send(bodyLogin)

            expect(responseQuartaTentativa.body.error).to.equal("Usuário bloqueado. Tente novamente em 1 minuto.")
            expect(responseQuartaTentativa.status).to.equal(423)


        });


    });
});    
