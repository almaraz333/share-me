import Masonry from 'react-masonry-css';
import { pin } from '../types';
import { Pin } from './Pin';

const breakpointObject = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1
};

type MasonryLayoutProps = {
  pins: pin[];
};

export const MasonryLayout: React.FC<MasonryLayoutProps> = ({ pins }) => {
  return (
    <div>
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={breakpointObject}
      >
        {pins.map((pin) => (
          <Pin key={pin._id} pin={pin} />
        ))}
      </Masonry>
    </div>
  );
};
