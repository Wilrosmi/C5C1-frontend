import axios from "axios";
import { IUserResponse } from "../utils/types";
import { baseUrl } from "./baseUrl";
import getResourcesFromServer from "./getResourcesFromServer";
import { IResourceResponse } from "./types";

export async function handleLikeButtons(
  like_or_dislike: string,
  likedStatus: "has liked" | "has disliked" | null,
  resource_id: number,
  currentUser: IUserResponse | undefined,
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>
): Promise<void> {
  if (currentUser === undefined) {
    return;
  }

  const isDeletingLike: boolean =
    like_or_dislike === "like" && likedStatus === "has liked";

  const isDeletingDislike: boolean =
    like_or_dislike === "dislike" && likedStatus === "has disliked";

  if (isDeletingLike || isDeletingDislike) {
    try {
      await axios.delete(
        baseUrl + `/resources/${resource_id}/${currentUser.user_id}/likes`
      );
      await getResourcesFromServer(setResourceList);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  try {
    await axios.post(baseUrl + `/resources/${resource_id}/likes`, {
      user_id: currentUser.user_id,
      like_or_dislike: like_or_dislike,
    });
    await getResourcesFromServer(setResourceList);
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
