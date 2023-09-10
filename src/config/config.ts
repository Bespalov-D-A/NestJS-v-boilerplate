import { daysToMilliseconds } from "src/helpers/minor-functions";

const {
  GOOGLE_SECRET,
  GOOGLE_CALLBACK,
  CLIENT_PORT,
  CLIENT_PROTOCOL,
  CLIENT_HOST
} = process.env;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

export const clientUrl  = `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`

//use nginx proxy to use http://client.com/api/callback --> but to show http://server.com/api/callback
//GOOGLE_CALLBACK should contain "/api" because need proxy
const callbackUrl = `${clientUrl}/${GOOGLE_CALLBACK}`;
export const config = {
  cookie: {
    lifeTime: daysToMilliseconds(30) //30 days
  },
  google: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: callbackUrl,
  },
};
