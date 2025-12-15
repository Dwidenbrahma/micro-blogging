import type { Post } from "../pages/Home";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber";

const EMOJIS = ["😀", "😎", "🤓", "🧑‍💻", "🚀", "🔥", "🦊", "🐼", "🐯", "🐸"];

const getEmojiAvatar = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash += seed.charCodeAt(i);
  }
  return EMOJIS[hash % EMOJIS.length];
};

interface PostCardProps {
  post: Post;
  showActions?: boolean;
  onDelete?: (id: string) => void;
}

const PostCard = ({ post, showActions = false, onDelete }: PostCardProps) => {
  const [hearts, setHearts] = useState<number>(post.hearts ?? 0);
  const [views, setViews] = useState<number>(post.views ?? 0);
  const [loading, setLoading] = useState(false);

  const avatar = getEmojiAvatar("anonymous");

  // 👁 Increment view (public)
  useEffect(() => {
    const incrementView = async () => {
      try {
        const res = await fetch(
          `http://localhost:4002/posts/${post._id}/view`,
          { method: "POST" }
        );

        if (res.ok) {
          const data = await res.json();
          setViews(data.views);
        }
      } catch (err) {
        console.error("View increment failed");
      }
    };

    incrementView();
  }, [post._id]);

  // ❤️ Like handler (auth required)
  const handleLike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to like");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:4002/posts/${post._id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "You already liked this post") {
          alert("❤️ You already liked this post");
          return;
        }
        throw new Error(data.message);
      }

      setHearts(data.hearts);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 border-2 border-purple-200 rounded-2xl p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-default">
      {/* 🔹 Author */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-lg hover:scale-110 transition-transform duration-300">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-purple-800">
            @{post.authorUsername || "anonymous"}
          </p>
          <p className="text-xs text-purple-600 font-medium uppercase tracking-wider">
            {post.type}
          </p>
        </div>
      </div>

      {/* 🔹 Title */}
      <h2 className="text-xl font-bold text-purple-900 mb-3 hover:text-purple-700 transition-colors duration-300">
        {post.title}
      </h2>

      {/* 🔹 Body */}
      <p className="text-purple-800/80 mb-4 leading-relaxed">
        {post.body.length > 200 ? post.body.slice(0, 200) + "..." : post.body}
      </p>

      {/* 🔹 Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-3 py-1 rounded-full font-medium border border-purple-200 hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 transition-all duration-300 hover:scale-110">
            #{tag}
          </span>
        ))}
      </div>

      {/* 🔹 Footer */}
      <div className="flex justify-between items-center text-sm border-t border-purple-100 pt-4">
        <div className="flex gap-5">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-purple-700 hover:text-red-500 hover:scale-110 transition-all duration-300 font-medium">
            ❤️ {formatNumber(hearts)}
          </button>
          <span className="text-purple-500 hover:text-purple-700 transition-colors">
            👁 {formatNumber(views)}
          </span>
        </div>

        {showActions && (
          <div className="flex gap-3">
            <Link
              to={`/edit-post/${post._id}`}
              className="px-3 py-1 rounded-lg text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-all duration-300 font-medium hover:scale-105">
              Edit
            </Link>
            <button
              onClick={() => onDelete?.(post._id)}
              className="px-3 py-1 rounded-lg text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all duration-300 font-medium hover:scale-105">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
