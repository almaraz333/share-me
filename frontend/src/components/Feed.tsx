import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import { MasonryLayout } from './MasonryLayout';
import { Spinner } from './Spinner';

export const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
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

  return <div>Feed</div>;
};
