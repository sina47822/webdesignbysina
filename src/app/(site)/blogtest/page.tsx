"use client";

import React, { JSX, useEffect, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ?? "";

type CodeBlockPayload = {
  language?: string | null;
  filename?: string | null;
  caption?: string | null;
  content?: string | null;
  order?: number;
};

type CalloutPayload = {
  type?: "info" | "warning" | "tip" | "danger";
  content?: string | null;
  order?: number;
};

type SectionPayload = {
  [x: string]: any;
  id?: string | null; // section_id from backend or generated client-side
  title?: string | null;
  level?: number;
  bodyMd?: string | null;
  order?: number;
  code?: CodeBlockPayload | null;
  callout?: CalloutPayload | null;
  extras?: Record<string, any> | null;
};

type PostListItem = {
  id: number;
  title: string;
  slug: string;
  draft: boolean;
  date_published?: string | null;
};

type PostDetail = {
  id?: number;
  title: string;
  slug: string;
  description?: string | null;
  draft: boolean;
  canonical?: string | null;
  categories?: string[]; // sending as slugs
  tags?: string[]; // slugs
  sections?: SectionPayload[];
  cover?: string | null; // URL
  date_published?: string | null;
  last_modified?: string | null;
};

function apiUrl(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function defaultEmptyPost(): PostDetail {
  return {
    title: "",
    slug: "",
    description: "",
    draft: true,
    canonical: "",
    categories: [],
    tags: [],
    sections: [],
  };
}

/* SectionsEditor component (typed) */
function SectionsEditor({
  sections,
  onChange,
}: {
  sections: SectionPayload[];
  onChange: (next: SectionPayload[]) => void;
}) {
  const updateAt = (idx: number, patch: Partial<SectionPayload>) => {
    const copy = [...sections];
    copy[idx] = { ...copy[idx], ...patch };
    onChange(copy);
  };
  const addSection = () => {
    onChange([
      ...sections,
      {
        id: `s-${Date.now()}`,
        title: "",
        level: 2,
        bodyMd: "",
        order: sections.length,
        code: null,
        callout: null,
      },
    ]);
  };
  const removeAt = (idx: number) => onChange(sections.filter((_, i) => i !== idx));
  return (
    <div>
      <div style={{ marginBottom: 8, display: "flex", gap: 8 }}>
        <button type="button" onClick={addSection} style={{ padding: "6px 10px" }}>
          افزودن بخش
        </button>
      </div>
      {sections.map((s, idx) => (
        <div key={s.id || idx} style={{ marginBottom: 12, padding: 12, border: "1px solid #ddd" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <input
              style={{ flex: 1, padding: 6 }}
              placeholder="عنوان بخش"
              value={s.title ?? ""}
              onChange={(e) => updateAt(idx, { title: e.target.value })}
            />
            <select
              value={s.level ?? 2}
              onChange={(e) => updateAt(idx, { level: Number(e.target.value) })}
            >
              <option value={2}>h2</option>
              <option value={3}>h3</option>
              <option value={4}>h4</option>
            </select>
            <button type="button" onClick={() => removeAt(idx)} style={{ padding: "6px 8px" }}>
              حذف
            </button>
          </div>

          <textarea
            rows={4}
            style={{ width: "100%", marginBottom: 8, padding: 6 }}
            placeholder="متن (Markdown)"
            value={s.bodyMd ?? ""}
            onChange={(e) => updateAt(idx, { bodyMd: e.target.value })}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <h4 style={{ margin: "6px 0" }}>کد</h4>
              <input
                placeholder="زبان (مثال: tsx)"
                value={s.code?.language ?? ""}
                onChange={(e) =>
                  updateAt(idx, { code: { ...(s.code ?? {}), language: e.target.value } })
                }
                style={{ width: "100%", marginBottom: 6, padding: 6 }}
              />
              <input
                placeholder="فایل (filename)"
                value={s.code?.filename ?? ""}
                onChange={(e) =>
                  updateAt(idx, { code: { ...(s.code ?? {}), filename: e.target.value } })
                }
                style={{ width: "100%", marginBottom: 6, padding: 6 }}
              />
              <input
                placeholder="کپشن"
                value={s.code?.caption ?? ""}
                onChange={(e) =>
                  updateAt(idx, { code: { ...(s.code ?? {}), caption: e.target.value } })
                }
                style={{ width: "100%", marginBottom: 6, padding: 6 }}
              />
              <textarea
                rows={6}
                placeholder="محتوای کد"
                value={s.code?.content ?? ""}
                onChange={(e) =>
                  updateAt(idx, { code: { ...(s.code ?? {}), content: e.target.value } })
                }
                style={{ width: "100%", padding: 6 }}
              />
            </div>

            <div>
              <h4 style={{ margin: "6px 0" }}>Callout</h4>
              <select
                value={s.callout?.type ?? "info"}
                onChange={(e) =>
                  updateAt(idx, { callout: { ...(s.callout ?? {}), type: e.target.value as any } })
                }
                style={{ width: "100%", marginBottom: 6, padding: 6 }}
              >
                <option value="info">info</option>
                <option value="warning">warning</option>
                <option value="tip">tip</option>
                <option value="danger">danger</option>
              </select>
              <textarea
                rows={10}
                placeholder="متن callout"
                value={s.callout?.content ?? ""}
                onChange={(e) =>
                  updateAt(idx, { callout: { ...(s.callout ?? {}), content: e.target.value } })
                }
                style={{ width: "100%", padding: 6 }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminPostsPage(): JSX.Element {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null); // slug
  const [form, setForm] = useState<PostDetail>(defaultEmptyPost());
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(apiUrl("/api/posts/"));
      if (!res.ok) throw new Error("Fetch posts failed");
      const data = (await res.json()) as PostListItem[];
      setPosts(data);
    } catch (err) {
      console.error(err);
      setMessage("خطا در دریافت پست‌ها");
    } finally {
      setLoading(false);
    }
  }

  async function loadPost(slug: string) {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(apiUrl(`/api/posts/${encodeURIComponent(slug)}/`));
      if (!res.ok) {
        throw new Error("Not found");
      }
      const data = (await res.json()) as PostDetail;
      setForm({
        title: data.title ?? "",
        slug: data.slug ?? "",
        description: data.description ?? "",
        draft: !!data.draft,
        canonical: data.canonical ?? "",
        categories: data.categories ?? [],
        tags: data.tags ?? [],
        sections:
          data.sections?.map((s, i) => ({
            id: s.id ?? `s-${i}`,
            title: s.title ?? "",
            level: s.level ?? 2,
            bodyMd: s.bodyMd ?? (s.body_md) ?? "",
            order: s.order ?? i,
            code: s.code ?? null,
            callout: s.callout ?? null,
            extras: s.extras ?? null,
          })) ?? [],
        cover: data.cover ?? null,
        date_published: data.date_published ?? null,
        last_modified: data.last_modified ?? null,
      });
      setEditing(slug);
    } catch (err) {
      console.error(err);
      setMessage("خطا در بارگذاری پست");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setForm(defaultEmptyPost());
    setCoverFile(null);
    setEditing(null);
    setMessage(null);
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);

    const fd = new FormData();
    fd.append("title", form.title ?? "");
    fd.append("slug", form.slug ?? "");
    fd.append("description", form.description ?? "");
    fd.append("draft", form.draft ? "true" : "false");
    if (form.canonical) fd.append("canonical", form.canonical);
    (form.categories ?? []).forEach((c) => fd.append("categories", c));
    (form.tags ?? []).forEach((t) => fd.append("tags", t));
    if (coverFile) fd.append("cover", coverFile);
    // sections serialized as JSON string
    const normalizedSections = (form.sections ?? []).map((s, i) => ({
      id: s.id ?? null,
      title: s.title ?? null,
      level: s.level ?? 2,
      bodyMd: s.bodyMd ?? "",
      order: s.order ?? i,
      code: s.code ?? null,
      callout: s.callout ?? null,
      extras: s.extras ?? null,
    }));
    fd.append("sections", JSON.stringify(normalizedSections));

    try {
      let res: Response;
      if (editing) {
        res = await fetch(apiUrl(`/api/posts/${encodeURIComponent(editing)}/`), {
          method: "PUT",
          body: fd,
          credentials: "include",
        });
      } else {
        res = await fetch(apiUrl(`/api/posts/`), {
          method: "POST",
          body: fd,
          credentials: "include",
        });
      }
      if (!res.ok) {
        const txt = await res.text();
        console.error("Server error:", res.status, txt);
        throw new Error(`Server error ${res.status}`);
      }
      setMessage("عملیات با موفقیت انجام شد");
      await fetchPosts();
      if (!editing) startCreate();
    } catch (err) {
      console.error(err);
      setMessage("خطا هنگام ارسال به سرور");
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("آیا مطمئن هستید حذف شود؟")) return;
    try {
      const res = await fetch(apiUrl(`/api/posts/${encodeURIComponent(slug)}/`), {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("delete failed");
      }
      setMessage("پست حذف شد");
      await fetchPosts();
      startCreate();
    } catch (err) {
      console.error(err);
      setMessage("خطا در حذف");
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 20, marginBottom: 12 }}>مدیریت پست‌ها</h1>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}>
        <div>
          <div style={{ marginBottom: 8, display: "flex", gap: 8 }}>
            <button onClick={startCreate} style={{ padding: "6px 10px" }}>
              پست جدید
            </button>
            <button onClick={() => void fetchPosts()} style={{ padding: "6px 10px" }}>
              بارگذاری
            </button>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {posts.map((p) => (
                <li
                  key={p.slug}
                  style={{
                    padding: 8,
                    border: "1px solid #eee",
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {p.slug} — {p.draft ? "Draft" : "Published"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => void loadPost(p.slug)} style={{ padding: "6px 8px" }}>
                      ویرایش
                    </button>
                    <button onClick={() => void handleDelete(p.slug)} style={{ padding: "6px 8px" }}>
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <form onSubmit={(e) => void handleSubmit(e)}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <input
                placeholder="عنوان"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={{ padding: 8 }}
              />
              <input
                placeholder="slug (منحصر به فرد)"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                style={{ padding: 8 }}
              />
            </div>

            <textarea
              placeholder="توضیحات"
              value={form.description ?? ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: "100%", padding: 8, marginTop: 8 }}
            />

            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
              <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={!!form.draft}
                  onChange={(e) => setForm({ ...form, draft: e.target.checked })}
                />
                <span>Draft</span>
              </label>

              <input
                placeholder="canonical (اختیاری)"
                value={form.canonical ?? ""}
                onChange={(e) => setForm({ ...form, canonical: e.target.value })}
                style={{ padding: 8, flex: 1 }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
              />
            </div>

            <div style={{ marginTop: 12 }}>
              <h3 style={{ marginBottom: 8 }}>Sections</h3>
              <SectionsEditor
                sections={form.sections ?? []}
                onChange={(s) => setForm({ ...form, sections: s })}
              />
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button type="submit" style={{ padding: "8px 12px" }}>
                {editing ? "به‌روزرسانی" : "ارسال"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    startCreate();
                  }}
                  style={{ padding: "8px 12px" }}
                >
                  انصراف
                </button>
              )}
            </div>
          </form>

          {message && (
            <div style={{ marginTop: 12, padding: 8, border: "1px solid #f0e68c", background: "#fffbe6" }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
