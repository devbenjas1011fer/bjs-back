"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true }); 
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express")); 
const app = (0, express_1.default)(); 
app.use(express_1.default.json({ limit: "20mb" }));
app.use(express_1.default.urlencoded({ extended: false })); 
const allowedOrigins = (_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(","); 
app.use((_req, res, next) => {
    res.setHeader("Permissions-Policy", "self");
    next();
});
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
})); 
exports.default = app;
