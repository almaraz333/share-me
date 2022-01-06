import { useState, useEffect, useMemo } from 'react';

import { MasonryLayout } from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import { Spinner } from './Spinner';
import { useRecoilValue } from 'recoil';
import { searchState } from '../atoms';
import { pin } from '../types';

export const Search = () => {
  const searchTerm = useRecoilValue(searchState);

  const [pins, setPins] = useState<pin[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);

      const query = searchQuery(searchTerm.toLocaleLowerCase());

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  if (loading) return <Spinner message="Searching for pins..." />;

  if (pins?.length === 0 && searchTerm && !loading)
    return <div className="mt-10 text-center text-xl">No Pins Found</div>;

  return <div>{pins?.length && <MasonryLayout pins={pins} />}</div>;
};
