const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const categories = await Tag.findAll({include: [{model: Product}]}).catch((err) => {
    res.json(err);
  });
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const categories = await Tag.findByPk(req.params.id, {include: [{model: Product}]}).catch((err) => {
    res.json(err);
  });
  res.json(categories);
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body).catch((err) => {
    res.status(400).json(err);
  });
  res.status(200).json(newTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag = await Tag.update(req.body, {
    where:{
      id: req.params.id
    }
  }).catch((err) =>{
    res.json(err);
  });

  if(!tag[0]){
    res.status(404).json({message: "Tag update failed"});
    return;
  }

  res.status(200).json({message: "Tag updated"});
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tag = await Tag.destroy({
    where:{
      id: req.params.id
    }
  }).catch((err) => {
    res.json(err);
  });

  if(!tag){
    res.status(404).json({message: "Tag deletion failed"});
    return;
  }

  res.status(200).json({message: "Tag deleted"});
});

module.exports = router;
