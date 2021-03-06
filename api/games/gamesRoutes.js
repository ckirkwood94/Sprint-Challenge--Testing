const express = require('express');

const router = express.Router();

let games = [
  {
    id: 1,
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980, // not required
  },
  {
    id: 2,
    title: 'Snake', // required
    genre: 'Arcade', // required
  },
];

router.get('', (req, res) => {
  res.status(200).json(games);
});

router.get('/:id', (req, res) => {
  games.forEach((game) => {
    if (game.id.toString() === req.params.id) {
      res.status(200).json(game);
    }
    res.status(404).json({ message: 'No game with id found' });
  });
});

let gameId = 3;

router.post('', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const game = { title, genre, releaseYear, id: gameId };
  if (!game.title || !game.genre) {
    res.status(422).json({ message: 'Title and genre are required fields' });
  }
  const findGameByTitle = (game) => {
    return game.title === title;
  };
  if (games.find(findGameByTitle)) {
    res.status(405).json({ message: 'Duplicate titles not allowed' });
  }
  games.push(game);
  res.status(201).json(games);
  gameId++;
});

module.exports = router;
