import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { getEvents } from '../utils/data/eventData';
import EventCard from '../components/event/EventCard';
// import { useAuth } from '../utils/context/authContext';

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  // const { user } = useAuth();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        New Event
      </Button>
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard game={event.game} description={event.description} date={event.date} time={event.time} />
        </section>
      ))}
    </article>
  );
}

export default ViewEvents;
