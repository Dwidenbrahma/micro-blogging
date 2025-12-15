import { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState<"blog" | "article">("blog");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      setMessage("❌ Title and body are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ You are not logged in");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:4002/posts/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          tags: tags
            ? tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
          type,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      setMessage("✅ Post created successfully");
      setTitle("");
      setBody("");
      setTags("");
      setType("blog");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setMessage("❌ " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-purple-200">
        <h2 className="text-2xl font-semibold text-purple-900 mb-6 text-center">
          📝 Create Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border-2 border-purple-200 px-4 py-3 text-purple-900 bg-purple-50/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white transition-all duration-300 placeholder-purple-400"
          />

          <textarea
            placeholder="Write your post..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="w-full rounded-xl border-2 border-purple-200 px-4 py-3 text-purple-900 bg-purple-50/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white transition-all duration-300 resize-none placeholder-purple-400"
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-xl border-2 border-purple-200 px-4 py-3 text-purple-900 bg-purple-50/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white transition-all duration-300 placeholder-purple-400"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as "blog" | "article")}
            className="w-full rounded-xl border-2 border-purple-200 px-4 py-3 bg-purple-50/50 text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white transition-all duration-300">
            <option value="blog">Blog</option>
            <option value="article">Article</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-purple-400 to-pink-300 text-purple-900 py-3 font-semibold hover:from-purple-500 hover:to-pink-400 hover:shadow-lg hover:shadow-purple-300/50 transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
            {loading ? "Posting..." : "Create Post"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.startsWith("✅") ? "text-green-700" : "text-rose-700"
            }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
