import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
//@ts-ignore
import logo from '../assets/logo.png';

type SidebarProps = {
  user: any;
  closeToggle?: (isToggleOpen: boolean) => void;
};

const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize ';

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize ';

export const Sidebar = ({ user, closeToggle }: SidebarProps) => {
  const handleSidebarToggle = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-column justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleSidebarToggle}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
        </div>
      </div>
    </div>
  );
};
