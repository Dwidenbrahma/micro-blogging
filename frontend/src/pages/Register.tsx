import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:4001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // 🔥 AUTO-LOGIN
      localStorage.setItem("token", data.token);

      // 🔁 Redirect to Home
      navigate("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-5 border rounded">
      <h2 className="text-xl font-semibold mb-4">Register</h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded">
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      {message && <p className="mt-3 text-red-500">{message}</p>}
    </div>
  );
};

export default Register;
