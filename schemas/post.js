"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.postSchema = new mongoose_1.Schema({
    author: String,
    body: String,
    createdAt: { type: Date, default: Date.now },
    title: String,
});
// postSchema.pre("save", function(this: any, next: NextFunction): void {
//     if (!this.createdAt) {
//         this.createdAt = new Date();
//     }
//     next();
// }); 
