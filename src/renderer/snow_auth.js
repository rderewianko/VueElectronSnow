const Axios = require("axios");

config = {
  baseUrl: "https://dev81248.service-now.com/",
  redirect_url: window.location,
  client_id: "874ff1c140aa5010ff75c900db72823f",
};

Axios.get(
  `${config.baseUrl}/oauth_auth.do?response_type=code&redirect_uri=${config.redirect_url}&client_id=${config.client_id}`
);
