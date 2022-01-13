import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { pin } from '../types';
import { feedQuery, searchQuery } from '../utils/data';
import { MasonryLayout } from './MasonryLayout';
import { Spinner } from './Spinner';

export const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState<pin[] | null>(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => setPins(data));
      setLoading(false);
    } else {
      const query = feedQuery;
      client.fetch(query).then((data) => setPins(data));
      setLoading(false);
    }
  }, [categoryId]);

  if (loading) return <Spinner message="We are curating your feed!" />;

  if (!pins?.length)
    return (
      <h2 className="flex justify-center mt-10 text-3xl font-bold">
        No Pins Found
      </h2>
    );

  return <div>{pins && <MasonryLayout pins={pins} />} </div>;
};
