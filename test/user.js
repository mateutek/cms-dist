"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var config_1 = require("../config/config");
var user_1 = require("../schemas/user");
//use q promises
global.Promise = require("q").Promise;
//import mongoose
var mongoose = require("mongoose");
//use q library for mongoose promise
mongoose.Promise = global.Promise;
//connect to mongoose and create model
var connection = mongoose.createConnection(config_1.Config.MONGODB_CONNECTION);
var USER = connection.model("User", user_1.userSchema);
//require chai and use should() assertions
var chai = require("chai");
chai.should();
describe("User", function () {
    describe("create()", function () {
        it("should create a new User", function () {
            //user object
            var user = {
                email: "foo@bar.com",
                firstName: "Brian",
                lastName: "Love",
            };
            //create user and return promise
            return new USER(user).save().then(function (result) {
                //verify _id property exists
                result._id.should.exist;
                //verify email
                result.email.should.equal(user.email);
                //verify firstName
                result.firstName.should.equal(user.firstName);
                //verify lastName
                result.lastName.should.equal(user.lastName);
            });
        });
    });
});
