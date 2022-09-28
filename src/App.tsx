import "bootstrap/dist/css/bootstrap.min.css";
import CreateNewResource from "./components/CreateNewResource";
import ResourceList from "./components/ResourceList";
import { useState } from "react";
import NavigationBar from "./components/NavigationBar";

export interface IUserResponse {
  user_id: number;
  name: string;
  is_faculty: boolean;
}

function App(): JSX.Element {
  const currentUserManager = useState<IUserResponse | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div>
      <NavigationBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentUserManager={currentUserManager}
      />
      <CreateNewResource currentUserManager={currentUserManager} />
      <ResourceList
        searchTerm={searchTerm}
        currentUserManager={currentUserManager}
      />
    </div>
  );
}

export default App;
