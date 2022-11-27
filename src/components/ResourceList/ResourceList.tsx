import getResourcesFromServer from "../../utils/getResourcesFromServer";
import { useEffect } from "react";
import filterBySearchTerm from "../../utils/filterBySearchTerm";
import { IResourceResponse } from "../../utils/types";
import { filterBySearchTags } from "../../utils/filterBySearchTags";
import "./ResourceList.scss";
import ResourceCard from "../Resource/ResourceCard";

interface IProps {
  searchTags: string[];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function ResourceList({
  searchTags,
  searchTerm,
  resourceList,
  setResourceList,
}: IProps): JSX.Element {
  useEffect(() => {
    getResourcesFromServer(setResourceList);
  }, [setResourceList]);

  return (
    <>
      <div id="resource_list_section">
        <h1>RESOURCE LIST</h1>
        {/* TODO: Format at smaller screen sizes */}
        <div id="resource_list">
          {resourceList
            .filter((resource) => filterBySearchTags(searchTags, resource))
            .filter((resource) => filterBySearchTerm(searchTerm, resource))
            .map((resource, i) => (
              <ResourceCard key={i} resourceData={resource} />
            ))}
        </div>
      </div>
    </>
  );
}
