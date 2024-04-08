const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

const app = require("../index.js");
const Question = require("../models/Question");
const Assessment = require("../models/Assessment");


const expect = chai.expect;
chai.use(chaiHttp);

describe("CreateQuestion", () => {
    it("should create a new question", async () => {
        const requestBody = {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            difficulty: "Easy",
            category: "Geography",
            userId: "user123",
        };
        const createStub = sinon.stub(Question, "create").resolves(requestBody);

        const response = await chai
            .request(app)
            .post("/createquestion")
            .send(requestBody);

        expect(response).to.have.status(201);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("question");
        expect(response.body.question).to.equal(requestBody.question);

        createStub.restore();
    });

    it("should return an error if there is an internal server error", async () => {

        const createStub = sinon.stub(Question, "create").throws(new Error("Internal server error"));

        const requestBody = {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            difficulty: "Easy",
            category: "Geography",
            userId: "user123",
        };

        const response = await chai
            .request(app)
            .post("/createquestion")
            .send(requestBody);

        expect(response).to.have.status(500);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.equal("Internal server error");

        createStub.restore();
    });
});


describe("GetQuestions", () => {
    it("should return all questions if no filter is provided", async () => {
        const questions = [
            { question: "Question 1", category: "Category 1" },
            { question: "Question 2", category: "Category 2" },
            { question: "Question 3", category: "Category 1" },
        ];

       
        const findStub = sinon.stub(Question, "find").resolves(questions);

        const response = await chai
            .request(app)
            .get("/questions");

        expect(response).to.have.status(200);
        expect(response.body).to.be.an("array");
        expect(response.body).to.deep.equal(questions);

        findStub.restore();
    });

    it("should return questions filtered by category", async () => {
        const filter = "Category 1";
        const filteredQuestions = [
            { question: "Question 1", category: "Category 1" },
            { question: "Question 3", category: "Category 1" },
        ];

        const findStub = sinon.stub(Question, "find").resolves(filteredQuestions);

        const response = await chai
            .request(app)
            .get("/questions")
            .send({ filter });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an("array");
        expect(response.body).to.deep.equal(filteredQuestions);

        findStub.restore();
    });

    it("should return an error if there is an internal server error", async () => {
        
        const findStub = sinon.stub(Question, "find").throws(new Error("Internal server error"));

        const response = await chai
            .request(app)
            .get("/questions");

        expect(response).to.have.status(500);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.equal("Internal server error");

        findStub.restore();
    });
});


describe("GetQuestionCategories", () => {
    it("should return an array of categories", async () => {
     
        const mockCategories = ["Category 1", "Category 2", "Category 3"];
        sinon.stub(Question, "find").returns({
            distinct: sinon.stub().withArgs("category").resolves(mockCategories),
        });

        const res = await chai.request(app).get("/getcategories");

        
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array").that.deep.equals(mockCategories);

        
        Question.find.restore();
    });

    it("should return an error message on server error", async () => {
        
        sinon.stub(Question, "find").returns({
            distinct: sinon.stub().withArgs("category").throws(new Error("Internal server error")),
        });

        
        const res = await chai.request(app).get("/getcategories");

        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Internal server error" });

        
        Question.find.restore();
    });
});


describe('GET /getquestions', () => {
    it('should return questions for a given assessment ID', async () => {
        const mockAssessmentId = 'mockedAssessmentId';
        const mockQuestionsIds = {
            questions: ['questionId1', 'questionId2']
        };
        const mockQuestions = [
            { _id: 'questionId1', question: 'Question 1', difficulty: 'Easy', category: 'Category A' },
            { _id: 'questionId2', question: 'Question 2', difficulty: 'Medium', category: 'Category B' }
        ];

        const assessmentStub = sinon.stub(Assessment, 'findOne');
        assessmentStub.withArgs({ _id: mockAssessmentId }).resolves(mockQuestionsIds);

        const questionStub = sinon.stub(Question, 'find');
        questionStub.withArgs({ _id: { $in: mockQuestionsIds.questions } }).returns({
            select: sinon.stub().withArgs({ "question": 1, "difficulty": 1, "category": 1 }).returns({
                limit: sinon.stub().withArgs(0).resolves(mockQuestions)
            })
        });

        const res = await chai.request(app).post('/getquestions').send({ assessmentid: mockAssessmentId });

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.deep.equal(mockQuestions);

        assessmentStub.restore();
        questionStub.restore();
    });

    it('should handle internal server errors', async () => {
        const assessmentStub = sinon.stub(Assessment, 'findOne');
        assessmentStub.rejects(new Error('Database error'));

        const res = await chai.request(app).post('/getquestions').send({ assessmentid: 'invalidId' });

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error', 'Internal server error');

        assessmentStub.restore();
    });
});



describe('POST /removequestion', () => {
    afterEach(() => {
        sinon.restore();
    });
    it('should handle assessment not found', async () => {
        const assessmentStub = sinon.stub(Assessment, 'findOne');
        assessmentStub.withArgs({ _id: 'invalidId' }).resolves(null);

        const res = await chai.request(app).post('/removequestion').send({
            assessmentid: 'invalidId',
            questionId: 'mockedQuestionId'
        });

        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error', 'Assessment not found');

        assessmentStub.restore();
    });

    it('should handle question not found in assessment', async () => {
        const assessmentStub = sinon.stub(Assessment, 'findOne');
        assessmentStub.withArgs({ _id: 'mockedAssessmentId' }).resolves({
            _id: 'mockedAssessmentId',
            questions: ['questionId1', 'questionId2']
        });

        const res = await chai.request(app).post('/removequestion').send({
            assessmentid: 'mockedAssessmentId',
            questionId: 'nonExistingQuestionId'
        });

        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error', 'Question not found in assessment');

        assessmentStub.restore();
    });

    it('should handle internal server errors', async () => {
        const assessmentStub = sinon.stub(Assessment, 'findOne');
        assessmentStub.rejects(new Error('Database error'));

        const res = await chai.request(app).post('/removequestion').send({
            assessmentid: 'mockedAssessmentId',
            questionId: 'mockedQuestionId'
        });

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error', 'Internal server error');

        assessmentStub.restore();
    });
});
