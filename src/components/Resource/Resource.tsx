import { IResourceResponse } from "../../utils/types";
import ResourceCard from "./ResourceCard";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import Comments from "./Comments";
import { IUserResponse } from "../../utils/types";
import LikeResource from "./LikeResource";
import getStudylistFromServer from "../../utils/getStudylistFromServer";
import getResourcesFromServer from "../../utils/getResourcesFromServer";
import EditResource from "./EditResource";
import "./Resource.scss";

interface IProps {
  resourceData: IResourceResponse;
  currentUser: IUserResponse | undefined;
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  userStudylist: number[] | null;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
  opinions: {
    opinion: string;
  }[];
  buildStageNames: {
    stage_name: string;
  }[];
}

export default function Resource({
  resourceData,
  currentUser,
  setResourceList,
  userStudylist,
  setUserStudylist,
  opinions,
  buildStageNames,
}: IProps): JSX.Element {
  const [showResource, setShowResource] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const currentUserId = currentUser ? currentUser.user_id : undefined;

  const handleClose = () => setShowResource(false);
  const {
    resource_name,
    author_name,
    url,
    time_date,
    description,
    build_stage,
    opinion_reason,
    user_name,
    resource_id,
    tag_array,
    user_id,
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
      <ResourceCard
        setShowResource={setShowResource}
        resourceData={resourceData}
      />

      <Modal show={showResource} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{resource_name}{author_name}{url}{time_date}</p>
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
            {tag_array.length > 0 &&
              tag_array.map((tag, i) => (
                <button className="tag" key={i}>
                  {tag}
                </button>
              ))}
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              setShowEdit(true);
              setShowResource(false);
            }}
            disabled={currentUserId !== user_id}
          >
            Edit Resource
          </Button>
          <Button variant="outline-secondary" onClick={handleDelete}>
            Delete Resource
          </Button>
          {userStudylist && userStudylist.includes(resource_id) ? (
            <Button onClick={removeFromStudyList}>
              Remove from study list
            </Button>
          ) : (
            <Button
              onClick={addToStudyList}
              disabled={currentUser === undefined}
            >
              Add to study list
            </Button>
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
        opinions={opinions}
        buildStageNames={buildStageNames}
      />
    </div>
  );
}
