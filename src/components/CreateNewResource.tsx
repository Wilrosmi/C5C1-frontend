import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IResourceRequest } from "../utils/types";
import { IResourceResponse } from "../utils/types";
import { SelectOrCreateTag } from "./SelectOrCreateTag";
import axios from "axios";
import { inputsValid } from "../utils/inputsValid";
import { baseUrl } from "../utils/baseUrl";

import getResourcesFromServer from "../utils/getResourcesFromServer";

import { IUserResponse } from "../App";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function CreateNewResource({
  setResourceList,
  currentUserManager,
}: IProps): JSX.Element {
  const [show, setShow] = useState(false);

  const currentUser = currentUserManager[0];

  const templateResourceRequest = {
    resource_name: "",
    author_name: "",
    url: "",
    description: "",
    content_type: "",
    build_stage: "",
    opinion: "",
    opinion_reason: "",
    user_id: currentUser?.user_id,
  };

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

  const [opinions, setOpinions] = useState<{ opinion: string }[]>([]);
  const [buildStageNames, setBuildStageNames] = useState<
    { stage_name: string }[]
  >([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const opinionsResponse = await axios.get(dbURL + "/opinions");
        setOpinions(opinionsResponse.data);

        const buildStageNamesResponse = await axios.get(dbURL + "/stage_names");
        setBuildStageNames(buildStageNamesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOptions();
  }, []);

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
        console.error(error);
        alert("Something went wrong. Try changing some of your inputs.");
      }
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        disabled={currentUser === undefined}
      >
        Create Resource
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <label htmlFor="author-name-input">author name: </label>
          <input
            value={author_name}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                author_name: e.target.value,
              })
            }
            placeholder="start typing"
          />
          <label htmlFor="url-input">URL: </label>
          <input
            id="url-input"
            value={url}
            onChange={(e) =>
              setNewResourceData({ ...newResourceData, url: e.target.value })
            }
            placeholder="paste here"
          />
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
