import { IResourceRequest } from "./types";

export function inputsValid(resourceData: IResourceRequest): boolean {
  if (resourceData.resource_name === "") {
    alert("You need to enter a resource name");
    return false;
  } else if (resourceData.author_name === "") {
    alert("You need to enter an author name");
    return false;
  } else if (resourceData.url === "") {
    alert("You need to add a URL to your resource");
    return false;
  } else if (resourceData.content_type === "") {
    alert("You need to enter a content type");
    return false;
  } else if (resourceData.description === "") {
    alert("You need to write a description");
    return false;
  } else if (resourceData.opinion === "") {
    alert("You need to select an opinion");
    return false;
  } else if (resourceData.opinion_reason === "") {
    alert("You need to give a reason for your opinion");
    return false;
  } else if (resourceData.build_stage === "") {
    alert("You need to select a stage");
    return false;
  }
  return true;
}
