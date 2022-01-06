import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { searchState, userState } from '../atoms';
import { useRecoilState } from 'recoil';
import { GoogleLogout } from 'react-google-login';

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useRecoilState(searchState);
  const [user, setUser] = useRecoilState(userState);

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 py-1 rounded-md bg-white border-none outline-none focus-within shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      {user ? (
        <div className="flex gap-3">
          <Link
            to={`user-profile/${user.googleId}`}
            className="hidden md:block"
          >
            <img
              src={user?.imageUrl}
              alt="user"
              className="w-14 h-12 rounded-lg"
            />
          </Link>

          <Link
            to="/create-pin"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
          <GoogleLogout
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            render={(renderProps) => (
              <button
                type="button"
                className="bg-red-500 text-white font-bold rounded-lg w-40 outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Log out
              </button>
            )}
            onLogoutSuccess={() => {
              setUser(undefined);
              navigate('/');
            }}
            // cookiePolicy="single_host_origin"
          />
        </div>
      ) : (
        <button
          className="bg-red-500 text-white font-bold rounded-lg w-20 outline-none"
          onClick={() => navigate('/login')}
        >
          Log in
        </button>
      )}
    </div>
  );
};
