"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var config_1 = require("../config/config");
var product_1 = require("../schemas/product");
//use q promises
global.Promise = require("q").Promise;
//import mongoose
var mongoose = require("mongoose");
//use q library for mongoose promise
mongoose.Promise = global.Promise;
//connect to mongoose and create model
var connection = mongoose.createConnection(config_1.Config.MONGODB_CONNECTION);
var productModel = connection.model("Product", product_1.productSchema);
//require chai and use should() assertions
var chai = require("chai");
chai.should();
describe("Product", function () {
    describe("create()", function () {
        it("should create a new Post", function () {
            //user object
            var product = {
                discounted: true,
                name: "Generic Product Name",
                newPrice: 150.00,
                price: 220.99,
            };
            //create user and return promise
            return new productModel(product).save().then(function (result) {
                //verify _id property exists
                result._id.should.exist;
                result.createdAt.should.exist;
                result.discounted.should.equal(product.discounted);
                result.name.should.equal(product.name);
                result.newPrice.should.equal(product.newPrice);
                result.price.should.equal(product.price);
            });
        });
    });
    describe("fetch()", function () {
        it("should fetch all Products", function () {
            return productModel.find().exec().then(function (result) {
                result.length.should.gt(1);
            });
        });
        it("should fetch single Product", function () {
            return productModel.findOne({}).exec().then(function (result) {
                result.should.be.an("object");
            });
        });
    });
});
