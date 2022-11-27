import moment from "moment";
import { useNavigate } from "react-router-dom";
import selectRandElement from "../../utils/selectRandElement";
import { IResourceResponse } from "../../utils/types";
import "./ResourceCard.scss";

interface IProps {
  resourceData: IResourceResponse;
}

export default function ResourceCard({ resourceData }: IProps): JSX.Element {
  const navigate = useNavigate();

  const { resource_id, resource_name, author_name, user_name, url, time_date } =
    resourceData;

  //TODO: Change author_name to just author
  //TODO: Set this as a property of the resource when fetching so doesnt change on refresh page
  const backgroundImage = selectRandElement([
    "semi_circles.png",
    "rects.png",
    "two_curved_rects.png",
    "circles.png",
  ]);

  return (
    // TODO: OnClick navigate to resource page
    <div
      className="resource_card"
      onClick={() => navigate(`/resource/${resource_id}`)}
      style={{ backgroundImage: `url(/img/${backgroundImage})` }}
    >
      <div className="card_details">
        <h2>
          <img
            className="link"
            src="./img/link.svg"
            onClick={() => window.open(url, "_blank")}
            alt="link to resource"
          />
          {resource_name}
        </h2>
        <p>by {author_name}</p>

        {/* TODO: Convert this to a traffic light system */}
        {/* <p>{opinion}</p> */}
        <div className="added_details">
          <p>{user_name}</p>
          <p>created {moment(time_date).format("Do MMM YYYY")}</p>
        </div>
      </div>
    </div>
    // TODO: Add to study list button/ swipe?
  );
}
