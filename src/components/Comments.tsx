import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { baseUrl } from "../utils/baseUrl";
import { ICommentResponse } from "../utils/types";

interface IProps {
  resource_id: number;
  currentUserId: number | undefined;
}

export default function Comments({
  resource_id,
  currentUserId,
}: IProps): JSX.Element {
  const [comments, setComments] = useState<ICommentResponse[]>([]);
  const [commentInput, setCommentInput] = useState<string>("");
  const [idOfCommentToEdit, setIdOfCommentToEdit] = useState<number>(NaN); // Equal to NaN when not editing a comment, else equal to id of comment being edited
  const [editCommentInput, setEditCommentInput] = useState<string>("");

  const getComments = useCallback(async () => {
    try {
      const serverResponse: ICommentResponse[] = (
        await axios.get(`${baseUrl}/resources/${resource_id}/comments`)
      ).data;
      setComments(serverResponse);
    } catch (error) {
      console.error(error);
    }
  }, [resource_id]);

  useEffect(() => {
    getComments();
  }, [resource_id, getComments]);

  async function submitComment(): Promise<void> {
    try {
      await axios.post(`${baseUrl}/resources/${resource_id}/comments`, {
        comment_body: commentInput,
        user_id: currentUserId,
      });
      getComments();
      setCommentInput("");
    } catch (error) {
      console.error(error);
    }
  }

  function handleKeyDown(key: string): void {
    if (key === "Enter") {
      submitComment();
    }
  }

  async function handleDeleteComment(comment_id: number): Promise<void> {
    try {
      await axios.delete(`${baseUrl}/resources/comments/${comment_id}`);
      getComments();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditCommentClick(comment: ICommentResponse): void {
    const { comment_id, comment_body } = comment;
    setIdOfCommentToEdit(comment_id);
    setEditCommentInput(comment_body);
  }

  async function handleSubmitEdit(): Promise<void> {
    try {
      await axios.put(`${baseUrl}/resources/comments/${idOfCommentToEdit}`, {
        comment_body: editCommentInput,
      });
      getComments();
      setIdOfCommentToEdit(NaN);
      setEditCommentInput("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {currentUserId && (
        <div>
          <input
            id="comment-input"
            onKeyDown={(e) => handleKeyDown(e.key)}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={submitComment}>Add comment</button>
        </div>
      )}
      {comments.map((comment) => {
        const { comment_body, comment_id, user_name, user_id } = comment;
        return (
          <div key={comment_id}>
            <h4>{user_name}</h4>
            {idOfCommentToEdit === comment_id ? (
              <div>
                <input
                  value={editCommentInput}
                  onChange={(e) => setEditCommentInput(e.target.value)}
                />
                <button onClick={handleSubmitEdit}>Submit</button>
              </div>
            ) : (
              <div>
                <p>{comment_body}</p>
                <button
                  disabled={currentUserId !== user_id}
                  onClick={() => handleEditCommentClick(comment)}
                >
                  Edit
                </button>
              </div>
            )}

            <button
              disabled={currentUserId !== user_id}
              onClick={() => handleDeleteComment(comment_id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
