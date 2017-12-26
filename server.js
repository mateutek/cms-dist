/// <reference path="_all.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var errorHandler = require("errorhandler");
var express = require("express");
var hbs = require("express-handlebars");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var logger = require("morgan");
var path = require("path");
//Routes
var category_1 = require("./routes/category");
var page_1 = require("./routes/page");
var product_1 = require("./routes/product");
//schemas
var post_1 = require("./schemas/post");
var user_1 = require("./schemas/user");
/**
 * The server.
 *
 * @class Server
 */
var Server = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //instance defaults
        this.model = Object(); //initialize this to an empty object
        // create expressjs application
        this.app = express();
        // configure application
        this.config();
        // add routes
        this.routes();
        // add api
        this.api();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    Server.prototype.api = function () {
        // empty for now
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    Server.prototype.config = function () {
        var MONGODB_CONNECTION = "mongodb://localhost:27017/cms";
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        //configure HBS
        this.app.engine("hbs", hbs({
            defaultLayout: "layout",
            extname: ".hbs",
            layoutsDir: "views/",
            partialsDir: "views/partials",
        }));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "hbs");
        //use logger middlware
        this.app.use(logger("dev"));
        //use json form parser middlware
        this.app.use(bodyParser.json());
        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
        //use cookie parser middleware
        this.app.use(cookieParser("mscSuperSecret"));
        //use override middlware
        this.app.use(methodOverride());
        //use q promises
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        //connect to mongoose
        var connection = mongoose.createConnection(MONGODB_CONNECTION);
        //create models
        this.model.user = connection.model("User", user_1.userSchema);
        this.model.post = connection.model("Post", post_1.postSchema);
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        category_1.CategoryRoute.create(router, "c");
        product_1.ProductRoute.create(router, "p");
        page_1.PageRoute.create(router, "");
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
