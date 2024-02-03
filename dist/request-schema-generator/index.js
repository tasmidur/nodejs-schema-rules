"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSchemaGenerator = void 0;
const constants_1 = require("../utils/constants");
class RequestSchemaGenerator {
    constructor(templateSettings) {
        this.requestSchemaType = templateSettings.templateType;
        this.templateSettings = templateSettings;
    }
    // Function to initialize a class based on the request validation type
    initializeRequestSchemaGenerator() {
        const RequestSchemaGeneratorClass = constants_1.requestSchemaClassMap[this.requestSchemaType];
        if (RequestSchemaGeneratorClass) {
            return new RequestSchemaGeneratorClass(this.templateSettings).buildAndStore();
        }
        else {
            throw new Error(`Unsupported request validation type: ${String(this.requestSchemaType)}`);
        }
    }
}
exports.RequestSchemaGenerator = RequestSchemaGenerator;
