import axios from "axios";
import { IResourceResponse } from "./types";
import { baseUrl } from "./baseUrl";

export default async function getResourcesFromServer(
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>
): Promise<void> {
  const serverResponse: IResourceResponse[] = (
    await axios.get(`${baseUrl}/resources`)
  ).data;
  setResourceList(serverResponse);
}
