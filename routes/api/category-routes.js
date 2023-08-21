const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    //grabs all the data with the associated product included
    const myCategory = await Category.findAll ({include: [Product], });
// categoryData
    res.status(200).json(myCategory);
    // (categoryData);
  } catch (err) 
  {res.status(500).json(err)}
 
});

router.get('/:id', async (req, res) => {
  try {
    //Get a category by it's id value along with the associated products 
    const myCategory = await Category.findOne( { 
      where: {
        id: req.params.id
      },
       include: [Product],
    });
   
    if (!myCategory){
      res.status(404).json({message: "No category found"}); return;}
    
    res.status(200).json(myCategory); 
  } catch (err) {
    res.status(500).json(err);}

});

router.post('/', async (req, res) => {
  try {

    //create new cateogry 
    const myCategory = await Category.create(req.body);
    res.status(200).json(myCategory);

  } catch (err) {res.status(400).json(err);}
 
});

router.put('/:id', async (req, res) => {
  try {
    const myCategory = await Category.update(req.body, {
      where: { id: req.params.id}

    } )
    if (!myCategory)
     {res.status(404).json({message: 'No category found'}); 
     return; 

    }

  res.status(200).json(myCategory);

  } catch (err) {
    res.status(500).json(err);
  }

});


router.delete('/:id', async (req, res) => {
  try {
    //delete a category at the 'id' value 
    const myCategory = await Category.destroy ({
      where: { id: req.params.id}
    })

    if (!myCategory) {
      res.status(404).json({ message: 'No category found'});
      return;
    }
    res.status(200).json({message: `Category, ID ${req.params.id} deleted` })

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
