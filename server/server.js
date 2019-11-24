const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');


//================================
//              USERS
//================================
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  })
});


app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if(err) return res.json({
      success: false,
      err
    });
    res.status(200).json({
      success: true
    });
  });
});

app.post('/api/users/login', (req, res) => {
  User.findOne({'email': req.body.email}, (err, user) => {
    if(!user) return res.json({
      loginSuccess: false,
      message: 'Auth failed, email not found'
    });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({
        loginSuccess: false,
        message: 'Wrong password'
      });

      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true
        });
      });
    });
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '' },
    (err, doc) => {
      if(err) return res.json({success: false, err});
      return res.status(200).json({
        success: true
      })
    }
  );
});


//================================
//              BRANDS
//================================
app.post('/api/products/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if(err) return res.json({success: false, err});
    res.status(200).json({
      success: true,
      brand: doc
    });
  })
});

app.get('/api/products/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if(err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});


//================================
//              WOODS
//================================
app.post('/api/products/wood', auth, admin, (req, res) => {
  const wood = new Wood(req.body);

  wood.save((err, doc) => {
    if(err) return res.json({success: false, err});
    res.status(200).json({
      success: true,
      wood: doc
    });
  });
});

app.get('/api/products/woods', (req, res) => {
  Wood.find({}, (err, woods) => {
    if(err) return res.status(400).send(err);
    res.status(200).send(woods);
  })
});


//================================
//              PRODUCTS
//================================
app.post('/api/products', auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if(err) return res.json({success: false, err});
    res.status(200).json({
      success: true,
      article: doc
    });
  });
});

// get products by id
app.get('/api/products', (req, res) => {
  let items = req.query.id;

  if(items.split(',').length > 1) {
    let ids = items.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product
    .find({'_id': {$in: items}})
    .populate('brand')
    .populate('wood')
    .exec((err, docs) => {
      if(err) return res.json({success: false, err});
      res.status(200).send(docs);
    });
});

// get products by limit & sort them
app.get('/api/products/article/', (req, res) => {
  let sort = req.query.sort ? req.query.sort : 'asc';
  let orderBy = req.query.orderBy ? req.query.orderBy : 'updatedAt';
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  Product
    .find()
    .populate('brand')
    .populate('wood')
    .sort([[orderBy, sort]])
    .limit(limit)
    .exec((err, docs) => {
      if(err) return res.json({success: false, err});
      res.status(200).send(docs)
    })
});

// get products by params to shop
app.post('/api/products/shop/', (req, res) => {
  let sort = req.body.sort ? req.body.sort : 'desc';
  let orderBy = req.body.orderBy ? req.body.orderBy : 'updatedAt';
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let findArgs = {};

  for(let key in req.body.filters) {
    if(req.body.filters[key].length > 0) {
      if(key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  findArgs['publish'] = true;

  Product
    .find(findArgs)
    .populate('brand')
    .populate('wood')
    .sort([[orderBy, sort]])
    .limit(limit)
    .skip(skip)
    .exec((err, docs) => {
      if(err) return res.status(400).json({success: false, err});
      res.status(200).send({
        size: docs.length,
        articles: docs
      })
    })

});


const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
})