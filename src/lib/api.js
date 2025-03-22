const BASE_URL = 'http://localhost:3001'

export const api = {
    async getPosts(page=1, limit=10, search='', category='') {
        const query = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(search && { search }),
            ...(category && { category }),
        });

        console.log(query.toString())
        try {      
            const allPostsResponse = await fetch(`${BASE_URL}/posts`);
            const allPosts = await allPostsResponse.json();
            
            const response = await fetch(`${BASE_URL}/posts?${query.toString()}`);
            const posts = await response.json();
    
            return { 
                posts, 
                total: allPosts.length || 10
            };
        } catch (error) {
         console.log(error)   
         return `Error fetching posts: ${error}`
        }
    },

    async getPost(id){
        try {
            const response = await fetch(`${BASE_URL}/posts/${id}`);
            if (!response.ok) {
                throw new Error('Post not found');
            }
            const post = await response.json();
            return post;
        } catch (error) {
            console.log(error)   
            return `Error fetching posts: ${error}` 
        }
    },

    async createPost(post){

        const posts = {
            ...post,
            id: Date.now(),
            createdAt: new Date().toISOString(),
        }
        try {
            const response = await fetch(`${BASE_URL}/posts`,{
                method: "POST",
                headers:{
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(posts)

            })
            return response;
        } catch (error) {
            console.log(error)   
            return `Error creating post: ${error}` 
        }
    },
    async updatePost(id, postData){
        try {       
            const response = await fetch(`${BASE_URL}/posts/${id}`,{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            return response;
        } catch (error) {
            console.log(error)   
            return `Error updating post: ${error}` 
        }
    },
    async deletePost(id){
        try {
            const response = await fetch(`${BASE_URL}/posts/${id}`,{
                method:"DELETE"
            })
        } catch (error) {
            console.log(error)   
            return `Error deleting post` 
        }
    }
}

