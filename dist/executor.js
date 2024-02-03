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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const config_1 = require("./config/config");
const constants_1 = require("./utils/constants");
const request_schema_generator_1 = require("./request-schema-generator");
const messages_1 = require("./utils/messages");
const path = __importStar(require("path"));
class Executor {
    constructor(table, databaseType, options) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.skipColumns = [];
        this.selectedColumns = [];
        this.table = table;
        this.databaseType = databaseType !== null && databaseType !== void 0 ? databaseType : config_1.config.defaultDatabase;
        this.databaseConfig = config_1.config.databases[this.databaseType];
        this.options = options;
        this.skipColumns = config_1.config.skipColumns;
        this.templateType = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.validationSchemaType) !== null && _b !== void 0 ? _b : config_1.config.validationSchemaType;
        this.requestFile = this.table;
        this.stroreDir = (_c = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.requestValidatorPath) !== null && _c !== void 0 ? _c : null;
        if ((_d = this.options) === null || _d === void 0 ? void 0 : _d.requestFile) {
            const filePath = (_e = this.options) === null || _e === void 0 ? void 0 : _e.requestFile;
            this.requestFile = path.basename(filePath);
            this.stroreDir = path.dirname(filePath);
        }
        if (this.options &&
            ((_f = this.options) === null || _f === void 0 ? void 0 : _f.columns) &&
            this.options.columns.length > 0) {
            this.selectedColumns = (_g = this.options) === null || _g === void 0 ? void 0 : _g.columns;
            this.skipColumns = this.skipColumns.filter((skipColumn) => { var _a; return !((_a = this.options) === null || _a === void 0 ? void 0 : _a.columns.includes(skipColumn)); });
        }
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const columnRules = yield this.initializeSchemaOperation().generateColumnRules();
                const templateSetting = {
                    fileName: this.requestFile,
                    rules: columnRules,
                    templateType: this.templateType,
                    stroreDir: null //this.stroreDir,
                };
                const rules = new request_schema_generator_1.RequestSchemaGenerator(templateSetting).initializeRequestSchemaGenerator();
                console.log('\n');
                console.log(`🚀 Schema Base Validation rules for "${this.templateType}" generated! 🚀`);
                console.log(`Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊`);
                console.log('______________________________________________________________________________________________________________________');
                console.log('\n');
                console.log((0, messages_1.successMessage)(rules));
                console.log('\n');
            }
            catch (error) {
                console.error(error.message);
            }
            finally {
            }
            return true;
        });
    }
    initializeSchemaOperation() {
        const SchemaOperationClass = constants_1.schemaOperationClass[this.databaseType];
        if (SchemaOperationClass) {
            return new SchemaOperationClass(this.table, this.databaseConfig, this.selectedColumns, this.skipColumns);
        }
        else {
            throw new Error(`Unsupported request validation type: ${this.databaseType}`);
        }
    }
}
exports.Executor = Executor;
