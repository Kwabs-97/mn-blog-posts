const BASE_URL = "http://localhost:5000";

export const api = {
  async getPosts(page, limit, category, search) {
    console.log(page)
    try {
      const response = await fetch(`${BASE_URL}/posts/?page=${page}&limit=${limit}&search=${search}&category=${category}`);
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error("API Error:", error);
      return {
        posts: [],
        total: 0,
        error: `Error fetching posts: ${error}`,
      };
    }
  },

  async getPost(_id) {
    try {
      const response = await fetch(`${BASE_URL}/post/${_id}`);
      if (!response.ok) {
        throw new Error("Post not found");
      }
      return await response.json(); 
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async createPost(post) {
    const posts = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch(`${BASE_URL}/new-post`, {
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
