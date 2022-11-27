import filterByListMode from "./filterByListMode";
import { IResourceResponse } from "./types";

const templateResOne: IResourceResponse = {
  resource_name: "a",
  author_name: "a",
  url: "a",
  description: "a",
  content_type: "a",
  build_stage: "a",
  opinion: "a",
  opinion_reason: "a",
  user_id: 1,
  resource_id: 1,
  time_date: "a",
  user_name: "a",
  tag_array: ["a"],
  num_likes: 1,
  num_dislikes: 1,
  liking_users_array: [1],
  disliking_users_array: [2],
};

const templateResTwo: IResourceResponse = {
  resource_name: "a",
  author_name: "a",
  url: "a",
  description: "a",
  content_type: "a",
  build_stage: "a",
  opinion: "a",
  opinion_reason: "a",
  user_id: 1,
  resource_id: 2,
  time_date: "a",
  user_name: "a",
  tag_array: ["a"],
  num_likes: 1,
  num_dislikes: 1,
  liking_users_array: [1],
  disliking_users_array: [2],
};

test("Correctly filters in/out resources if listMode is resource list", () => {
  expect(filterByListMode("resource list", [1, 3], templateResOne)).toBe(true);
  expect(filterByListMode("resource list", [1, 3], templateResTwo)).toBe(true);
});

test("Correctly filters in/out resources if listMode is study list", () => {
  expect(filterByListMode("study list", [1, 3], templateResOne)).toBe(true);
  expect(filterByListMode("study list", [1, 3], templateResTwo)).toBe(false);
});
