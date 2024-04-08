// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app'); // Assuming your Express app is exported from app.js
// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('GET /gettestquestions', () => {
//     it('should return questions for a test', (done) => {
//         chai
//             .request(app)
//             .get('/gettestquestions')
//             .send({ assessmentid: 'your-assessment-id', email: 'test@example.com' })
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.be.an('array');
//                 // Add more assertions as needed
//                 done();
//             });
//     });

//     it('should return error when retrieving questions for test', (done) => {
//         chai
//             .request(app)
//             .get('/gettestquestions')
//             .send({ assessmentid: 'invalid-assessment-id', email: 'test@example.com' })
//             .end((err, res) => {
//                 expect(res).to.have.status(500);
//                 expect(res.body).to.have.property('error');
//                 // Add more assertions as needed
//                 done();
//             });
//     });
// });

// describe('POST /submittest', () => {
//     it('should submit a test successfully', (done) => {
//         chai
//             .request(app)
//             .post('/submittest')
//             .send({
//                 assessmentId: 'your-assessment-id',
//                 email: 'test@example.com',
//                 selectedOptions: ['option1', 'option2'],
//             })
//             .end((err, res) => {
//                 expect(res).to.have.status(201);
//                 expect(res.body).to.have.property('email');
//                 expect(res.body).to.have.property('isAttempted').to.be.true;
//                 // Add more assertions as needed
//                 done();
//             });
//     });

//     it('should return error when test submission fails', (done) => {
//         chai
//             .request(app)
//             .post('/submittest')
//             .send({
//                 assessmentId: 'invalid-assessment-id',
//                 email: 'test@example.com',
//                 selectedOptions: ['option1', 'option2'],
//             })
//             .end((err, res) => {
//                 expect(res).to.have.status(500);
//                 expect(res.body).to.have.property('error');
//                 // Add more assertions as needed
//                 done();
//             });
//     });
// });
