import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import CreateNewResource from "./components/CreateNewResource";
import ResourceList from "./components/ResourceList";
import NavigationBar from "./components/NavigationBar";
import { IResourceResponse } from "./utils/types";
import "./styles.css";
import { baseUrl } from "./utils/baseUrl";
import axios from "axios";

export interface IUserResponse {
  user_id: number;
  name: string;
  is_faculty: boolean;
}

function App(): JSX.Element {
  const currentUserManager = useState<IUserResponse | undefined>(undefined);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resourceList, setResourceList] = useState<IResourceResponse[]>([]);
  const [userStudylist, setUserStudylist] = useState<number[] | null>(null);
  const [listMode, setListMode] = useState<"resource list" | "study list">(
    "resource list"
  );
  const [opinions, setOpinions] = useState<{ opinion: string }[]>([]);
  const [buildStageNames, setBuildStageNames] = useState<
    { stage_name: string }[]
  >([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const opinionsResponse = await axios.get(baseUrl + "/opinions");
        setOpinions(opinionsResponse.data);

        const buildStageNamesResponse = await axios.get(
          baseUrl + "/stage_names"
        );
        setBuildStageNames(buildStageNamesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOptions();
  }, []);

  return (
    <div>
      <NavigationBar
        searchTags={searchTags}
        setSearchTags={setSearchTags}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentUserManager={currentUserManager}
        listMode={listMode}
        setListMode={setListMode}
        setUserStudylist={setUserStudylist}
      />
      <CreateNewResource
        currentUserManager={currentUserManager}
        setResourceList={setResourceList}
        opinions={opinions}
        buildStageNames={buildStageNames}
      />
      <ResourceList
        searchTags={searchTags}
        searchTerm={searchTerm}
        currentUser={currentUserManager[0]}
        resourceList={resourceList}
        setResourceList={setResourceList}
        userStudylist={userStudylist}
        setUserStudylist={setUserStudylist}
        listMode={listMode}
        setListMode={setListMode}
        opinions={opinions}
        buildStageNames={buildStageNames}
      />
    </div>
  );
}

export default App;
