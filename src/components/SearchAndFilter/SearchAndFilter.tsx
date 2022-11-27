import SearchBar from "./SearchBar";
import { TagsCloud } from "./TagsCloud";
import "./SearchAndFilter.scss";

interface IProps {
  searchTags: string[];
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  searchTags,
  setSearchTags,
}: IProps): JSX.Element {
  return (
    <>
      <div id="search_filter">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TagsCloud searchTags={searchTags} setSearchTags={setSearchTags} />
      </div>
    </>
  );
}
