import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import bcrypt from "bcrypt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    try {
      try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const response = await axios({
          method: "POST",
          url: `${process.env.REQ_URL}/api/registeruser`,
          headers: {
            fullname: req.body.name,
            email: req.body.email,
            password: hash,
          },
        });
        // Success returned from Database successfully
        response.status === 253 && res.status(253);
        res.end();
      } catch (error) {
        console.log('err here');
        console.log(`${process.env.REQ_URL}/api/registeruser`);
      }
     
    } catch (err) {
      console.log(`${process.env.REQ_URL}/api/registeruser`);
      console.log({
        fullname: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      !err.response.status && res.end();
      err.response.status === 409 && res.status(409);
      res.end();
    }
  } catch (err) {
    // error
    console.log(err);
    console.log("Error in register API, bad request. Sending res.status(400)");
    res.status(400);
    res.end();
  }
}
