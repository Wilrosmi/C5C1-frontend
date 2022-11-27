import { useState } from "react";
import { IResourceRequest } from "../../utils/types";
import { IResourceResponse } from "../../utils/types";
import { SelectOrCreateTag } from "./SelectOrCreateTag";
import axios from "axios";
import { inputsValid } from "../../utils/inputsValid";
import { baseUrl } from "../../utils/baseUrl";
import "./FormElement.scss";

import getResourcesFromServer from "../../utils/getResourcesFromServer";

import { IUserResponse } from "../../utils/types";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  opinions: {
    opinion: string;
  }[];
  buildStageNames: {
    stage_name: string;
  }[];
}

export const templateResourceRequest = {
  resource_name: "",
  author_name: "",
  url: "",
  description: "",
  content_type: "",
  build_stage: "",
  opinion: "",
  opinion_reason: "",
  user_id: NaN,
};

export default function CreateNewResource({
  setResourceList,
  currentUserManager,
  opinions,
  buildStageNames,
}: IProps): JSX.Element {
  const currentUser = currentUserManager[0];

  const [newResourceData, setNewResourceData] = useState<IResourceRequest>(
    templateResourceRequest
  );

  const {
    resource_name,
    url,
    author_name,
    content_type,
    opinion_reason,
    description,
  } = newResourceData;
  const [selectedTags, setSelectedTags] = useState<{ tag_name: string }[]>([]);

  const handleSubmit = async () => {
    if (inputsValid(newResourceData)) {
      try {
        await axios.post(baseUrl + "/resources", {
          ...newResourceData,
          user_id: currentUser?.user_id,
          tag_array: selectedTags,
        });

        await getResourcesFromServer(setResourceList);
      } catch (error) {
        window.alert("That url is already taken");
      }
    }
  };

  return (
    <>
      <h1>ADD NEW RESOURCE</h1>

      <div className="form_element">
        <label htmlFor="resource-name-input">Resource Name</label>
        <input
          id="resource-name-input"
          value={resource_name}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              resource_name: e.target.value,
            })
          }
          placeholder="Resource Title"
        />
      </div>

      <div className="form_element">
        <label htmlFor="author-name-input">Author Name</label>
        <input
          id="author-name-input"
          value={author_name}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              author_name: e.target.value,
            })
          }
          placeholder="Author"
        />
      </div>

      <div className="form_element">
        <label htmlFor="url-input">URL</label>
        <input
          id="url-input"
          value={url}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              url: e.target.value,
            })
          }
          placeholder="URL"
        />
      </div>
      <div className="form_element">
        <label htmlFor="content-type-input">Content Type</label>
        <input
          id="content-type-input"
          value={content_type}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              content_type: e.target.value,
            })
          }
          placeholder="Content Type"
        />
      </div>
      <div className="form_element">
        <label htmlFor="description-input">Description</label>
        <input
          id="description-input"
          value={description}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              description: e.target.value,
            })
          }
          placeholder="Description"
        />
      </div>
      <div className="form_element">
        <label htmlFor="opinion-select">Opinion</label>
        <select
          id="opinion-select"
          defaultValue={"nothing selected"}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              opinion: e.target.value,
            })
          }
        >
          <option disabled>Nothing Selected</option>
          {opinions.map((option, i) => (
            <option key={i}>{option.opinion}</option>
          ))}
        </select>
      </div>
      <div className="form_element">
        <label htmlFor="opinion-reason-input">Opinion Explanation</label>
        <input
          id="opinion-reason-input"
          value={opinion_reason}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              opinion_reason: e.target.value,
            })
          }
          placeholder="Explanation"
        />
      </div>
      <div className="form_element">
        <label htmlFor="buildStageName-select">Stage</label>
        <select
          id="buildStageName-select"
          defaultValue={"Nothing Selected"}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              build_stage: e.target.value,
            })
          }
        >
          <option disabled>Nothing Selected</option>
          {buildStageNames.map((stage, i) => (
            <option key={i}>{stage.stage_name}</option>
          ))}
        </select>
      </div>

      <SelectOrCreateTag
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
