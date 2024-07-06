"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const http_1 = __importDefault(require("http"));
console.log("khaa?");
const port = normalizePort((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "3000");
app_1.default.set("port", port);
const server = http_1.default.createServer(app_1.default);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
function normalizePort(val) {
    const port = parseInt(val);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + (addr === null || addr === void 0 ? void 0 : addr.port);
    console.log("Listening on " + bind);
}
