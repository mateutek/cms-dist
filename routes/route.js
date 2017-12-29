"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var config_1 = require("../config/config");
/**
 * Constructor
 * @class Base Route
 */
var BaseRoute = /** @class */ (function () {
    function BaseRoute() {
        this.title = "CMS";
        this.scripts = [];
        this.connection = mongoose.createConnection(config_1.Config.MONGODB_CONNECTION);
        this.year = new Date().getFullYear();
    }
    BaseRoute.doLog = function (baseRoute) {
        if (baseRoute === void 0) { baseRoute = ""; }
        console.log("[" + this.toString().match(/\w+/g)[1] + "::create] Creating '/" + baseRoute + "' route.");
    };
    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    BaseRoute.prototype.addScript = function (src) {
        this.scripts.push(src);
        return this;
    };
    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {object} Additional options to append to the view"s local scope.
     * @return void
     */
    BaseRoute.prototype.render = function (req, res, view, options) {
        //add constants
        res.locals.BASE_URL = "/";
        //add scripts
        res.locals.scripts = this.scripts;
        //add title
        res.locals.title = this.title;
        //add year
        res.locals.year = this.year;
        //render view
        res.render(view, options);
    };
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;
