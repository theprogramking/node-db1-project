const express = require("express");
const { update } = require("../data/dbConfig.js");
const router = express.Router();
const db = require("../data/dbConfig.js");

// READ
router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      if (accounts.length) {
        res.status(200).json(accounts);
      } else {
        res.status(500).json({
          message: "Could not get accounts.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error getting accounts.",
        error: err,
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.select("*")
    .from("accounts")
    .where({ id })
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error getting post by id ${id}`,
        error: err,
      });
    });
});

// CREATE
router.post("/", (req, res) => {
  const toPost = req.body;

  db("accounts")
    .insert(req.body)
    .then((accountInserted) => {
      if (accountInserted) {
        res.status(200).json(accountInserted);
      } else {
        res.status(500).json({
          message: "There was an error creating account.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error creating account",
        error: err,
      });
    });
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const newInfo = req.body;
  db("accounts")
    .where({ id })
    .update(req.body)
    .then((updatedAccount) => {
      if (updatedAccount) {
        res.status(200).json(updatedAccount);
      } else {
        res.status(500).json({
          message: `There was an error updating account with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error updating account with id: ${id}`,
        error: err,
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.select("*")
    .from("accounts")
    .where({ id })
    .del()
    .then((deletedPost) => {
      res.status(200).json(deletedPost);
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error deleting post with id ${id}`,
        error: err,
      });
    });
});

module.exports = router;
