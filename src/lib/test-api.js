import { api } from './api.js';

async function testApi() {
    try {
        const result = await api.getPosts(1, 5);
        console.log('Posts:', result.posts);
        console.log('Total:', result.total);
    } catch (error) {
        console.error('Error:', error);
    }
}

testApi(); 