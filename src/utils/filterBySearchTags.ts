import { IResourceResponse } from "./types";

export function filterBySearchTags(
  searchTags: string[],
  resource: IResourceResponse
): boolean {
  for (const tag of searchTags) {
    if (!resource.tag_array.includes(tag)) {
      return false;
    }
  }
  return true;
}
