const path = require("path");
const {token, CLOUDNAME, CLOUDAPIKEY, CLOUNDSECRET} = require('../config.js');
const axios = require('axios');
const cors = require('cors')
const cloudinary = require("cloudinary").v2
const fse = require("fs-extra")


const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

//Middleware:
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));



const cloudinaryConfig = cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUDAPIKEY,
  api_secret: CLOUNDSECRET,
  secure: true
})

//Overview routes:


app.get('/products', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products?page=${req.body.page}&count=${req.body.count}`,
  {
   headers: {
    'Authorization': `${token}`
  }
  })
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((error) => {
    res.status(501).send(error);
  });
});


app.get('/products/:product_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${req.params.product_id}`,
  {
   headers: {
    'Authorization': `${token}`
  }
  })
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((error) => {
    res.status(501).send(error.response.data);
  });
});


app.get('/products/:product_id/styles', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${req.params.product_id}/styles`,
  {
   headers: {
    'Authorization': `${token}`
  }
  })
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((error) => {
    res.status(501).send(error.response.data);
  });
});


app.get('/products/:product_id/related', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${req.params.product_id}/related`,
  {
   headers: {
    'Authorization': `${token}`
  }
  })
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((error) => {
    res.status(501).send(error.response.data);
  });
});

app.get('/cart', (req, res) => {

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart`,
  {
   headers: {
    'Authorization': `${token}`
  }
  })
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.status(501).send(error);
  });
});

app.post('/cart', (req, res) => {
  // console.log(req.body);
  let cartInfo = req.body;
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart`,cartInfo,
  {
   headers: {
    'Authorization': `${token}`
  }
  })
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.status(501).send(error);
  });
});



// Question and Answers routes
// ***************************************************************/
// handle the answer helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  // console.log("am i geting req?", req.params)

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/${req.params.answer_id}/helpful`, {},
  {
    headers: {
      'Authorization': `${token}`
    }
  })
  .then(response => {
    // console.log("any response?")
    res.status(204).end();
  })
  .catch(error => {
    res.status(501);
  })
});

// handle the answer report
app.put('/qa/answers/:answer_id/report', (req, res) => {
  // console.log("am i geting req?", req.params)

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/${req.params.answer_id}/report`, {},
  {
    headers: {
      'Authorization': `${token}`
    }
  })
  .then(response => {
    // console.log("any response?")
    res.status(204).end();
  })
  .catch(error => {
    res.status(501);
  })
});

// to handle add a question
app.post('/api/qa/questions', (req, res) => {
  // console.log('getting req for add question?', req);
  // console.log('show me the param body', req.body);
  const addQdata = req.body

  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions',addQdata,
  {
    headers: {
      'Authorization': `${token}`
    }
  })
  .then(response => {

    res.status(201).end()
  })
  .catch(error => {
    res.status(501);
  })
})

// handle voting question helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  // console.log("req for voting question ?", req.params)

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${req.params.question_id}/helpful`, {},
  {
    headers: {
      'Authorization': `${token}`
    }
  })
  .then (response => {
    res.status(204).end();
  })
  .catch(error => {
    res.status(501);
  })
})

// handle add answer to a question
app.post('/api/qa/questions/:question_id/answers', (req, res) => {
  // console.log("req for adding answer to this question", req.body)

  const addAdata = req.body
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${req.params.question_id}/answers`, addAdata,
  {
    headers: {
      'Authorization': `${token}`
    }
  })
  .then(response => {
    res.status(201).end();
  })
  .catch(error => {
    // console.log("i got an error when submit an answer", error)
    res.status(501).send(error);
  })
})

// handle the first render out currently, might not be used in the final version
app.get('/api/qa/questions', (req, res) => {
  // console.log("first render request check :", req)
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/?product_id=${req.query.product_id}`,
  {
    headers: {
      'Authorization': `${token}`
    }
  })
  .then(response => {
    // console.log(response.data)
    res.status(200).send(response.data);
  })
  .catch(error => {
    res.status(501);
  })
})

app.get("/get-signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp
    },
    cloudinaryConfig.api_secret
  )
  res.json({ timestamp, signature })
})


// ************************************************************** */
//Review routes:

app.get('/reviews', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews?count=${req.query.count}&product_id=${req.query.product_id}&sort=${req.query.sort}`,
  {
   headers: {
    'Authorization': `${token}`
  }
  })
  .then((response) => {
    return res.status(200).send(response.data);
  })
  .catch((error) => {
    res.status(501).send(error);
  });
});

app.get('/reviews/meta', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta?&product_id=${req.query.product_id}`,
  {
    headers: {
      'Authorization': `${token}`
    }
  })
  .then((response) => {
    res.status(200).send(response.data)
  })
  .catch((error) => {
    res.status(501)
  })
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${req.params.review_id}/helpful`, {},
  {
    headers: {
      'Authorization': `${token}`
    }
  })
  .then(response => {
    res.status(204).end();
  })
  .catch(error => {
    res.status(501);
  })
});

app.post('/api/reviews', (req, res) => {
  // console.log('REQUEST --->>>>', req)
  const newReviewBody = req.body;
  // console.log(newReviewBody)
  // res.send('RECEIVED')
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews`, newReviewBody,
  {
   headers: {
    'Authorization': `${token}`,
  }
  })
  .then((response) => {
    console.log(response.data)
    return res.status(201).send(response.data).end();
  })
  .catch((error) => {
    res.status(501).send(error);
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
