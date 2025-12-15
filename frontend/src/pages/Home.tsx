import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export interface Post {
  _id: string;
  authorUsername: string;
  title: string;
  body: string;
  tags: string[];
  type: "blog" | "article";
  hearts: number;
  views: number;
  createdAt: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4002/posts/allPost")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading posts...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      {posts.length === 0 && (
        <p className="text-center text-gray-500">No posts yet</p>
      )}

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
