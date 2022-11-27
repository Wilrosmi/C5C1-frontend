import { IResourceResponse } from "./types";

export default function filterByListMode(
  listMode: "study list" | "resource list",
  userStudylist: number[] | null,
  resource: IResourceResponse
): boolean {
  if (listMode === "study list" && userStudylist) {
    if (userStudylist.includes(resource.resource_id)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
