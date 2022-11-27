import "./Menu.scss";
import { Link } from "react-router-dom";
import { MenuOption } from "../../../utils/types";

interface IProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
}

export default function Menu({ setShowMenu, loggedIn }: IProps): JSX.Element {
  const menuOptions: MenuOption[] = [
    { name: "Home", route: "/", loggedIn: false },
    { name: "Study List", route: "/study", loggedIn: true },
    { name: "Add New Resource", route: "/new", loggedIn: true },
    { name: "Log Out", route: "/login", loggedIn: true },
  ];
  //TODO: Make add new resource a button
  //TODO: Underline current page
  //TODO: Find better way to filter that doesn't repeat code
  //TODO: Log out option on menu actually logs you out

  return (
    <ul id="menu">
      {loggedIn === true
        ? menuOptions.map((option, i) => {
            return (
              <Link
                to={option.route}
                key={i}
                className="option"
                onClick={() => setShowMenu(false)}
              >
                <li key={i}>{option.name}</li>
              </Link>
            );
          })
        : menuOptions
            .filter((option) => option.loggedIn === false)
            .map((option, i) => {
              return (
                <Link
                  to={option.route}
                  key={i}
                  className="option"
                  onClick={() => setShowMenu(false)}
                >
                  <li key={i}>{option.name}</li>
                </Link>
              );
            })}
    </ul>
  );
}
