import { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import { client } from '../client';
//@ts-ignore
import logo from '../assets/logo.png';
import { Pins } from './Pins';
import { userInfo } from 'os';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';
import { userQuery } from '../utils/data';

export const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const userInfo = useRecoilValue(userState);

  useEffect(() => {
    const query = userQuery(userInfo?.googleId ?? '');
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setToggleSidebar(false)}
        />
        <Link to="/">
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        <Link to={`user-profile/`}></Link>
      </div>
    </div>
  );
};
