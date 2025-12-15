import { useEffect, useState } from "react";
import type { Post } from "./Home";
import PostCard from "../components/PostCard";

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:4002/posts/my-posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  // handle delete

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const ok = confirm("Are you sure you want to delete this post?");
    if (!ok) return;

    await fetch(`http://localhost:4002/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  if (loading) {
    return <p className="text-center mt-10">Loading your posts...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">My Dashboard</h1>

      {posts.length === 0 && (
        <p className="text-gray-500">You haven’t created any posts yet.</p>
      )}

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          showActions
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Dashboard;
