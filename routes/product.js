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
var product_1 = require("../schemas/product");
var route_1 = require("./route");
var ProductRoute = /** @class */ (function (_super) {
    __extends(ProductRoute, _super);
    function ProductRoute() {
        var _this = _super.call(this) || this;
        _this.PRODUCT = _this.connection.model("Product", product_1.productSchema);
        return _this;
    }
    ProductRoute.create = function (router, baseRoute) {
        //log
        _super.doLog.call(this, baseRoute);
        router.get("/" + baseRoute, (function (req, res, next) {
            new ProductRoute().index(req, res, next);
        }));
        router.get("/" + baseRoute + "/:productId", (function (req, res, next) {
            new ProductRoute().productView(req, res, next);
        }));
    };
    ProductRoute.prototype.index = function (req, res, next) {
        //set custom title
        var _this = this;
        var name = "Products List!";
        this.PRODUCT.find().then(function (products) {
            console.log(name);
            //set options
            var options = {
                name: name,
                products: products,
            };
            //render template
            _this.render(req, res, "productsList", options);
        });
    };
    ProductRoute.prototype.productView = function (req, res, next) {
        //set custom title
        var name = "" + (req.params.productId ? "" + req.params.productId : "Base Product");
        //set options
        var options = {
            name: name,
        };
        //render template
        this.render(req, res, "productDetails", options);
    };
    return ProductRoute;
}(route_1.BaseRoute));
exports.ProductRoute = ProductRoute;
