import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { IResourceRequest } from "../utils/types";
import { IResourceResponse } from "../utils/types";
import { SelectOrCreateTag } from "./SelectOrCreateTag";
import axios from "axios";
import { inputsValid } from "../utils/inputsValid";
import { baseUrl } from "../utils/baseUrl";

import getResourcesFromServer from "../utils/getResourcesFromServer";

import { IUserResponse } from "../utils/types";

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
  const [show, setShow] = useState(false);

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

  const handleClose = () => {
    setNewResourceData(templateResourceRequest);
    setSelectedTags([]);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    if (inputsValid(newResourceData)) {
      try {
        await axios.post(baseUrl + "/resources", {
          ...newResourceData,
          user_id: currentUser?.user_id,
          tag_array: selectedTags,
        });

        await getResourcesFromServer(setResourceList);

        handleClose();
      } catch (error) {
        window.alert("That url is already taken");
      }
    }
  };

  return (
    <>
      {currentUser && (
        <Button
          variant="primary"
          onClick={handleShow}
          disabled={currentUser === undefined}
          id="create_new_resource_button"
        >
          Create Resource
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="resource_modal">
            <li>
              <label htmlFor="resource-name-input">resource name: </label>
              <input
                id="resource-name-input"
                value={resource_name}
                onChange={(e) =>
                  setNewResourceData({
                    ...newResourceData,
                    resource_name: e.target.value,
                  })
                }
                placeholder="start typing"
              />
            </li>
            <li>
              <label htmlFor="author-name-input">author name: </label>
              <input
                id="author-name-input"
                value={author_name}
                onChange={(e) =>
                  setNewResourceData({
                    ...newResourceData,
                    author_name: e.target.value,
                  })
                }
                placeholder="start typing"
              />
            </li>
            <li>
              <label htmlFor="url-input">URL: </label>
              <input
                id="url-input"
                value={url}
                onChange={(e) =>
                  setNewResourceData({
                    ...newResourceData,
                    url: e.target.value,
                  })
                }
                placeholder="paste here"
              />
            </li>
            <li>
              <label htmlFor="content-type-input">content type: </label>
              <input
                id="content-type-input"
                value={content_type}
                onChange={(e) =>
                  setNewResourceData({
                    ...newResourceData,
                    content_type: e.target.value,
                  })
                }
                placeholder="start typing"
              />
            </li>
            <li>
              <label htmlFor="description-input">description: </label>
              <input
                id="description-input"
                value={description}
                onChange={(e) =>
                  setNewResourceData({
                    ...newResourceData,
                    description: e.target.value,
                  })
                }
                placeholder="start typing"
              />
            </li>
            <li>
              <label htmlFor="opinion-select">opinion:</label>
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
                value={opinion_reason}
                onChange={(e) =>
                  setNewResourceData({
                    ...newResourceData,
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
                  setNewResourceData({
                    ...newResourceData,
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
          <Button variant="secondary" onClick={handleClose}>
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
