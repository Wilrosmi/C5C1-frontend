import { IResourceResponse } from "../../utils/types";
import ResourceList from "../ResourceList/ResourceList";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";

interface IProps {
  searchTags: string[];
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function Home({
  searchTags,
  searchTerm,
  setSearchTerm,
  setSearchTags,
  resourceList,
  setResourceList,
}: IProps): JSX.Element {
  return (
    <>
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchTags={searchTags}
        setSearchTags={setSearchTags}
      />
      {/* <TopResources /> */}
      <ResourceList
        searchTags={searchTags}
        searchTerm={searchTerm}
        resourceList={resourceList}
        setResourceList={setResourceList}
      />
    </>
  );
}
