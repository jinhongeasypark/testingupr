var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/test', async (req, res, next) => {
  const pass = req.query.pass === 'true' ? true : false
  console.log('w', pass)
  const p = await promise(pass)
  res.send(p)
})

function promise(pass) {
  return new Promise((resolve, reject) => {
    if (pass) {
      resolve('passed')
    } else {
      reject('rejected')
    }
  })
}

module.exports = router;
