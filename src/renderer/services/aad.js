import { UserAgentApplication } from "msal";

var msalConfig = {
  auth: {
    clientId: "4b20b21c-de80-4dc0-ac83-e1e895041f04",
    authority: "https://login.microsoftonline.com/common",
    redirectURI: "http://localhost:9080/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

var requestObj = {
  scopes: ["user.read", "profile", "openid"],
};

var myMSALObj = new UserAgentApplication(msalConfig);

var login = async () => {
  var authResult = await myMSALObj
    .loginPopup(requestObj)
    .then((res) => {
      console.log(res);
      return res.account;
    })
    .catch((err) => {
      console.log(err);
    });
};

var getAccount = async () => {
  var account = await myMSALObj.getAccount();
  return account;
};

var logoff = () => {
  myMSALObj.logout();
};

export default {
  login,
  getAccount,
  logoff,
};
