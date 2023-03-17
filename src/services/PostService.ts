import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPost} from "../models/IPost";


export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
  tagTypes: ['Post', 'Delete', 'Update'], // create tags
  endpoints: (build) => ({
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit:number = 5) => ({
        url: '/posts',
        params: {
          _limit: limit
        }
      }),
      providesTags: result => ['Post', 'Delete', 'Update'] // "Post" tag is provided
    }),
    createPost: build.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Post'] // "Post" tag is invalidated which means that all queries with "Post" tag will be refetched
    }),
    deletePost: build.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE',
        body: post
      }),
      invalidatesTags: ['Delete']
    }),
    updatePost: build.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: ['Update']
    })
  })
})
