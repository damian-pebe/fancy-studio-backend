//?only imports for api rest
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

//?init for express app 
const app = express();

import { webhook } from "./modules/stripe/webhook.js";
app.use("/webhook", webhook);

app.use(bodyParser.json());
app.use(cors());

//!ROUTES ALL HERE

import { checkoutSession } from './modules/stripe/checkout.js';  
app.use("/checkout", checkoutSession) 

import { bookMeeting } from './modules/stripe/book-meeting.js';  
app.use("/book-meeting", bookMeeting) 

import { insertRegister } from './modules/stripe/register-meeting.js';  
app.use("/register-meeting", insertRegister) 

import { checkRegister } from './modules/stripe/check-register.js';  
app.use("/check-register", checkRegister) 

import { getRegister } from './modules/stripe/get-register.js';  
app.use("/get-register", getRegister) 

import { getRoot } from './modules/get-root.js';  
app.use("/", getRoot)  

import { formSubmit } from "./modules/mails/FormSubmit.js";
app.use("/formSubmit", formSubmit)

import { deleteRegister } from "./modules/stripe/delete-preregister.js";
app.use("/delete-register", deleteRegister)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
