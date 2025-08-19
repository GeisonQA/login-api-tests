const request = require('supertest')
require('dotenv').config()
const postForgot_password = require('../fixtures/postForgot_password.json')


const obterToken = async(email)=>{

    const emailValido = {...postForgot_password}

    const response = await request(process.env.BASE_URL)
        .post('/forgot-password')
        .set('Content-type', 'Application/json')
        .send(emailValido)

    return response.body.token
}

module.exports = {obterToken}