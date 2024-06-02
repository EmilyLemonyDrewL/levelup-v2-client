import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteEvent, joinTheEvent, leaveTheEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const EventCard = ({
  id,
  game, //
  description,
  date,
  time,
  onUpdate,
  joined,
}) => {
  const deleteTheEvent = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  const router = useRouter();
  const { user } = useAuth();
  const leaveEvent = () => leaveTheEvent(id, user.uid).then(() => onUpdate());
  const joinEvent = () => joinTheEvent(id, user.uid).then(() => onUpdate());

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
      {
        joined
          ? (
            <Button
              className="btn-warning"
              onClick={leaveEvent}
            >Leave
            </Button>
          )
          : (
            <Button
              className="btn-info"
              onClick={joinEvent}
            >Join
            </Button>
          )
      }
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
  joined: PropTypes.bool.isRequired,
};

export default EventCard;
