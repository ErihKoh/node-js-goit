const express = require("express");
const router = express.Router();
const validate = require("./validation");
const catsController = require("../../controllers/cats");

router
  .get("/", catsController.getAll)
  .post("/", validate.createCat, catsController.create);

router
  .get("/:id", catsController.getById)
  .delete("/:id", catsController.remove)
  .put("/:id", validate.updateCat, catsController.update);

router.patch(
  "/:id/vaccinated",
  validate.updateStatusCat,
  catsController.updateStatus
);

module.exports = router;
