import { IUserResponse } from "./types";

export function userHasLikedOrDisliked(
  currentUser: IUserResponse | undefined,
  likingOrDislikingUsers: number[] | null
): boolean {
  if (currentUser === undefined || likingOrDislikingUsers === null) {
    return false;
  }

  return likingOrDislikingUsers.includes(currentUser.user_id);
}
