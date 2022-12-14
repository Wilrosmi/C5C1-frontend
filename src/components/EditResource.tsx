import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { IResourceRequest, IResourceResponse } from "../utils/types";
import { templateResourceRequest } from "./CreateNewResource";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import getResourcesFromServer from "../utils/getResourcesFromServer";
import { SelectOrCreateTag } from "./SelectOrCreateTag";
import { inputsValid } from "../utils/inputsValid";

interface IEditResourceProps {
  currentUserId: number;
  resource_id: number;
  resource_data: IResourceResponse;
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  opinions: {
    opinion: string;
  }[];
  buildStageNames: {
    stage_name: string;
  }[];
}

export default function EditResource({
  currentUserId,
  resource_id,
  resource_data,
  setResourceList,
  showEdit,
  setShowEdit,
  opinions,
  buildStageNames,
}: IEditResourceProps): JSX.Element {
  const {
    resource_name,
    author_name,
    url,
    description,
    content_type,
    build_stage,
    opinion,
    opinion_reason,
    user_id,
  } = resource_data;

  const [editData, setEditData] = useState<IResourceRequest>(
    templateResourceRequest
  );
  const [selectedTags, setSelectedTags] = useState<{ tag_name: string }[]>([]);

  useEffect(() => {
    setEditData({
      resource_name: resource_name,
      author_name: author_name,
      url: url,
      description: description,
      content_type: content_type,
      build_stage: build_stage,
      opinion: opinion,
      opinion_reason: opinion_reason,
      user_id: user_id,
    });
  }, [
    resource_name,
    author_name,
    url,
    description,
    content_type,
    build_stage,
    opinion,
    opinion_reason,
    user_id,
  ]);

  async function handleSubmit(): Promise<void> {
    try {
      if (inputsValid(editData)) {
        await axios.put(`${baseUrl}/resources/${resource_id}`, {
          ...editData,
          user_id: currentUserId,
          tag_array: selectedTags,
        });
        getResourcesFromServer(setResourceList);
        setShowEdit(false);
      }
    } catch (error) {
      console.error(error);
      window.alert("That url has already been submitted");
    }
  }

  return (
    <>
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="resource_modal">
            <li>
              <label htmlFor="resource-name-edit">resource name: </label>
              <input
                id="resource-name-edit"
                value={editData.resource_name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    resource_name: e.target.value,
                  })
                }
                placeholder="start typing"
              />
            </li>
            <li>
              <label htmlFor="author-name-edit">author name: </label>
              <input
                id="author-name-edit"
                value={editData.author_name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    author_name: e.target.value,
                  })
                }
                placeholder="start typing"
              />
            </li>
            <li>
              <label htmlFor="url-edit">URL: </label>
              <input
                id="url-edit"
                value={editData.url}
                onChange={(e) =>
                  setEditData({ ...editData, url: e.target.value })
                }
                placeholder="paste here"
              />
            </li>
            <li>
              <label htmlFor="content-type-edit">content type: </label>
              <input
                id="content-type-edit"
                value={editData.content_type}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    content_type: e.target.value,
                  })
                }
                placeholder="start typing"
              />
            </li>
            <li>
              <label htmlFor="description-edit">description: </label>
              <input
                id="description-edit"
                value={editData.description}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    description: e.target.value,
                  })
                }
                placeholder="start typing"
              />
            </li>
            <li>
              <label htmlFor="opinion-select-edit">opinion:</label>
              <select
                id="opinion-select-edit"
                defaultValue={"nothing selected"}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    opinion: e.target.value,
                  })
                }
              >
                <option disabled>nothing selected</option>
                {opinions.map((option, i) => (
                  <option key={i}>{option.opinion}</option>
                ))}
              </select>
            </li>
            <li>
              <label htmlFor="opinion-reason-input">opinion-reason: </label>
              <input
                id="opinion-reason-input"
                value={editData.opinion_reason}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    opinion_reason: e.target.value,
                  })
                }
                placeholder="start typing"
              />
            </li>
            <li>
              <label htmlFor="buildStageName-select">stage: </label>
              <select
                id="buildStageName-select"
                defaultValue={"nothing selected"}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    build_stage: e.target.value,
                  })
                }
              >
                <option disabled>nothing selected</option>
                {buildStageNames.map((stage, i) => (
                  <option key={i}>{stage.stage_name}</option>
                ))}
              </select>
            </li>
          </ul>
          <SelectOrCreateTag
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
