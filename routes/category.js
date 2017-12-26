"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("./route");
var CategoryRoute = /** @class */ (function (_super) {
    __extends(CategoryRoute, _super);
    function CategoryRoute() {
        return _super.call(this) || this;
    }
    CategoryRoute.create = function (router, baseRoute) {
        //log
        _super.doLog.call(this, baseRoute);
        router.get("/" + baseRoute + "/:categoryId*?", (function (req, res, next) {
            new CategoryRoute().index(req, res, next);
        }));
    };
    CategoryRoute.prototype.index = function (req, res, next) {
        //set custom title
        this.title = "" + (req.params.categoryId ? "" + req.params.categoryId : "Main Category");
        //set options
        // const options: object = {
        //     message: "This is page view",
        // };
        //render template
        this.render(req, res, "category");
    };
    return CategoryRoute;
}(route_1.BaseRoute));
exports.CategoryRoute = CategoryRoute;
