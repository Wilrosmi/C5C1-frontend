import axios from "axios";
import { useEffect, useState } from "react";
import { IUserResponse } from "../utils/types";
import { baseUrl } from "../utils/baseUrl";
import getStudylistFromServer from "../utils/getStudylistFromServer";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
}

export default function SignIn({
  currentUserManager,
  setUserStudylist,
}: IProps): JSX.Element {
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

  async function handleSelectUser(selectedId: string): Promise<void> {
    const futureCurrentUser = userList.find(
      (user) => parseInt(selectedId) === user.user_id
    );
    if (futureCurrentUser) {
      getStudylistFromServer(parseInt(selectedId), setUserStudylist);
    } else {
      setUserStudylist(null);
    }
    setCurrentUser(futureCurrentUser);
  }

  return (
    <select id="select-user" onChange={(e) => handleSelectUser(e.target.value)}>
      <option value={undefined}>Not signed in</option>
      {userList.map((user, i) => (
        <option key={i} value={user.user_id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
