"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    discounted: Boolean,
    name: String,
    newPrice: { type: Number, default: 0 },
    price: Number,
});
// userSchema.pre("save", function(this: any, next: NextFunction): void {
//     if (!this.createdAt) {
//         this.createdAt = new Date();
//     }
//     next();
// }); 
