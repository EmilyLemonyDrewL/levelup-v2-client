import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleEvent } from '../../../utils/data/eventData';
import EventForm from '../../../components/event/EventForm';

export default function EditEvent() {
  const [eventEdit, setEventEdit] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEventEdit);
  }, [id]);

  return (
    <>
      <h2>Edit Event</h2>
      <div>
        <EventForm obj={eventEdit} />
      </div>
    </>
  );
}
