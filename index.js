//?only imports for api rest
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

//?init for express app 
const app = express();
app.use(bodyParser.json());
app.use(cors());

//!ROUTES ALL HERE

import { checkoutSession } from './modules/stripe/checkout.js';  
app.use("/checkout", checkoutSession) 


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
