import { IResourceResponse } from "./types";

export default function filterBySearchTerm(
  searchTerm: string,
  resource: IResourceResponse
): boolean {
  const { description, author_name, resource_name, tag_array } = resource; // Include tags
  if (
    description.includes(searchTerm) ||
    author_name.includes(searchTerm) ||
    resource_name.includes(searchTerm) ||
    tag_array.some((tag) => tag.includes(searchTerm))
  ) {
    return true;
  } else {
    return false;
  }
}
