import express, { response } from 'express';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';

const config = "./config.json";
const configData = JSON.parse(readFileSync(config, 'utf8'));

const apiKey = configData.env.apiKey;
const scenario = configData.env.scenario;
const salesPersonn = configData.salesPersonn;

const body = {
    contact: {
        first_name: 'Arthur',
        last_name: 'AUGUSTO',
        phone: '0767518926',
        email: 'arthaugusto@gmail.com',
        externalId :"abcd1234"
    },
    scenarioSelection: 'nGcEq0bPJJ',
    providerName : 'Web',
    product : [{
        externalId: '298Y890',
        category : 'metropole'
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
        },{
            name: "PostalCode",
            value: "75013"
        },
        {
            name: "departement",
            value: "Paris"
        }
    ],statsData: {
        name: "generation.date",
        value: "2025-03-05T11:07:23Z"
    }
};

interface SalesPerson {
    firstname: string,
    lastname: string,
      phone: string,
      email: string,
      external_id: string,
      icalCard: string,
      region: string
    // add other properties if needed
}

export async function sendLead(first_name: string, last_name: string, phone: string, email: string, region: string, provider: string,product: string, product_id: string, externalIDcontact: string, product_city: string, product_cp: number, prdoduct_dep : string) {
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
    const commercial: SalesPerson | undefined = salesPersonn.find((commercial: SalesPerson) => commercial.region === region);
    const bodya = { "contact": contact , "scenarioSelection": scenario, "providerName": provider, "product" : [{"name": product, "externalID" : product_id, "category": region}], "salesPerson": commercial, "scriptData": scriptData/*, "statsData": { "name": "generation.date", "value": new Date().toISOString() }*/ };
    
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bodya)})

        if(!response.ok) {
            console.error('Erreur lors de l\'envoi de la requête:', response.statusText);
        }
        const data = await response.json();
        console.log('Réponse de l\'API:', data);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la requête:', error);
    }
    
    console.log(bodya);
        }