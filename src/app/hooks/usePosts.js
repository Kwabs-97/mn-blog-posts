import { useQuery, useMutation, useQueryClient, useQueryClient, QueryClient } from "@tanstack/react-query";
import { useAppDispatch} from "@/app/hooks/useAppDispatch";
import { api } from "@/lib/api";
import { addPost, updatePost as updatePostAction, deletePost as deletePostAction } from "../../../store/postSlice";



export function usePosts(){
    return useQuery({
        queryKey:['posts', page, limit, search, category],
        queryFn: () => api.getPosts(page, limit, search, category)
    });

    
}

export function usePost(id){

    return useQuery({
        queryKey: ['post',id],
        queryFn: () => api.getPost(id),
        enabled: !!id
    })
}

export function useCreatePost(){
    const useQueryClient = useQueryClient();
    const dispatch = useAppDispatch();
    return useMutation({
        mutationFn:(postData) => api.createPost(postData),
        onSuccess: (newPost) => {
            dispatch(addPost(newPost))
            QueryClient.invalidateQueries({queryKey:['posts']})
        }
    })
}

export function useUpdatePost(){
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    return useMutation({
        mutationFn: (id, postData) => api.updatePost(id,postData),
        onSuccess: (updatedPost) => {
            dispatch(updatePostAction(updatedPost)),
            queryClient.invalidateQueries({queryKey:['posts']}),
            queryClient.invalidateQueries({queryKey:['post', updatedPost.id]})
        } 
    })
     
    
}

export function useDeletePost(){
    const queryClient=useQueryClient();
    const dispatch= useAppDispatch();
    return useMutation({
        mutationFn: (id) => api.deletePost(id),
        onSuccess: (_,id) => {
            dispatch(deletePostAction(id)),
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        } 
    })
}
