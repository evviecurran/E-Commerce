const router = require('express').Router();
const squielize =require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    //grabs all the data with the associated product included
    const allCategories = await Category.findAll({include: Product});


//send all categories
    res.status(200).json(allCategories);
  } catch (error) {res.status(500).json(error)}
 
});

router.get('/:id', async (req, res) => {
  try {
    //Get a category by it's id value along with the associated products 
    const atId = await Catergory.findByPk(req.params.id, {include: Product});
    //IF there is nothing at requested id 
    if (!atId){res.status(404).json({message: "No category at this id!"}); return;}
    //will send the data 
    res.status(200).json(atId); 
  } catch (error) {res.status(500).json(error);}

});

router.post('/', async (req, res) => {
  try {
    //Request is empty, error will be sent and return 
    if (!req.body) {res.status(404).json({ message: 'The json you have sent is empty'}); return;}

    //create new cateogry 
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);

  } catch (error) {res.status(400).json(error);}
 
});

router.put('/:id', async (req, res) => {
  try {
  let findId = await Category.findByPk(req.params.id);
  if(!findId){res.status(400).json({message: 'There is no cateogry at the id you have sent'}); return;}


  Category.update(req.body, {where: {id:req.params.id}});
  res.status(200).json();

  } catch (error) {res.status(400).json(error);}

});


router.delete('/:id', async (req, res) => {
  try {
    //looks for the category at requested id- if non-exsitent it will throw and error + return
    let findId = await Category.findByPk(req.params.id);
    if(!findId){res.status(404).json({message: 'There is no category at the id you have sent'}); return;}

    //delete a category at the 'id' value 
    let categories = await Category.destroy({where : {id: req.params,ud}});

    res.status(200).json(categories);

  } catch (error) {res.status(400).json(error);}
});

module.exports = router;
