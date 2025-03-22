const BASE_URL = 'http://localhost:3001'

export const api = {
    async getPosts(page=1, limit=10, search='', category='') {
        const query = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(search && { search }),
            ...(category && { category }),
        });
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
    }
}

