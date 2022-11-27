interface ISearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: ISearchBarProps): JSX.Element {
  return (
    <>
      <input
        id="search_bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
      <img id="search_icon" src="./img/search.svg" alt="search icon" />
      {/* TODO: Add search bar magnifying glass icon to RHS */}
      {/* <img src='./img/search.svg' alt='search button'/> */}
      {/* TODO: When search move the results up the page/ hide the top resources */}
    </>
  );
}
