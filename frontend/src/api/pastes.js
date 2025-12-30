const API_BASE = import.meta.env.VITE_API_BASE;

export async function createPaste(body) {
  const res = await fetch(`${API_BASE}/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function getPaste(id) {
  const res = await fetch(`${API_BASE}/pastes/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Not found");
  return res.json();
}
