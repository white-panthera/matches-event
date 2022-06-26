const express = require("express");

const game_response = require("./mock/game.data.json");

const router = express.Router();
const delay = 200;

router.get("/matches", (req, res) => {
  const ResponseType = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
  };

  let responseResult = ResponseType.SUCCESS;

  setTimeout(() => {
    switch (responseResult) {
      case ResponseType.SUCCESS: {
        res.send(game_response);
        break;
      }
      case ResponseType.ERROR: {
        const error = {
          sequenceId: 0,
          message: { key: "ERROR" },
          data: {}
        };

        res.status(400).send(error);
        break;
      }
    }
  }, delay);
});

module.exports = router;
