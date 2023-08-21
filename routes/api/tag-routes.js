const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({include: 
      [{ model: Product}] 
    });

    res.status(200).json(tagData);
  } catch (err) {res.status(500).json(err)
  }
});


router.get('/:id', async (req, res) => {

  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await  Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with the id provided'});
      return;
    }

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);

  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
     const newTag = await Tag.create(req.body); 
    res.status(200).json(newtag);

  } catch (err) {res.status(500).json(err);}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
try {
  const updatedTag = await Tag.update(req.body, {
    where: { id: req.params.id}
  })


  if(!updatedtTag){res.status(404).json({message: 'No tag at the id you have sent'}); return;}

  res.status(200).json(updatedTag);
} catch (err) {res.status(500).json (err)}
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id}
    })
    
  
    if(!deletedTag){res.status(404).json({
      message: 'There is no tag at the id you sent'
    }); return; 
  }
  res.statusu(200).json({ message: `Tag, ID ${req.params.id}deleted`})

  } catch (err) {res.status(500).json(err)}
});

module.exports = router;
