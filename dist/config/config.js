"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
const path = __importStar(require("path"));
const validation_1 = require("../utils/validation");
const fs = __importStar(require("fs"));
const messages_1 = require("../utils/messages");
const configFilePath = path.join(process.cwd(), '/schema.config.js');
let config = {};
exports.config = config;
(0, dotenv_1.config)();
if (fs.existsSync(configFilePath)) {
    const schemaConfig = require(configFilePath);
    exports.config = config = (0, validation_1.validateConfig)(schemaConfig);
}
else {
    if (process.argv.includes("init")) {
        console.error((0, messages_1.successMessage)(`\n"schema-config.js" is generated on working directory. You need to modify\n`));
    }
    else {
        console.error((0, messages_1.warningMessage)(`\n"schema-config.js" is missing. \n Please run command "ndVr init" for global installtion otherwise "npm run ndVr init" \n`));
    }
}
