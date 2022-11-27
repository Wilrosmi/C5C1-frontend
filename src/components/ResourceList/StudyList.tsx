import getResourcesFromServer from "../../utils/getResourcesFromServer";
import { useEffect } from "react";
import { IUserResponse } from "../../utils/types";
import filterBySearchTerm from "../../utils/filterBySearchTerm";
import { IResourceResponse } from "../../utils/types";
import { filterBySearchTags } from "../../utils/filterBySearchTags";
import filterByListMode from "../../utils/filterByListMode";
import ResourceCard from "../Resource/ResourceCard";

interface IProps {
  currentUser: IUserResponse | undefined;
  searchTags: string[];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  userStudylist: number[] | null;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
  opinions: {
    opinion: string;
  }[];
  buildStageNames: {
    stage_name: string;
  }[];
}

export default function StudyList({
  currentUser,
  searchTags,
  searchTerm,
  resourceList,
  setResourceList,
  userStudylist,
  setUserStudylist,
  opinions,
  buildStageNames,
}: IProps): JSX.Element {
  useEffect(() => {
    getResourcesFromServer(setResourceList);
  }, [setResourceList]);

  return (
    <>
      <h1>{currentUser && `${currentUser.name.toUpperCase()}'s`} STUDY LIST</h1>
      <div id="resource_list">
        {resourceList
          .filter((resource) => filterBySearchTags(searchTags, resource))
          .filter((resource) => filterBySearchTerm(searchTerm, resource))
          .filter((resource) =>
            filterByListMode("study list", userStudylist, resource)
          )
          .map((resource, i) => (
            <ResourceCard key={i} resourceData={resource} />
          ))}
      </div>
    </>
  );
}
