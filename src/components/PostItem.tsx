import React, {FC} from 'react';
import {IPost} from "../models/IPost";
import {postAPI} from "../services/PostService";

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({post, remove, update}) => {

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    remove(post);
  }

  const handleUpdate = (event: React.MouseEvent<HTMLDivElement>) => {
    const title = prompt("New title: ") || ""
    update({...post, title});
  }

  return (
    <div className="post" onClick={handleUpdate}>
      {post.id}. {post.title}
      <hr />
      {post.body}
      <button onClick={handleRemove}>Delete</button>
    </div>
  );
};

export default PostItem;