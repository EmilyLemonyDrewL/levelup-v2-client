import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteGame } from '../../utils/data/gameData';

const GameCard = ({
  id,
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) => {
  const router = useRouter();
  const deleteTheGame = () => {
    if (window.confirm('Are you sure that you want to delete this game?')) {
      deleteGame(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <Button onClick={() => router.push(`/games/update/${id}`)}>Edit</Button>
      <Button onClick={deleteTheGame}>Delete</Button>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
