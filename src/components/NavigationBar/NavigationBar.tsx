import { IUserResponse } from "../../utils/types";
import "./NavigationBar.scss";
import { useState } from "react";
import Menu from "./Menu/Menu";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

interface IProps {
  currentUser: IUserResponse | undefined;
}

export default function NavigationBar({ currentUser }: IProps): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation().pathname;
  const siteName = "Study Resources";

  return (
    <>
      <div id="navigation_bar">
        {location !== "/" && <h1 className="site_name">{siteName}</h1>}
        <img
          src="./img/menu.svg"
          alt="menu list button"
          onClick={() => setShowMenu(!showMenu)}
        />
        {currentUser ? (
          <Avatar name={currentUser.name} />
        ) : (
          <Link to="/login">
            <button>Sign in</button>
          </Link>
        )}
      </div>
      {/* TODO: Deal with site name being half way scrolled to top on home page overlapping menu */}
      {showMenu && (
        <Menu setShowMenu={setShowMenu} loggedIn={currentUser !== undefined} />
      )}
      {location === "/" && <h1 id="home_name">{siteName}</h1>}

      {/* TODO: Move filter area to its own component */}
    </>
  );
}
