const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = {
  async getPosts() {
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      const posts = await response.json();
      return {
        posts: Array.isArray(posts) ? posts : [],
        total: Array.isArray(posts) ? posts.length : 0,
      };
    } catch (error) {
      console.error("API Error:", error);
      return {
        posts: [],
        total: 0,
        error: `Error fetching posts: ${error}`,
      };
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
      throw error;
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

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async updatePost(id, postData) {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async deletePost(id) {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      return id; // Return the deleted post ID
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
