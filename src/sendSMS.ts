import twilio from 'twilio';
import { readFileSync } from 'fs';

const config = "./config.json";
const configData = JSON.parse(readFileSync(config, 'utf8'));

const accountSid = configData.env.twilioAccountSid;
const authToken = configData.env.twilioAuthToken;
const twilioPhoneNumber = configData.env.twilioPhoneNumber;

export async function sendSMS(to: string, message: string) {
    const client = twilio(accountSid, authToken);

    try {
        const messageResponse = await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: to
        });
        console.log('Message sent successfully:', messageResponse.sid);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}