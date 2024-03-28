const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categories = await Category.findAll({include: [{model: Product}]}).catch((err) => {
    res.json(err);
  });
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  }).catch((err) => { res.json(err)});
  res.json(category);
});

router.post('/', async (req, res) => {
  const newCategory = await Category.create(req.body).catch((err) => {
    res.status(400).json(err);
  });
  res.status(200).json(newCategory);
});

router.put('/:id', async (req, res) => {
  const category = await Category.update(req.body, {
    where:{
      id: req.params.id
    }
  }).catch((err) =>{
    res.json(err);
  });

  if(!category[0]){
    res.status(404).json({message: "Category update failed"});
    return;
  }

  res.status(200).json({message: "Category updated"});
});

router.delete('/:id', async (req, res) => {
  const category = await Category.destroy({
    where:{
      id: req.params.id
    }
  }).catch((err) => {
    res.json(err);
  });

  if(!category){
    res.status(404).json({message: "category deletion failed"});
    return;
  }

  res.status(200).json({message: "Category deleted"});
});

module.exports = router;
