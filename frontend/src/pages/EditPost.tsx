import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState<"blog" | "article">("blog");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchPost = async () => {
      const res = await fetch(`http://localhost:4002/posts/my-post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Post not found");
      }

      const data = await res.json();
      const post = data.data;

      setTitle(post.title ?? "");
      setBody(post.body ?? "");
      setTags(Array.isArray(post.tags) ? post.tags.join(", ") : "");
      setType(post.type === "article" ? "article" : "blog");
    };

    fetchPost().catch(console.error);
  }, [id, token]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    await fetch(`http://localhost:4002/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
        tags: tags.split(",").map((t) => t.trim()),
        type,
      }),
    });

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Edit Post</h2>

      <form onSubmit={handleUpdate} className="flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          className="border p-2 rounded"
        />

        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tags (comma separated)"
          className="border p-2 rounded"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="border p-2 rounded">
          <option value="blog">Blog</option>
          <option value="article">Article</option>
        </select>

        <button disabled={loading} className="bg-black text-white py-2 rounded">
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
