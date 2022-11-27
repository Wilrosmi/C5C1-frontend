import { IUserResponse } from "./types";
import { userHasLikedOrDisliked } from "./userHasLikedOrDisliked";

const templateUser: IUserResponse = {
  user_id: 1,
  name: "a",
  is_faculty: true,
};

test("Correctly recognises whether user has liked or disliked a resource", () => {
  expect(userHasLikedOrDisliked(undefined, [1, 2, 3])).toBe(false);
  expect(userHasLikedOrDisliked(templateUser, null)).toBe(false);
  expect(userHasLikedOrDisliked(undefined, null)).toBe(false);
  expect(userHasLikedOrDisliked(templateUser, [1, 2, 3])).toBe(true);
  expect(userHasLikedOrDisliked(templateUser, [2, 3])).toBe(false);
  expect(userHasLikedOrDisliked(templateUser, [])).toBe(false);
});
