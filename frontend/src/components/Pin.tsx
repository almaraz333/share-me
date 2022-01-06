import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { urlFor, client } from '../client';
import { pin } from '../types';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

type PinProps = {
  pin: pin;
};

export const Pin: React.FC<PinProps> = ({
  pin: { image, postedBy, _id, destination, save }
}) => {
  const navigate = useNavigate();
  const [postIsHovered, setPostIsHovered] = useState(false);

  const user = useRecoilValue(userState);

  const alreadySaved = !!save?.filter(
    (item) => item.postedBy?._id === user?.googleId
  ).length;

  const savePin = async (id: string) => {
    if (!alreadySaved) {
      await client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: { _type: 'postedBy', _ref: user?.googleId }
          }
        ])
        .commit();

      window.location.reload();
    }
  };

  const deletePin = async (id: string) => {
    await client.delete(id);

    window.location.reload();
  };

  return (
    <div className="w-max m-2">
      <div
        onMouseEnter={() => setPostIsHovered(true)}
        onMouseLeave={() => setPostIsHovered(false)}
        onClick={() => navigate(`/pin-details/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full"
          src={`${urlFor(image).width(250)}`}
          alt={'pin'}
        />
        {postIsHovered && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-1 px-2 pt-2 pb-2 z-50"
              style={{ height: '100%' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <a
                    href={`${image?.asset.url}?dl=`}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-7 h-7 rounded-full flex items-center justify-center text-dark text-lg opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>
                <button
                  className="bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!alreadySaved) savePin(_id);
                  }}
                >
                  {alreadySaved ? `${save?.length}  Saved` : `Save`}
                </button>
              </div>
              <div className="flex justify-between items-center gap-2 w-full">
                {destination && (
                  <a
                    href={destination}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  >
                    <BsFillArrowUpRightCircleFill />
                    {destination.length > 15
                      ? `${destination.slice(0, 15)}...`
                      : destination}
                  </a>
                )}
                {postedBy?._id === user?.googleId && (
                  <button
                    type="button"
                    className="bg-red-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                  >
                    <AiTwotoneDelete />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy.image}
          alt="user"
        />
        <p className="font-semibold capitalize">{postedBy.userName}</p>
      </Link>
    </div>
  );
};
