const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

const app = require("../index.js");
const Assessment = require("../models/Assessment");

const expect = chai.expect;
chai.use(chaiHttp);

describe("POST /createassessment", () => {
    it("should create a new assessment", async () => {
        const assessmentData = {
            assessmentName: "Test Assessment",
            assessmentDescription: "This is a test assessment",
            questions: ["Question 1", "Question 2"],
            assessmentDuration: 60,
            assessmentType: "Multiple Choice",
            assessmentTimeSlotStart: "2022-01-01T09:00:00Z",
            assessmentTimeSlotEnd: "2022-01-01T10:00:00Z",
            createdBy: "John Doe",
        };

        const createStub = sinon.stub(Assessment, "create").resolves(assessmentData);

        const res = await chai.request(app)
            .post("/createassessment")
            .send(assessmentData);

        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(assessmentData);

        createStub.restore();
    });

    it("should return an error if there is an internal server error", async () => {
        const assessmentData = {
            assessmentName: "Test Assessment",
            assessmentDescription: "This is a test assessment",
            questions: ["Question 1", "Question 2"],
            assessmentDuration: 60,
            assessmentType: "Multiple Choice",
            assessmentTimeSlotStart: "2022-01-01T09:00:00Z",
            assessmentTimeSlotEnd: "2022-01-01T10:00:00Z",
            createdBy: "John Doe",
        };

        const createStub = sinon.stub(Assessment, "create").throws(new Error("Internal Server Error"));

        const res = await chai.request(app)
            .post("/createassessment")
            .send(assessmentData);

        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Internal Server Error" });

        createStub.restore();
    });
});

describe("POST /addquestiontoasssessment", () => {
    it("should add a question to an assessment", async () => {
        const assessmentId = "assessmentId123";
        const questionId = "questionId456";
        const expectedResponse = {
            _id: assessmentId,
            questions: [questionId],
        };

        const findOneAndUpdateStub = sinon.stub(Assessment, "findOneAndUpdate").resolves(expectedResponse);

        const res = await chai.request(app)
            .post("/addquestiontoassessment")
            .send({ assessmentid: assessmentId, questionid: questionId });

        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(expectedResponse);

        findOneAndUpdateStub.restore();
    });

    it("should return an error if there is an internal server error", async () => {
        const assessmentId = "assessmentId123";
        const questionId = "questionId456";

        const findOneAndUpdateStub = sinon.stub(Assessment, "findOneAndUpdate").throws(new Error("Internal Server Error"));

        const res = await chai.request(app)
            .post("/addquestiontoassessment")
            .send({ assessmentid: assessmentId, questionid: questionId });

        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Internal Server Error" });

        findOneAndUpdateStub.restore();
    });
});


describe("GET /editassessment/:id", () => {
    it("should return the assessment if it exists", async () => {
        const assessmentId = "assessmentId123";
        const expectedResponse = {
            _id: assessmentId,
            // Add other properties of the assessment here
        };

        const findOneStub = sinon.stub(Assessment, "findOne").resolves(expectedResponse);

        const res = await chai.request(app).get(`/editassessment/${assessmentId}`);

        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(expectedResponse);

        findOneStub.restore();
    });

    it("should return an error if the assessment does not exist", async () => {
        const assessmentId = "nonExistentId";

        const findOneStub = sinon.stub(Assessment, "findOne").resolves(null);

        const res = await chai.request(app).get(`/editassessment/${assessmentId}`);

        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({ error: "Assessment not found" });

        findOneStub.restore();
    });

    it("should return an error if there is an internal server error", async () => {
        const assessmentId = "assessmentId123";

        const findOneStub = sinon.stub(Assessment, "findOne").throws(new Error("Internal Server Error"));

        const res = await chai.request(app).get(`/editassessment/${assessmentId}`);

        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Internal Server Error" });

        findOneStub.restore();
    });
});

