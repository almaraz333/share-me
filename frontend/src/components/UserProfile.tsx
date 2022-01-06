import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery
} from '../utils/data';
import { client } from '../client';
import { MasonryLayout } from './MasonryLayout';
import { Spinner } from './Spinner';
import { pin, user } from '../types';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,technology';

const activeBtnStyles =
  'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles =
  'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

export const UserProfile = () => {
  const [user, setUser] = useState<user | null>(null);
  const [createdPins, setCreatedPins] = useState<pin[] | null>(null);
  const [savedPins, setSavedPins] = useState<pin[] | null>(null);
  const [text, setText] = useState<string | null>('Created');
  const [activeBtn, setActiveBtn] = useState('created');

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      const query = userQuery(userId);
      client.fetch(query).then((data) => setUser(data[0]));

      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => setCreatedPins(data));

      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => setSavedPins(data));
    }
  }, [userId]);

  if (!user) {
    return <Spinner message="Loading Profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-enter items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7 ">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object.cover z-0"
              alt="banner"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user?.imageUrl}
              alt="user profile"
            />
            <h1 className="font-bold text-3xl text-center mt-3">{user.name}</h1>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.currentTarget.textContent);
                setActiveBtn('created');
              }}
              className={`${
                activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.currentTarget.textContent);
                setActiveBtn('saved');
              }}
              className={`${
                activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {text === 'Created' ? (
            createdPins && createdPins.length ? (
              <div className="px-2">{<MasonryLayout pins={createdPins} />}</div>
            ) : (
              <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                No pins found
              </div>
            )
          ) : (
            <></>
          )}
          {text === 'Saved' ? (
            savedPins && savedPins.length ? (
              <div className="px-2">{<MasonryLayout pins={savedPins} />}</div>
            ) : (
              <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                No pins found
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
