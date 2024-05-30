import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleGame } from '../../../utils/data/gameData';
import GameForm from '../../../components/game/GameForm';

export default function EditGame() {
  const router = useRouter();
  const { id } = router.query;
  const [gameEdit, setGameEdit] = useState({});

  useEffect(() => {
    getSingleGame(id).then((obj) => {
      // eslint-disable-next-line no-param-reassign
      obj.numberOfPlayers = obj.number_of_players;
      // eslint-disable-next-line no-param-reassign
      obj.skillLevel = obj.skill_level;
      // eslint-disable-next-line no-param-reassign
      obj.gameType = obj.game_type;
      setGameEdit(obj);
    });
  }, [id]);

  return (
    <>
      <h2>Edit Game</h2>
      <div>
        <GameForm obj={gameEdit} />
      </div>
    </>
  );
}