describe("POST /liveassessments", () => {
    it("should activate the assessment and return it if it exists", async () => {
        const assessmentId = "assessmentId123";
        const expectedResponse = {
            _id: assessmentId,
            assessmentstatus: "live",
        };

        const findOneAndUpdateStub = sinon.stub(Assessment, "findOneAndUpdate").resolves(expectedResponse);

        const res = await chai.request(app).post("/liveassessment").send({ assessmentId });

        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(expectedResponse);

        findOneAndUpdateStub.restore();
    });

    it("should return an error if the assessment does not exist", async () => {
        const assessmentId = "nonExistentId";

        const findOneAndUpdateStub = sinon.stub(Assessment, "findOneAndUpdate").resolves(null);

        const res = await chai.request(app).post("/liveassessment").send({ assessmentId });

        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({ error: "Assessment not found" });

        findOneAndUpdateStub.restore();
    });

    it("should return an error if there is an internal server error", async () => {
        const assessmentId = "assessmentId123";

        const findOneAndUpdateStub = sinon.stub(Assessment, "findOneAndUpdate").throws(new Error("Internal Server Error"));

        const res = await chai.request(app).post("/liveassessment").send({ assessmentId });

        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Internal Server Error" });

        findOneAndUpdateStub.restore();
    });
});

describe("POST /draftassessment", () => {
    it("should update the assessment status to 'draft' and return it if it exists", async () => {
        const assessmentId = "assessmentId123";
        const expectedResponse = {
            _id: assessmentId,
            assessmentstatus: "draft",
            // Add other properties of the assessment here
        };

        const findOneAndUpdateStub = sinon
            .stub(Assessment, "findOneAndUpdate")
            .resolves(expectedResponse);

        const res = await chai
            .request(app)
            .post("/draftassessment")
            .send({ assessmentId });

        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(expectedResponse);

        findOneAndUpdateStub.restore();
    });

    it("should return an error if the assessment does not exist", async () => {
        const assessmentId = "nonExistentId";

        const findOneAndUpdateStub = sinon
            .stub(Assessment, "findOneAndUpdate")
            .resolves(null);

        const res = await chai
            .request(app)
            .post("/draftassessment")
            .send({ assessmentId });

        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({ error: "Assessment not found" });

        findOneAndUpdateStub.restore();
    });

    it("should return an error if there is an internal server error", async () => {
        const assessmentId = "assessmentId123";

        const findOneAndUpdateStub = sinon
            .stub(Assessment, "findOneAndUpdate")
            .throws(new Error("Internal Server Error"));

        const res = await chai
            .request(app)
            .post("/draftassessment")
            .send({ assessmentId });

        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Internal Server Error" });

        findOneAndUpdateStub.restore();
    });
});

//generate unit test cases for /draftassessment route using chai-http



describe("POST /getassessmentsdata", () => {
    it("should return assessments with the specified status", async () => {
        const assessmentStatus = "draft";
        const expectedResponse = [
            {
                _id: "assessmentId1",
                assessmentName: "Test Assessment 1",
                assessmentDescription: "This is a test assessment 1",
            },
            {
                _id: "assessmentId2",
                assessmentName: "Test Assessment 2",
                assessmentDescription: "This is a test assessment 2",
            },
        ];
        const findStub = sinon.stub(Assessment, "find")
        findStub.withArgs({ assessmentstatus: assessmentStatus }).returns({
            select: sinon.stub().withArgs({ assessmentName: 1, assessmentDescription: 1 }).returns({
              sort: sinon.stub().withArgs({ createdAt: -1 }).resolves(expectedResponse)
            })
          });
       // console.log(findStub)
        const res = await chai.request(app)
            .post("/getassessmentsdata")
            .send({ assessmentStatus });
            //console.log("vanshso------------",res)
        expect(res).to.have.status(200);
       
        expect(res.body).to.deep.equal(expectedResponse);
        findStub.restore();
    });
    it("should return an error if there is an internal server error", async () => {
        const assessmentStatus = "draft";

        const findStub = sinon.stub(Assessment, "find").throws(new Error("Internal Server Error"));
        const res = await chai.request(app).post("/getassessmentsdata").send({ assessmentStatus });
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Internal Server Error" });
        findStub.restore();
    }
    );
});

describe("GET /getassessment/:id", () => {
    it("should return the assessment with the specified id", async () => {
        const assessmentId = "assessmentId1";
        const expectedResponse = {
            _id: assessmentId,
            assessmentName: "Test Assessment",
            assessmentDescription: "This is a test assessment",
        };
        const findOneStub = sinon.stub(Assessment, "findOne").resolves(expectedResponse);

        const res = await chai.request(app).get(`/getassessment/${assessmentId}`);

        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(expectedResponse);

        findOneStub.restore();
    });

    it("should return an error if there is an internal server error", async () => {
        const assessmentId = "assessmentId1";

        const findOneStub = sinon.stub(Assessment, "findOne").throws(new Error("Internal Server Error"));

        const res = await chai.request(app).get(`/getassessment/${assessmentId}`);

        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Internal Server Error" });

        findOneStub.restore();
    });
});
