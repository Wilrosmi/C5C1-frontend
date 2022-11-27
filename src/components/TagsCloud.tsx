import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";

interface ITagsCloudProps {
  searchTags: string[];
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export function TagsCloud({
  searchTags,
  setSearchTags,
}: ITagsCloudProps): JSX.Element {
  const [allTags, setAllTags] = useState<string[]>([]);
  useEffect(() => {
    const getAllTags = async () => {
      try {
        const tagList = await axios.get(baseUrl + "/tags");
        setAllTags(
          tagList.data.map((tagObj: { tag_name: string }) => tagObj.tag_name)
        );
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      }
    };
    getAllTags();
  }, []);

  const handleAddToSearchTags = (tag: string) =>
    setSearchTags([...searchTags, tag]);
  const handleRemoveFromSearchTags = (tag: string) =>
    setSearchTags(searchTags.filter((searchTag: string) => searchTag !== tag));

  return (
    <>
      <div className="tag-cloud filter_tags">
        {allTags
          .filter((tag) => !searchTags.includes(tag))
          .map((tag, i) => (
            <button
              className="tag"
              key={i}
              onClick={() => handleAddToSearchTags(tag)}
            >
              {tag}
            </button>
          ))}
      </div>
      <div className="tag-cloud">
        {searchTags.map((tag, i) => (
          <button
            className="tag selected_tag"
            key={i}
            onClick={() => handleRemoveFromSearchTags(tag)}
          >
            {tag} x
          </button>
        ))}
      </div>
    </>
  );
}
