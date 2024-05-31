import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const EventCard = ({
  id,
  game, //
  description,
  date,
  time,
}) => {
  const router = useRouter();

  return (
    <Card className="text-center">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Text>About: {description}</Card.Text>
        <Card.Text>When: {date}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Button onClick={() => router.push(`/events/edit/${id}`)}>Edit</Button>
      </Card.Body>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default EventCard;
