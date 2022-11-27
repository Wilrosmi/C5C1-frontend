import { useEffect, useState } from "react";
import { handleLikeButtons } from "../../utils/likeButtons";
import { userHasLikedOrDisliked } from "../../utils/userHasLikedOrDisliked";
import { IResourceResponse } from "../../utils/types";
import { IUserResponse } from "../../utils/types";

interface IProps {
  currentUser: IUserResponse | undefined;
  resourceData: IResourceResponse;
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

//TODO: Update likes without setResourceList?
export default function Likes({
  currentUser,
  resourceData,
  setResourceList,
}: IProps): JSX.Element {
  const {
    user_id,
    resource_id,
    num_likes,
    num_dislikes,
    liking_users_array,
    disliking_users_array,
  } = resourceData;

  const [likedStatus, setLikedStatus] = useState<
    "has liked" | "has disliked" | null
  >(null);

  useEffect(() => {
    if (userHasLikedOrDisliked(currentUser, liking_users_array)) {
      setLikedStatus("has liked");
    } else if (userHasLikedOrDisliked(currentUser, disliking_users_array)) {
      setLikedStatus("has disliked");
    } else {
      setLikedStatus(null);
    }
  }, [currentUser, liking_users_array, disliking_users_array]);

  // TODO: Change appearance of buttons when they have been clicked
  //Use the filled in thumbs instead of the outlines for when have been clicked?
  return (
    <div className="likes">
      <div className="like_count">
        <button
          type="button"
          className="like-button"
          onClick={() =>
            handleLikeButtons(
              "like",
              likedStatus,
              resource_id,
              currentUser,
              setResourceList
            )
          }
          disabled={user_id === undefined}
        >
          <img src="/img/thumb-up.svg" alt="like button" />
        </button>
        <p>{num_likes}</p>
      </div>

      <div className="like_count">
        <button
          className="dislike-button"
          type="button"
          onClick={() =>
            handleLikeButtons(
              "dislike",
              likedStatus,
              resource_id,
              currentUser,

              setResourceList
            )
          }
          disabled={user_id === undefined}
        >
          <img src="/img/thumb-down.svg" alt="dislike button" />
        </button>
        <p>{num_dislikes}</p>
      </div>
    </div>
  );
}
