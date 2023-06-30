const axios = require("axios");

//TODAS LAS PERSONAS
axios
  .get(process.env.REACT_APP_API_URL + "/personal")
  .then((res) => {
    const personal = res.data;
    module.exports = personal;
  })
  .catch((err) => console.log(err));
