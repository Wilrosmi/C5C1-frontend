import { IResourceResponse } from "../utils/types";
import ResourceHeader from "./ResourceHeader";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Comments from "./Comments";
import { IUserResponse } from "../utils/types";
import LikeResource from "./LikeResource";
import getStudylistFromServer from "../utils/getStudylistFromServer";
import getResourcesFromServer from "../utils/getResourcesFromServer";
import EditResource from "./EditResource";

interface IProps {
  resourceData: IResourceResponse;
  currentUser: IUserResponse | undefined;
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  userStudylist: number[] | null;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
}

export default function IndividualResource({
  resourceData,
  currentUser,
  setResourceList,
  userStudylist,
  setUserStudylist,
}: IProps): JSX.Element {
  const [showResource, setShowResource] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const currentUserId = currentUser ? currentUser.user_id : undefined;

  const handleClose = () => setShowResource(false);
  const {
    description,
    build_stage,
    opinion_reason,
    user_name,
    resource_id,
    tag_array,
  } = resourceData;

  async function addToStudyList(): Promise<void> {
    if (currentUser === undefined) {
      return;
    }
    await axios.post(`${baseUrl}/users/${currentUser.user_id}/study_list`, {
      resource_id: resource_id,
    });
    await getStudylistFromServer(currentUser.user_id, setUserStudylist);
  }

  async function removeFromStudyList(): Promise<void> {
    if (currentUser !== undefined) {
      await axios.delete(`${baseUrl}/users/${currentUser.user_id}/study-list`, {
        data: { resource_id: resource_id },
      });
      await getStudylistFromServer(currentUser.user_id, setUserStudylist);
    }
  }

  async function handleDelete(): Promise<void> {
    await axios.delete(`${baseUrl}/resources/${resource_id}`);
    getResourcesFromServer(setResourceList);
  }

  return (
    <div>
      <ResourceHeader
        setShowResource={setShowResource}
        resourceData={resourceData}
      />
      {/* <button>Add to study list</button> */}
      <LikeResource
        currentUser={currentUser}
        resourceData={resourceData}
        setResourceList={setResourceList}
      />
      <Modal show={showResource} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResourceHeader
            setShowResource={setShowResource}
            resourceData={resourceData}
          />
          <h4>{build_stage}</h4>
          <p>{description}</p>
          <h4>{user_name}'s notes:</h4>
          <p>{opinion_reason}</p>
          <LikeResource
            currentUser={currentUser}
            resourceData={resourceData}
            setResourceList={setResourceList}
          />
          <div className="tag-cloud">
            Tags:
            {tag_array.map((tag, i) => (
              <button key={i}>{tag}</button>
            ))}
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setShowEdit(true);
              setShowResource(false);
            }}
            disabled={currentUserId !== resource_id}
          >
            Edit Resource
          </Button>
          <button onClick={handleDelete}>Delete Resource</button>
          {userStudylist && userStudylist.includes(resource_id) ? (
            <button onClick={removeFromStudyList}>
              Remove from study list
            </button>
          ) : (
            <button
              onClick={addToStudyList}
              disabled={currentUser === undefined}
            >
              Add to study list
            </button>
          )}

          <h3>Comments:</h3>
          <Comments resource_id={resource_id} currentUserId={currentUserId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <EditResource
        currentUserId={currentUserId ?? NaN}
        resource_id={resource_id}
        resource_data={resourceData}
        setResourceList={setResourceList}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
      />
    </div>
  );
}
