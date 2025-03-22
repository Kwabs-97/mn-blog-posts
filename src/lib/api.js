const BASE_URL = "http://localhost:3001";

export const api = {
  async getPosts(page = 1, limit = 10, search = "") {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    console.log(query.toString());
    try {
      const response = await fetch(`${BASE_URL}/posts?${query.toString()}`);
      const data = await response.json();

      // Get total count from the response headers or use the length of the response
      const total = data.length || 0;

      return {
        posts: data,
        total,
      };
    } catch (error) {
      console.log(error);
      return `Error fetching posts: ${error}`;
    }
  },

  async getPost(id) {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`);
      if (!response.ok) {
        throw new Error("Post not found");
      }
      const post = await response.json();
      return post;
    } catch (error) {
      console.log(error);
      return `Error fetching posts: ${error}`;
    }
  },

  async createPost(post) {
    const posts = {
      ...post,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(posts),
      });
      return response;
    } catch (error) {
      console.log(error);
      return `Error creating post: ${error}`;
    }
  },
  async updatePost(id, postData) {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      return response;
    } catch (error) {
      console.log(error);
      return `Error updating post: ${error}`;
    }
  },
  async deletePost(id) {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
      return `Error deleting post`;
    }
  },
};
