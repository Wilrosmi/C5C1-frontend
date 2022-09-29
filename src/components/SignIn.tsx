import axios from "axios";
import { useEffect, useState } from "react";
import { IUserResponse } from "../App";
import { baseUrl } from "../utils/baseUrl";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
}

export default function SignIn({ currentUserManager }: IProps): JSX.Element {
  const setCurrentUser = currentUserManager[1];
  const [userList, setUserList] = useState<IUserResponse[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(baseUrl + "/users");
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  function handleSelectUser(selectedId: string): void {
    const futureCurrentUser = userList.find(
      (user) => parseInt(selectedId) === user.user_id
    );
    setCurrentUser(futureCurrentUser);
  }

  return (
    <select onChange={(e) => handleSelectUser(e.target.value)}>
      <option value={undefined}>Not signed in</option>
      {userList.map((user, i) => (
        <option key={i} value={user.user_id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
