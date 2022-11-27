export interface IResourceRequest {
  resource_name: string;
  author_name: string;
  url: string;
  description: string;
  content_type: string;
  build_stage: string;
  opinion: string;
  opinion_reason: string;
  user_id: number | undefined;
}

export interface IResourceResponse extends IResourceRequest {
  resource_id: number;
  time_date: string;
  user_name: string;
  tag_array: string[];
  num_likes: number;
  num_dislikes: number;
  liking_users_array: null | number[];
  disliking_users_array: null | number[];
}

export interface ICommentResponse {
  comment_id: number;
  resource_id: number;
  comment_body: string;
  user_id: number;
  user_name: string;
}

export interface MainComponentProps {
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export interface IUserResponse {
  user_id: number;
  name: string;
  is_faculty: boolean;
}
