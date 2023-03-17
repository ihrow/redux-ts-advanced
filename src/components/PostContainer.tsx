import React from 'react';
import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
  const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(10) // polling interval is available too
  const [createPost, {}] = postAPI.useCreatePostMutation()
  const [deletePost, {}] = postAPI.useDeletePostMutation()
  const [updatePost, {}] = postAPI.useUpdatePostMutation()
  const handleCreate = async () => {
    const title = prompt("Enter title: ")
    const body = prompt("Enter body: ")
    await createPost({title, body} as IPost)
  }

  const handleRemove = (post: IPost) => {
    deletePost(post)
  }

  const handleUpdate = (post: IPost) => {
    updatePost(post)
  }

  return (
    <div>
      <div>
        <button onClick={handleCreate}>Add new post!</button>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
        {posts && posts.map((post) =>
          <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
        )}
      </div>
    </div>
  );
};

export default PostContainer;