"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warningMessage = exports.successMessage = exports.errorMessage = exports.yellow = exports.green = exports.red = exports.reset = void 0;
exports.reset = '\x1b[0m';
exports.red = '\x1b[31m';
exports.green = '\x1b[32m';
exports.yellow = '\x1b[33m';
const errorMessage = (msg) => {
    return `${exports.red}${msg}${exports.reset}`;
};
exports.errorMessage = errorMessage;
const successMessage = (msg) => {
    return `${exports.green}${msg}${exports.reset}`;
};
exports.successMessage = successMessage;
const warningMessage = (msg) => {
    return `${exports.yellow}${msg}${exports.reset}`;
};
exports.warningMessage = warningMessage;
