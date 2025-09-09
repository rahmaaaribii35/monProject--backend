const express = require("express");
const router = express.Router();
const avisController = require("../controllers/avisController");

const auth = require("../middlewares/authMiddlewares");

router.post("/addAvis", auth, avisController.addAvis);

router.get("/getAllAvis", auth, avisController.getAllAvis);
router.get('/getAvisByUserId/:userId', auth, avisController.getAvisByUserId);
router.get('/getAvisByProductId/:productId', auth, avisController.getAvisByProductId);

router.put("/updateAvisById/:id", auth, avisController.updateAvisById);

router.delete("/deleteAvisById/:id", auth, avisController.deleteAvisById);

module.exports = router;