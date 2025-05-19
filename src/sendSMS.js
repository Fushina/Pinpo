"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = sendSMS;
const twilio_1 = __importDefault(require("twilio"));
const fs_1 = require("fs");
const config = "./config.json";
const configData = JSON.parse((0, fs_1.readFileSync)(config, 'utf8'));
const accountSid = configData.env.twilioAccountSid;
const authToken = configData.env.twilioAuthToken;
const twilioPhoneNumber = configData.env.twilioPhoneNumber;
function sendSMS(to, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, twilio_1.default)(accountSid, authToken);
        try {
            const messageResponse = yield client.messages.create({
                body: message,
                from: twilioPhoneNumber,
                to: to
            });
            console.log('Message sent successfully:', messageResponse.sid);
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    });
}
