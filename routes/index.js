const express = require('express');
const Model = require('../models/index');
const router = express.Router();

router.get('/api/vendor/items', function (req, res){

  Model.Item.findAll({})
  .then(function(data){
    console.log(data);
    res.json({items: data})
  }).catch(function(err){
    console.log(err);
    res.status(500).json({ error: 'message' });

  })
});
router.post('/api/vendor/items', function(req, res){

Model.Item.create({
    name: req.body.name,
   price: req.body.price,
  quantity: req.body.quantity
}).then(function(data){
  res.send(data)
}).catch(function(err){
  res.status(400).send("item not made")
})
});
router.post('/api/vendor/items/:itemId/purchases', function(req, res){

let item;

  Model.Item.findById(req.params.itemId)
.then(function(data){
  item = data;
  if((req.body.payment >= data.price) && (data.quantity != 0) ){
    Model.Purchase.create({
      payment: req.body.payment,
      itemId: req.params.itemId

    }).then(function(data){
      item.update({
        quantity: item.quantity - 1,
      }).then(function(data){
        res.send("Puchase made")
      })
    }).catch(function(err){
      res.send("error", err)
    })
  } else if(req.body.payment < data.price){

    res.send("insufficient funds")
  } else {
    res.send("out of this item")
  }
}).catch(function(err){
   res.send("error", err)
})


});
router.get('/api/vendor/purchases', function(req, res){

  Model.Purchase.findAll({
    // include: [{model: Model.Item, as: 'Items'}]
  })
  .then(function(data){
    res.json({display: data})
  }).catch(function(err){
  	console.log("ERROR")
    console.log(err);
  })

});
router.get('/api/vendor/money', function(req, res){
  Model.Purchase.findAll({
  }).then(function(data){
    Model.Purchase.sum('payment')
    .then(function(data){
      res.json(data)
    })

  }).catch(function(err){
    res.status(500).send("error")
  })

});
router.put('/api/vendor/items/:itemId', function(req, res){

  Model.Item.update({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price
  },
  {where: {id: req.params.itemId}})
  .then(function(data){
    console.log(data);
    res.json({ item: data})
 
  }).catch(function(err){
    res.status(500).send("item not updated")
  })

});









module.exports = router;