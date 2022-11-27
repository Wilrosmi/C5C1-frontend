import getResourcesFromServer from "../utils/getResourcesFromServer";
import { useEffect } from "react";
import IndividualResource from "./IndividualResource";
import { IUserResponse } from "../utils/types";
import filterBySearchTerm from "../utils/filterBySearchTerm";
import { IResourceResponse } from "../utils/types";
import { filterBySearchTags } from "../utils/filterBySearchTags";
import filterByListMode from "../utils/filterByListMode";
import { Tab, Tabs } from "react-bootstrap";

interface IProps {
  currentUser: IUserResponse | undefined;
  searchTags: string[];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  userStudylist: number[] | null;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
  listMode: "resource list" | "study list";
  setListMode: React.Dispatch<
    React.SetStateAction<"resource list" | "study list">
  >;
  opinions: {
    opinion: string;
  }[];
  buildStageNames: {
    stage_name: string;
  }[];
}

export default function ResourceList({
  currentUser,
  searchTags,
  searchTerm,
  resourceList,
  setResourceList,
  userStudylist,
  setUserStudylist,
  listMode,
  setListMode,
  opinions,
  buildStageNames,
}: IProps): JSX.Element {
  useEffect(() => {
    getResourcesFromServer(setResourceList);
  }, [setResourceList]);

  return (
    <>
      <Tabs
        activeKey={listMode}
        onSelect={(mode) =>
          mode === "study list"
            ? setListMode("study list")
            : setListMode("resource list")
        }
        className="mb-3"
        style={{ margin: "30px" }}
      >
        <Tab eventKey="resource list" title="Resource List">
          <div id="resource_list">
            {resourceList
              .filter((resource) => filterBySearchTags(searchTags, resource))
              .filter((resource) => filterBySearchTerm(searchTerm, resource))
              .filter((resource) =>
                filterByListMode(listMode, userStudylist, resource)
              )
              .map((resource) => (
                <IndividualResource
                  key={resource.resource_id}
                  resourceData={resource}
                  currentUser={currentUser}
                  setResourceList={setResourceList}
                  userStudylist={userStudylist}
                  setUserStudylist={setUserStudylist}
                  opinions={opinions}
                  buildStageNames={buildStageNames}
                />
              ))}
          </div>
        </Tab>
        <Tab eventKey="study list" title="Study List" disabled={!currentUser}>
          <div id="resource_list">
            {resourceList
              .filter((resource) => filterBySearchTags(searchTags, resource))
              .filter((resource) => filterBySearchTerm(searchTerm, resource))
              .filter((resource) =>
                filterByListMode(listMode, userStudylist, resource)
              )
              .map((resource) => (
                <IndividualResource
                  key={resource.resource_id}
                  resourceData={resource}
                  currentUser={currentUser}
                  setResourceList={setResourceList}
                  userStudylist={userStudylist}
                  setUserStudylist={setUserStudylist}
                  opinions={opinions}
                  buildStageNames={buildStageNames}
                />
              ))}
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
