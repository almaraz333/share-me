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
  pin: { image, postedBy, _id, destination }
}) => {
  const navigate = useNavigate();
  const [postIsHovered, setPostIsHovered] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);

  const user = useRecoilValue(userState);

  const alreadySaved = true;

  return (
    <div className="w-max m-2 ">
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
                <button>{alreadySaved ? 'Saved' : 'Save'}</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
