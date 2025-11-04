// Posts service using localStorage
const POSTS_KEY = "mket_posts";

class PostsService {
  // Get all posts from localStorage
  getAllPosts() {
    const posts = localStorage.getItem(POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  }

  // Save posts to localStorage
  savePosts(posts) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }

  // Get posts by user ID
  getPostsByUser(userId) {
    const allPosts = this.getAllPosts();
    return allPosts.filter((post) => post.userId === userId);
  }

  // Get a single post by ID
  getPostById(postId) {
    const allPosts = this.getAllPosts();
    return allPosts.find((post) => post.id === postId);
  }

  // Create a new post
  createPost(postData, userId) {
    try {
      const allPosts = this.getAllPosts();

      // Create new post object
      const newPost = {
        id: Date.now().toString(),
        userId: userId,
        title: postData.title,
        description: postData.description,
        price: parseFloat(postData.price),
        category: postData.category,
        condition: postData.condition,
        location: postData.location,
        images: postData.images || [],
        contactPhone: postData.contactPhone || "",
        contactEmail: postData.contactEmail || "",
        status: "active", // active, sold, deleted
        views: 0,
        wishlistCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to posts array
      allPosts.push(newPost);
      this.savePosts(allPosts);

      return {
        success: true,
        message: "Item posted successfully!",
        post: newPost,
      };
    } catch (error) {
      console.error("Error creating post:", error);
      return {
        success: false,
        message: "Failed to create post. Please try again.",
      };
    }
  }

  // Update a post
  updatePost(postId, updatedData) {
    try {
      const allPosts = this.getAllPosts();
      const postIndex = allPosts.findIndex((post) => post.id === postId);

      if (postIndex === -1) {
        return {
          success: false,
          message: "Post not found",
        };
      }

      // Update post
      allPosts[postIndex] = {
        ...allPosts[postIndex],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      this.savePosts(allPosts);

      return {
        success: true,
        message: "Post updated successfully!",
        post: allPosts[postIndex],
      };
    } catch (error) {
      console.error("Error updating post:", error);
      return {
        success: false,
        message: "Failed to update post",
      };
    }
  }

  // Delete a post
  deletePost(postId) {
    try {
      const allPosts = this.getAllPosts();
      const filteredPosts = allPosts.filter((post) => post.id !== postId);

      this.savePosts(filteredPosts);

      return {
        success: true,
        message: "Post deleted successfully!",
      };
    } catch (error) {
      console.error("Error deleting post:", error);
      return {
        success: false,
        message: "Failed to delete post",
      };
    }
  }

  // Mark post as sold
  markAsSold(postId) {
    return this.updatePost(postId, { status: "sold" });
  }

  // Increment view count
  incrementViews(postId) {
    const allPosts = this.getAllPosts();
    const postIndex = allPosts.findIndex((post) => post.id === postId);

    if (postIndex !== -1) {
      allPosts[postIndex].views = (allPosts[postIndex].views || 0) + 1;
      this.savePosts(allPosts);
    }
  }

  // Clear all posts (for testing)
  clearAllPosts() {
    localStorage.removeItem(POSTS_KEY);
  }
}

export default new PostsService();
