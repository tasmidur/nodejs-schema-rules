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
exports.ValidatorJsRequestSchemaGenerator = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const utils_1 = require("../utils/utils");
const constants_1 = require("../utils/constants");
const templateSource = fs.readFileSync(path.resolve(__dirname, '../templates/validatorjs.template'), 'utf8');
class ValidatorJsRequestSchemaGenerator {
    constructor(templateSetting) {
        var _a;
        this.parse = (columnRules) => {
            return Object.entries(columnRules).reduce((result, [columnName, columnArray]) => {
                const updatedColumnArray = columnArray.reduce((acc, item) => {
                    if (["nullable", "required"].includes(item)) {
                        acc.unshift(item);
                    }
                    else {
                        acc.push(item);
                    }
                    return acc;
                }, []);
                result[columnName] = updatedColumnArray;
                return result;
            }, {});
        };
        this.templateSetting = templateSetting;
        this.storeDir = templateSetting === null || templateSetting === void 0 ? void 0 : templateSetting.stroreDir;
        if ((_a = this.templateSetting) === null || _a === void 0 ? void 0 : _a.fileName) {
            this.className = (0, utils_1.getClassName)({
                className: (0, utils_1.snakeToCamel)(this.templateSetting.fileName),
            }, constants_1.CLASS_NAME_SUFFIX);
        }
    }
    buildAndStore() {
        const pasedRules = JSON.stringify(this.parse(this.templateSetting.rules), null, 2);
        if (this.storeDir && this.className) {
            const content = (0, utils_1.buildTemplateContent)(templateSource, {
                CLASS_NAME: this.className,
                RULES: pasedRules,
            });
            (0, utils_1.storeFile)(content, this.className, this.storeDir);
        }
        return pasedRules;
    }
}
exports.ValidatorJsRequestSchemaGenerator = ValidatorJsRequestSchemaGenerator;
