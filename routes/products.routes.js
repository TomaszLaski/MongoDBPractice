const express = require('express');
const router = express.Router();
const Product = require('../models/products.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json(err); 
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Product.findOne().skip(rand);
    if(!dep) res.status(404).json({message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.json(err);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const dep = await Product.findById(req.params.id);
    if(!dep) res.status(404).json({message: 'Not found'})
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/products', async (req, res) => {  
  try {
    const { name, client } = req.body;
    const newProduct = new Product({name: name, client: client});
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { name, client } = req.body;
    const dep = await(Product.findById(req.params.id));
    if (dep) {
      dep.name = name;
      dep.client = client;
      await (dep.save());
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found'});
  }
  catch(err) {
    res.status(500).json(err);
  };
});

router.delete('/products/:id', async (req, res) => {
  try {
    const dep = await(Product.findById(req.params.id));
    if(dep) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }

});

module.exports = router;