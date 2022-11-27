import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/baseUrl";
import "./FormElement.scss";

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
  const [currentTag, setCurrentTag] = useState<string>("");
  const [allTags, setAllTags] = useState<{ tag_name: string }[]>([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const tagsResponse = await axios.get(baseUrl + "/tags");
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
      <div id="tags_input">
        <div className="form_element">
          <label htmlFor="new-tag-input">Tags</label>
          <input
            id="new-tag-input"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Search Tags"
          />
        </div>
        <button onClick={handleCreateNewTag}>Add new tag</button>
      </div>

      <div className="tag_cloud tags-to-select">
        {allTags.filter(filterTags).map((tag, i) => (
          <button
            className="tag"
            key={i}
            onClick={() => setSelectedTags([...selectedTags, tag])}
          >
            {tag.tag_name}
          </button>
        ))}
      </div>
      <div className="selected-selectedTags">
        {selectedTags.map((tag, i) => (
          <button
            className="tag selected_tag"
            key={i}
            onClick={() => handleRemoveTag(tag)}
          >
            {tag.tag_name} x
          </button>
        ))}
      </div>
    </>
  );
}
