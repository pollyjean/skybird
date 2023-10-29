export interface FormValues {
  username: string;
  email: string;
  password: string;
}

export interface EnterForms {
  email?: string;
  phone?: string;
}

interface TwilioEnvProperties {
  sid: string;
  token: string;
  messagingSid: string;
  phone: string;
}

export const TWILIO_ENV: TwilioEnvProperties = {
  sid: process.env.TWILIO_SID || "",
  token: process.env.TWILIO_TOKEN || "",
  messagingSid: process.env.TWILIO_MESSAGING_SID || "",
  phone: process.env.PHONE_NUMBER || "",
};
