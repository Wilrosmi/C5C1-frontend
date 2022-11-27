import axios from "axios";
import { baseUrl } from "./baseUrl";

export default async function getStudylistFromServer(
  newUserID: number | undefined,
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>
): Promise<void> {
  if (newUserID) {
    try {
      const studylistResponse = await axios.get(
        `${baseUrl}/users/${newUserID}/study-list`
      );
      const justNumbersStudylist: number[] = studylistResponse.data.map(
        (listItem: { resource_id: number }) => listItem.resource_id
      );
      setUserStudylist(justNumbersStudylist);
    } catch (error) {
      console.error(error);
    }
  }
}
