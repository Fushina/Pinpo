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
exports.sendLead = sendLead;
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs_1 = require("fs");
const config = "./config.json";
const configData = JSON.parse((0, fs_1.readFileSync)(config, 'utf8'));
const apiKey = configData.env.apiKey;
const scenario = configData.env.scenario;
const salesPersonn = configData.salesPersonn;
const body = {
    contact: {
        first_name: 'Arthur',
        last_name: 'AUGUSTO',
        phone: '0767518926',
        email: 'arthaugusto@gmail.com',
        externalId: "abcd1234"
    },
    scenarioSelection: 'nGcEq0bPJJ',
    providerName: 'Web',
    product: [{
            externalId: '298Y890',
            category: 'metropole'
        }],
    salesPerson: {
        firstname: 'Jean-Charles',
        lastname: 'DOE',
        phone: '33698765432',
        email: '',
        external_id: '',
        icalCard: '',
        region: 'metropole'
    },
    scriptData: [
        {
            name: "city",
            value: "Paris"
        }, {
            name: "PostalCode",
            value: "75013"
        },
        {
            name: "departement",
            value: "Paris"
        }
    ], statsData: {
        name: "generation.date",
        value: "2025-03-05T11:07:23Z"
    }
};
function sendLead(first_name, last_name, phone, email, region, provider, product, product_id, externalIDcontact, product_city, product_cp, prdoduct_dep) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.staging.pinpo.space/v1/lead`;
        const headers = {
            'Content-Type': 'application/json',
            'Api-key': `8kV3S3qe2FMl4HPo9tt7A4Psni9ZzkX948tKMh80`,
            'accept': `*/*`
        };
        const contact = { "first_name": first_name, "last_name": last_name, "phone": phone, "email": email, "externalID": externalIDcontact };
        const scriptData = [
            { "name": "location", "value": product_city },
            { "name": "PostalCode", "value": product_cp },
            { "name": "departement", "value": prdoduct_dep }
        ];
        const commercial = salesPersonn.find((commercial) => commercial.region === region);
        const bodya = { "contact": contact, "scenarioSelection": scenario, "providerName": provider, "product": [{ "name": product, "externalID": product_id, "category": region }], "salesPerson": commercial, "scriptData": scriptData /*, "statsData": { "name": "generation.date", "value": new Date().toISOString() }*/ };
        try {
            const response = yield (0, node_fetch_1.default)(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(bodya)
            });
            if (!response.ok) {
                console.error('Erreur lors de l\'envoi de la requête:', response.statusText);
            }
            const data = yield response.json();
            console.log('Réponse de l\'API:', data);
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi de la requête:', error);
        }
        console.log(bodya);
    });
}
