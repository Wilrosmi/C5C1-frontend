interface ISearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: ISearchBarProps): JSX.Element {
  return (
    <input
      id="search-bar"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
