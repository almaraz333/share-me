import { Routes, Route } from 'react-router-dom';

import { Navbar, Feed, PinDetails, CreatePin, Search } from '../components';

export const Pins = () => {
  return (
    <div className="px-2 md: px-5">
      <div className="bg-grey-50">
        <Navbar />
      </div>
      <div className="h-full ">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-details/:pinId" element={<PinDetails />} />
          <Route path="/create-pin" element={<CreatePin />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
};
