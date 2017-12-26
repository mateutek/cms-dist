"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var config_1 = require("../config/config");
var post_1 = require("../schemas/post");
//use q promises
global.Promise = require("q").Promise;
//import mongoose
var mongoose = require("mongoose");
//use q library for mongoose promise
mongoose.Promise = global.Promise;
//connect to mongoose and create model
var connection = mongoose.createConnection(config_1.Config.MONGODB_CONNECTION);
var POST = connection.model("Post", post_1.postSchema);
//require chai and use should() assertions
var chai = require("chai");
chai.should();
describe("Post", function () {
    describe("create()", function () {
        it("should create a new Post", function () {
            //user object
            var post = {
                author: "Mateusz Woźniak",
                body: "Lorem Ipsum sit dolor ames.Et unitas",
                title: "Test Post Sample",
            };
            //create user and return promise
            return new POST(post).save().then(function (result) {
                //verify _id property exists
                result._id.should.exist;
                result.createdAt.should.exist;
                result.author.should.equal(post.author);
                result.body.should.equal(post.body);
                result.title.should.equal(post.title);
            });
        });
    });
    describe("fetch()", function () {
        it("should fetch all Posts", function () {
            return POST.find().then(function (result) {
                result.length.should.gt(1);
            });
        });
    });
});
