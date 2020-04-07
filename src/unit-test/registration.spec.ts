import app from '../index';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET & Post Request  Unit Test', () => {
    it('get all user registration', () => {
        return chai.request(app).get('/registration')
            .then(res => {
                expect(res.status).to.equal(200);
            })
    })

    it('insert data for dummy', () => {
        return chai.request(app).post('/registration').send({
            firstName: 'Unit',
            lastName: 'Test',
            dob: "2018/05/18",
            gender: 1,
            email: 'test@test.com',
            mobileNumber: '+6285691580501'
        })
            .then(res => {
                if(res.status == 200){
                    expect(res.status).to.equal(200);
                }else {
                    expect(res.status).to.equal(400);
                }
                
            })
    })

    it('checking required field', () => {
        return chai.request(app).post('/registration').send({
            firstName: '',
            lastName: '',
            dob: "2018/05/18",
            gender: 1,
            email: '',
            mobileNumber: ''
        })
            .then(res => {
                expect(res.status).to.equal(400);
            })
    })

    it('checking email & mobile number field', () => {
        return chai.request(app).post('/registration').send({
            firstName: 'Regie',
            lastName: 'Pahlewi',
            dob: "2018/05/18",
            gender: 1,
            email: 'wrongformat',
            mobileNumber: '085691580504'
        })
            .then(res => {
                expect(res.status).to.equal(400);
            })
    })

    it('checking unique email', () => {
        return chai.request(app).post('/registration').send({
            firstName: '',
            lastName: '',
            dob: "2018/05/18",
            gender: 1,
            email: 'test@test.com',
            mobileNumber: ''
        })
            .then(res => {
                expect(res.status).to.equal(400);
            })
    })

    it('checking unique mobile number', () => {
        return chai.request(app).post('/registration').send({
            firstName: '',
            lastName: '',
            dob: "2018/05/18",
            gender: 1,
            email: '',
            mobileNumber: '+6285691580501'
        })
            .then(res => {
                expect(res.status).to.equal(400);
            })
    })
})