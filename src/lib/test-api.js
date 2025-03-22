import { api } from './api.js';

async function testApi() {
    try {
        // const result = await api.getPosts(1, 5);
        // console.log('Posts:', result.posts);
        // console.log('Total:', result.total);
        const result = await api.getPost(1);
        console.log('Post:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

testApi(); 