import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  game: 0,
  userId: 0,
  date: '',
  time: '',
  description: '',
};

const EventForm = ({ obj }) => {
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const [games, setGames] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj && obj.id) {
      setCurrentEvent((prevState) => ({
        ...prevState,
        id: obj.id,
        game: obj.game ? obj.game.id : 0,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        userId: user.uid,
      }));
    }
  }, [obj, user]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const eventUpdate = {
        id: obj.id,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: currentEvent.game,
        userId: user.uid,
      };
      updateEvent(eventUpdate)
        .then(() => router.push('/eventPage'));
    } else {
      const event = {
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: currentEvent.game,
        userId: user.uid,
      };
      createEvent(event).then(() => router.push('/eventPage'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="mt-5">{obj.id ? 'Update' : 'Create'} Event</h2>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select aria-label="game" name="game" required value={currentEvent.game} onChange={handleChange}>
            <option value="">Select a Game</option>
            {
              games.map((game) => (
                <option
                  key={game.id}
                  value={game.id}
                >
                  {game.title}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" required value={currentEvent.date} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" type="time" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>

        <Button type="submit">
          Submit
        </Button>

      </Form>
    </>
  );
};

EventForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    // game: PropTypes.shape({
    //   id: PropTypes.number,
    // }),
    // eslint-disable-next-line react/forbid-prop-types
    game: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    userId: PropTypes.object,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
