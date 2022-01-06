import { useRecoilValue } from 'recoil';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { userState } from '../atoms';
import { client, urlFor } from '../client';
import { MasonryLayout } from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import { Spinner } from './Spinner';
import { useEffect, useState } from 'react';
import { pin } from '../types';

export const PinDetails = () => {
  const user = useRecoilValue(userState);
  const [pins, setPins] = useState<pin[] | null>(null);
  const [pinDetails, setPinDetails] = useState<pin | null>(null);
  const [comment, setComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { pinId } = useParams();

  useEffect(() => {
    if (pinId) {
      getPinDetails(pinId);
    }
  }, [pinId]);

  const getPinDetails = async (pinId: string) => {
    let query = pinDetailQuery(pinId);

    const details = await client.fetch(query);
    setPinDetails(details[0]);

    if (details[0]) {
      query = pinDetailMorePinQuery(details[0]);

      const moreDetails = await client.fetch(query);
      setPins(moreDetails);
    }
  };

  const addComment = async () => {
    if (comment && pinId) {
      setIsAddingComment(true);

      await client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: 'postedBy', _ref: user?.googleId }
          }
        ])
        .commit();

      await getPinDetails(pinId);

      setComment('');

      setIsAddingComment(false);
    }
  };

  if (!pinDetails) return <Spinner message="Loading Pin..." />;

  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto bg-white"
        style={{ maxWidth: '1500px', borderRadius: '32px' }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetails.image && urlFor(pinDetails.image).url()}
            className="rounded-t-3xl rounded-b-lg"
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:mw-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetails.image?.asset.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-7 h-7 rounded-full flex items-center justify-center text-dark text-lg opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetails.destination} target="_blank" rel="noreferrer">
              {pinDetails.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetails.title}
            </h1>
            <p className="mt-3 ">{pinDetails.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetails.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={pinDetails.postedBy.image}
              alt="user"
            />
            <p className="font-semibold capitalize">
              {pinDetails.postedBy.userName}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="mx-h-370 overflow-y-auto">
            {pinDetails?.comments?.map((comment, key) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={key}
              >
                <img
                  src={comment.postedBy.image}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link
              to={`user-profile/${pinDetails.postedBy?._id}`}
              className="flex gap-2 items-center bg-white rounded-lg"
            >
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={pinDetails.postedBy.image}
                alt="user"
              />
            </Link>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus-gray-300"
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {isAddingComment ? 'Posting comment' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {pins && pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2x mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};
