const express = require("express");
const router = express.Router();
const avisController = require("../controllers/avisController");

router.post("/addAvis", avisController.addAvis);

router.get("/getAllAvis", avisController.getAllAvis);
router.get('/getAvisByUserId/:userId', avisController.getAvisByUserId);
router.get('/getAvisByProductId/:productId', avisController.getAvisByProductId);

router.put("/updateAvisById/:id", avisController.updateAvisById);

router.delete("/deleteAvisById/:id", avisController.deleteAvisById);

module.exports = router;