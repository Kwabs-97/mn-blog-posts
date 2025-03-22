const API_BASE_URL = "http://localhost:3001";

export const api = {
  async getPosts(page = 1, limit = 10, search = "", category = "") {
    const queryParams = new URLSearchParams({
      _page: String(page),
      _limit: String(limit),
      ...(search && { q: search }),
      ...(category && { categories_like: category }),
    });

    const response = await fetch(`${API_BASE_URL}/posts?${queryParams}`);
    const total = response.headers.get("X-Total-Count");
    const posts = await response.json();

    const allPostsResponse = await fetch(`${API_BASE_URL}/posts`);
    const allPosts = await allPostsResponse.json();
    return { posts, total: allPosts.length };
  },

  async getPost(id) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error("Post not found");
    }
    return response.json();
  },

  async createPost(postData) {
    const post = {
      ...postData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    return response.json();
  },

  async updatePost(id, postData) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    return response.json();
  },

  async deletePost(id) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  },
};
