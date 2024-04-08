const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = require("../index.js");
const User = require("../models/User.js");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Register", () => {
    it("should register a user", async () => {
        const user = {
            email: "1234@gmail.com",
            password: "1234",
            firstname: "John",
            lastname: "Doe",
            Organization: "Test",
        };

        const hashedPassword = bcrypt.hashSync(user.password, 10);
        const createdUser = { _id: "1234" };

        const jwtSecret = "secret";
        const token = jwt.sign({ userId: createdUser._id, email: user.email }, jwtSecret, {});
        const createStub = sinon.stub(User, "create").returns(createdUser);
        const signStub = sinon.stub(jwt, "sign").returns(token);
        const hashSyncStub = sinon.stub(bcrypt, "hashSync").returns(hashedPassword);

        const response = await chai.request(app).post("/register").send(user).end(
            (err, res) => {
                expect(response).to.have.status(201);
        expect(response.body).to.have.property("id");
        expect(response.body.id).to.equal(createdUser._id);

        expect(createStub.calledOnceWithExactly({
            email: user.email,
            password: hashedPassword,
            firstname: user.firstname,
            lastname: user.lastname,
            Organization: user.Organization,
        })).to.be.true;

        expect(signStub.calledOnceWithExactly(
            { userId: createdUser._id, email: user.email },
            jwtSecret,
            {}
        )).to.be.true;

        expect(hashSyncStub.calledOnceWithExactly(user.password, 10)).to.be.true;

        expect(response.header["set-cookie"]).to.deep.equal([
            `token=${token}; Path=/; SameSite=None; Secure`,
        ]);

        createStub.restore();
        signStub.restore();
        hashSyncStub.restore();
            }
        );

                
    });
});

describe("Login", () => {
    it("should login a user", async () => {
        const user = {
            email: "1234@gmail.com",
            password: "1234",
        };

        const foundUser = { _id: "1234", password: "hashedPassword" };
        const jwtSecret = "secret";
        const token = "generatedToken";

        const findOneStub = sinon.stub(User, "findOne").returns(foundUser);
        const compareSyncStub = sinon.stub(bcrypt, "compareSync").returns(true);
        // const signStub = sinon.stub(jwt, "sign").yields(null, token);

        const response = await chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property("id");
                expect(response.body.id).to.equal(foundUser._id);

                expect(findOneStub.calledOnceWithExactly({ email: user.email })).to.be.true;
                expect(compareSyncStub.calledOnceWithExactly(user.password, foundUser.password)).to.be.true;
                expect(signStub.calledOnceWithExactly(
                    { userId: foundUser._id, email: user.email },
                    jwtSecret,
                    {}
                )).to.be.true;

                expect(response.header["set-cookie"]).to.deep.equal([
                    `token=${token}; Path=/; SameSite=None; Secure`,
                ]);

                findOneStub.restore();
                compareSyncStub.restore();
                signStub.restore();
            });
    });

    it("should return 401 for wrong password", async () => {
        const user = {
            email: "1234@gmail.com",
            password: "wrongPassword",
        };

        const foundUser = { _id: "1234", password: "hashedPassword" };

        //const findOneStub = sinon.stub(User, "findOne").returns(foundUser);
        //const compareSyncStub = sinon.stub(bcrypt, "compareSync").returns(false);

        const response = await chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
                expect(response).to.have.status(401);
                expect(response.body).to.equal("wrong password");

                expect(findOneStub.calledOnceWithExactly({ email: user.email })).to.be.true;
                expect(compareSyncStub.calledOnceWithExactly(user.password, foundUser.password)).to.be.true;

                findOneStub.restore();
                compareSyncStub.restore();
            });
    });

    it("should return 404 for user not found", async () => {
        const user = {
            email: "nonexistent@gmail.com",
            password: "1234",
        };

        //const findOneStub = sinon.stub(User, "findOne").returns(null);

        const response = await chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
                expect(response).to.have.status(404);
                expect(response.body).to.equal("user not found");

                expect(findOneStub.calledOnceWithExactly({ email: user.email })).to.be.true;

                findOneStub.restore();
            });
    });
});


describe("Logout", () => {
    it("should logout a user", async () => {
        const response = await chai.request(app).get("/logout");
        expect(response).to.have.status(200);
        expect(response.body).to.equal("logged out");
        expect(response.header["set-cookie"]).to.deep.equal([
            "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        ]);
    });
});
