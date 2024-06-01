import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteEvent } from '../../utils/data/eventData';

const EventCard = ({
  id,
  game, //
  description,
  date,
  time,
  onUpdate,
}) => {
  const deleteTheEvent = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  const router = useRouter();

  return (
    <Card className="text-center">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Text>About: {description}</Card.Text>
        <Card.Text>When: {date}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Button onClick={() => router.push(`/events/edit/${id}`)}>Edit</Button>
        <Button onClick={deleteTheEvent}>Delete</Button>
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
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
