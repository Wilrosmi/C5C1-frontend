import axios from "axios";
import { useEffect, useState } from "react";

interface SelectOrCreateTagProps {
  selectedTags: { tag_name: string }[];
  setSelectedTags: React.Dispatch<
    React.SetStateAction<
      {
        tag_name: string;
      }[]
    >
  >;
}

export function SelectOrCreateTag({
  selectedTags,
  setSelectedTags,
}: SelectOrCreateTagProps): JSX.Element {
  const dbURL = "http://localhost:4000";

  const [currentTag, setCurrentTag] = useState<string>("");
  const [allTags, setAllTags] = useState<{ tag_name: string }[]>([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const tagsResponse = await axios.get(dbURL + "/tags");
        setAllTags(tagsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTags();
  }, []);

  const handleCreateNewTag = () => {
    setSelectedTags([...selectedTags, { tag_name: currentTag }]);
    setCurrentTag("");
  };

  const handleRemoveTag = (tag: { tag_name: string }) => {
    setSelectedTags(
      selectedTags.filter((arrayItem) => arrayItem.tag_name !== tag.tag_name)
    );
  };

  const filterTags = (tag: { tag_name: string }) => {
    if (!tag.tag_name.includes(currentTag)) {
      return false;
    }
    const selectedTagNames = selectedTags.map(
      (selectedTag) => selectedTag.tag_name
    );
    if (selectedTagNames.includes(tag.tag_name)) {
      return false;
    }
    return true;
  };

  return (
    <>
      <input
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        placeholder="create or search tag"
      />
      <button onClick={handleCreateNewTag}>Add new tag</button>
      <div className="tag-cloud">
        {allTags.filter(filterTags).map((tag, i) => (
          <button
            key={i}
            onClick={() => setSelectedTags([...selectedTags, tag])}
          >
            {tag.tag_name}
          </button>
        ))}
      </div>
      <div className="selected-selectedTags">
        {selectedTags.map((tag, i) => (
          <button key={i} onClick={() => handleRemoveTag(tag)}>
            {tag.tag_name} x
          </button>
        ))}
      </div>
    </>
  );
}
