import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { useAppDispatch } from "./useAppDispatch";
import { api } from "@/lib/api";
import {
  addPost,
  updatePost as updatePostAction,
  deletePost as deletePostAction,
} from "../../store/postSlice";

export function usePosts(page, limit, category, search) {
  return useQuery({
    queryKey: ["posts", page, limit, category, search],
    queryFn: () => api.getPosts(page, limit, category, search),
  });
}

export function usePost(_id) { // Reverted id to _id
  return useQuery({
    queryKey: ["post", _id], // Reverted id to _id
    queryFn: () => api.getPost(_id), // Reverted id to _id
    enabled: !!_id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (postData) => api.createPost(postData),
    onSuccess: (newPost) => {
      dispatch(addPost(newPost));
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      throw error;
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (postData) => api.updatePost(postData.id, postData.data),
    onSuccess: (updatedPost) => {
      dispatch(updatePostAction(updatedPost));
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", updatedPost.id] });
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      throw error;
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (id) => api.deletePost(id),
    onSuccess: (_, id) => {
      dispatch(deletePostAction(id));
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      throw error;
    },
  });
}
