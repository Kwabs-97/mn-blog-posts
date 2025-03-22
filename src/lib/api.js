const BASE_URL = 'http://localhost:3001'

export const api = {
    async getPosts() {
        const response = await fetch(`${BASE_URL}/posts`)
        return response.json()
    },
//     async createPost(post) {
//         const response = await fetch(`${BASE_URL}/posts`, { method: 'POST', body: JSON.stringify(post) })
//         return response.json()
// }
};