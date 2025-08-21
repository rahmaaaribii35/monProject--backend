const express = require('express');
const router = express.Router(); 

const panierController = require('../controllers/panierController');

router.post('/addProductToPanier', panierController.addProductToPanier);

router.get('/getPanierById/:id', panierController.getPanierById);
router.get('/getPanierByUserId/:userId', panierController.getPanierByUserId);
router.get('/getAllPaniers', panierController.getAllPaniers);


router.delete('/removeProductFromPanier', panierController.removeProductFromPanierById);
router.delete('/clearPanier', panierController.clearPanier);


router.put('/updatePanier', panierController.updatePanier);

module.exports = router;