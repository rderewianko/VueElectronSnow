var axios = require("axios");
// var qs = require("qs");

// var data = qs.stringify({
//   grant_type: "password",
//   client_id: "874ff1c140aa5010ff75c900db72823f",
//   client_secret: "7M?<a@ki4&",
//   username: "stevec",
//   password: "Console.L0g",
// });
// var config = {
//   method: "post",
//   url: "https://dev81248.service-now.com/oauth_token.do",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     Cookie:
//       "glide_user_route=glide.150b64dea8a0060edf0691706b019621; glide_sso_id=b4eee9b42fae10102e4c136a2799b611; JSESSIONID=CEEF4FA7D9EC50D562512E72021073F0; BIGipServerpool_dev81248=2357417738.53310.0000",
//   },
//   data: data,
// };

// axios(config)
//   .then(function(response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
