"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    email: String,
    firstName: String,
    lastName: String,
});
// userSchema.pre("save", function(this: any, next: NextFunction): void {
//     if (!this.createdAt) {
//         this.createdAt = new Date();
//     }
//     next();
// }); 
