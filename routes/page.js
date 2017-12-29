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
var post_1 = require("../schemas/post");
var route_1 = require("./route");
var PageRoute = /** @class */ (function (_super) {
    __extends(PageRoute, _super);
    function PageRoute() {
        var _this = _super.call(this) || this;
        _this.POST = _this.connection.model("Post", post_1.postSchema);
        return _this;
    }
    PageRoute.create = function (router, baseRoute) {
        //log
        _super.doLog.call(this, baseRoute);
        router.get("/", (function (req, res, next) {
            new PageRoute().index(req, res, next);
        }));
        router.get("/:pageId", (function (req, res, next) {
            new PageRoute().page(req, res, next);
        }));
    };
    PageRoute.prototype.index = function (req, res, next) {
        //set custom title
        this.title = "Index";
        this.render(req, res, "index");
    };
    PageRoute.prototype.page = function (req, res, next) {
        var _this = this;
        //set custom title
        this.title = "" + (req.params.pageId ? "" + req.params.pageId : "Index");
        this.POST.find().then(function (result) {
            var options = { posts: result };
            //render template
            _this.render(req, res, "pageView", options);
        }, function (err) {
            console.log(err);
            next(err);
        });
    };
    return PageRoute;
}(route_1.BaseRoute));
exports.PageRoute = PageRoute;
