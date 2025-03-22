const BASE_URL = "http://localhost:3001";

export const api = {
  async getPosts(page = 1, limit = 10, search = "") {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    console.log("Fetching posts with query:", query.toString());
    try {
      // First get total count
      const totalResponse = await fetch(`${BASE_URL}/posts`);
      const allPosts = await totalResponse.json();
      const total = Array.isArray(allPosts) ? allPosts.length : 0;

      // Then get paginated posts
      const response = await fetch(`${BASE_URL}/posts?${query.toString()}`);
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("API Response:", data);

      // If the API returns an array, slice it for pagination
      if (Array.isArray(data)) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPosts = data.slice(startIndex, endIndex);

        return {
          posts: paginatedPosts,
          total: total,
        };
      }

      // If the API returns an object with posts and total
      return {
        posts: data.posts || [],
        total: total,
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
