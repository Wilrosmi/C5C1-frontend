import filterBySearchTerm from "./filterBySearchTerm";
import { IResourceResponse } from "./types";

const templateResOne: IResourceResponse = {
  resource_name: "dogs dogs dogs",
  author_name: "qwerty and",
  url: "a",
  description: "abc",
  content_type: "a",
  build_stage: "a",
  opinion: "a",
  opinion_reason: "a",
  user_id: 1,
  resource_id: 1,
  time_date: "a",
  user_name: "a",
  tag_array: ["hello there", "b"],
  num_likes: 1,
  num_dislikes: 1,
  liking_users_array: [1],
  disliking_users_array: [2],
};

test("Correctly filters in/out based on description", () => {
  expect(filterBySearchTerm("abc", templateResOne)).toBe(true);
  expect(filterBySearchTerm("abcd", templateResOne)).toBe(false);
});

test("Correctly filters in/out based on author_name", () => {
  expect(filterBySearchTerm("qwerty", templateResOne)).toBe(true);
  expect(filterBySearchTerm("qwertyu", templateResOne)).toBe(false);
});

test("Correctly filters in/out based on resource_name", () => {
  expect(filterBySearchTerm("dogs", templateResOne)).toBe(true);
  expect(filterBySearchTerm("cats", templateResOne)).toBe(false);
});

test("Correctly filters in/out based on tag_array", () => {
  expect(filterBySearchTerm("hello", templateResOne)).toBe(true);
  expect(filterBySearchTerm("goodbye", templateResOne)).toBe(false);
});
