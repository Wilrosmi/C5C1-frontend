import { filterBySearchTags } from "./filterBySearchTags";
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
  tag_array: ["a", "b"],
  num_likes: 1,
  num_dislikes: 1,
  liking_users_array: [1],
  disliking_users_array: [2],
};

test("Correctly filters in/out depending on whether resource has specific search tags", () => {
  expect(filterBySearchTags(["a"], templateResOne)).toBe(true);
  expect(filterBySearchTags(["a", "b"], templateResOne)).toBe(true);
  expect(filterBySearchTags(["a", "b", "c"], templateResOne)).toBe(false);
  expect(filterBySearchTags(["c"], templateResOne)).toBe(false);
});
