"use client";

import { useCallback, useEffect, useState } from "react";

type EntityType =
  | "animators"
  | "quests"
  | "shows"
  | "master-classes"
  | "additional-services"
  | "gallery";

type BaseEntity = {
  id: number;
  name?: string;
  title?: string | null;
  description: string | null;
  imageUrl: string | null;
  price?: number;
  pricePerHour?: number;
  duration?: number;
  minAge?: number;
  maxAge?: number | null;
  popular: boolean;
  active: boolean;
  categoryId?: number | null;
  categoryName?: string | null;
  order?: number;
};

type GalleryCategory = {
  id: number;
  name: string;
  order: number;
  active: boolean;
  _count?: { items: number };
};

type EntityConfig = {
  title: string;
  priceField: "price" | "pricePerHour" | null;
  hasDuration: boolean;
  hasAge: boolean;
  isGallery?: boolean;
};

const ENTITY_CONFIG: Record<EntityType, EntityConfig> = {
  animators: { title: "Аниматоры", priceField: "pricePerHour", hasDuration: false, hasAge: false },
  quests: { title: "Квесты", priceField: "price", hasDuration: true, hasAge: true },
  shows: { title: "Шоу-программы", priceField: "price", hasDuration: true, hasAge: false },
  "master-classes": { title: "Мастер-классы", priceField: "price", hasDuration: true, hasAge: true },
  "additional-services": { title: "Дополнительные услуги", priceField: "price", hasDuration: false, hasAge: false },
  gallery: { title: "Галерея", priceField: null, hasDuration: false, hasAge: false, isGallery: true },
};

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error || "Ошибка авторизации");
      }
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Вход в админ-панель</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}

function EntityModal({
  entity,
  entityType,
  categories,
  onClose,
  onSave,
}: {
  entity: BaseEntity | null;
  entityType: EntityType;
  categories: GalleryCategory[];
  onClose: () => void;
  onSave: () => void;
}) {
  const config = ENTITY_CONFIG[entityType];
  const priceField = config.priceField;
  const [form, setForm] = useState<Partial<BaseEntity>>(
    entity || (config.isGallery
      ? {
          title: "",
          description: "",
          categoryId: categories[0]?.id || null,
          order: 0,
          active: true,
          popular: false,
        }
      : { name: "", description: "", popular: false, active: true })
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(entity?.imageUrl || "");

  const handleChange = (field: string, value: string | number | boolean | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setSelectedFileName(file.name);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        setUploadedImageUrl(url);
        setForm((prev) => ({ ...prev, imageUrl: url }));
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Не удалось загрузить изображение");
      }
    } catch {
      setError("Ошибка соединения при загрузке изображения");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const method = entity ? "PUT" : "POST";
      const res = await fetch(`/api/admin/${entityType}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageUrl: uploadedImageUrl || form.imageUrl || null,
        }),
      });

      if (res.ok) {
        onSave();
        onClose();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Не удалось сохранить запись");
      }
    } catch {
      setError("Ошибка соединения при сохранении записи");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">
            {entity ? "Редактировать" : "Добавить"} {config.title.toLowerCase().slice(0, -1)}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {config.isGallery ? "Название фото" : "Название"} *
            </label>
            <input
              type="text"
              value={config.isGallery ? form.title || "" : form.name || ""}
              onChange={(e) => handleChange(config.isGallery ? "title" : "name", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              value={form.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          {!config.isGallery && priceField && (
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {priceField === "pricePerHour" ? "Цена за час (₽)" : "Цена (₽)"}
            </label>
            <input
              type="number"
              value={form[priceField] || ""}
              onChange={(e) => handleChange(priceField, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            </div>
          )}

          {config.isGallery && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Категория *
                </label>
                <select
                  value={form.categoryId || ""}
                  onChange={(e) =>
                    handleChange(
                      "categoryId",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="" disabled>
                    Выберите категорию
                  </option>
                  {categories
                    .filter((category) => category.active || category.id === form.categoryId)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {categories.length === 0 && (
                  <p className="mt-1 text-xs text-amber-600">
                    Сначала создайте категорию в блоке выше.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Порядок</label>
                <input
                  type="number"
                  value={form.order ?? 0}
                  onChange={(e) => handleChange("order", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {config.hasDuration && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Длительность (мин)</label>
              <input
                type="number"
                value={form.duration || ""}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {config.hasAge && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Мин. возраст</label>
                <input
                  type="number"
                  value={form.minAge || ""}
                  onChange={(e) => handleChange("minAge", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Макс. возраст</label>
                <input
                  type="number"
                  value={form.maxAge || ""}
                  onChange={(e) => handleChange("maxAge", e.target.value || null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Изображение</label>
            <div className="flex items-center gap-4">
              {(uploadedImageUrl || form.imageUrl) && (
                <img
                  src={uploadedImageUrl || form.imageUrl || ""}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
                {uploading ? "Загрузка..." : uploadedImageUrl ? "Заменить файл" : "Выбрать файл"}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {selectedFileName && (
                <span className="max-w-40 truncate text-xs text-gray-500">
                  {uploadedImageUrl ? "Загружено: " : "Выбрано: "}
                  {selectedFileName}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            {!config.isGallery && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.popular || false}
                  onChange={(e) => handleChange("popular", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600"
                />
                <span className="text-sm">Популярный</span>
              </label>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active !== false}
                onChange={(e) => handleChange("active", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600"
              />
              <span className="text-sm">Активен</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}

function GalleryCategoriesPanel({ onChanged }: { onChanged: () => void }) {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editOrder, setEditOrder] = useState(0);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery-categories");
      if (res.ok) {
        setCategories(await res.json());
      }
    } catch (err) {
      console.error("Error fetching gallery categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/gallery-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, order, active: true }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Не удалось создать категорию");
        return;
      }

      setName("");
      setOrder(0);
      await fetchCategories();
      onChanged();
    } catch {
      setError("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (category: GalleryCategory) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditOrder(category.order);
    setError("");
  };

  const handleUpdate = async (category: GalleryCategory) => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/gallery-categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: category.id,
          name: editName,
          order: editOrder,
          active: category.active,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Не удалось сохранить категорию");
        return;
      }

      setEditingId(null);
      await fetchCategories();
      onChanged();
    } catch {
      setError("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (category: GalleryCategory) => {
    try {
      const res = await fetch("/api/admin/gallery-categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: category.id,
          name: category.name,
          order: category.order,
          active: !category.active,
        }),
      });
      if (res.ok) {
        await fetchCategories();
        onChanged();
      }
    } catch (err) {
      console.error("Toggle category error:", err);
    }
  };

  const handleDelete = async (category: GalleryCategory) => {
    if (
      !confirm(
        `Удалить категорию «${category.name}»? Фото останутся, но без категории.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/gallery-categories?id=${category.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchCategories();
        onChanged();
      }
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-indigo-100 bg-indigo-50/60 p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Категории галереи</h3>
          <p className="text-sm text-gray-600">
            Создайте категории, затем выбирайте их при загрузке фото. Фильтры на сайте
            обновятся автоматически.
          </p>
        </div>
      </div>

      <form onSubmit={handleCreate} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например: Детские праздники"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value) || 0)}
          placeholder="Порядок"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 sm:w-28 focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? "Сохранение..." : "+ Категория"}
        </button>
      </form>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {loading ? (
        <div className="mt-4 text-sm text-gray-500">Загрузка категорий...</div>
      ) : categories.length === 0 ? (
        <div className="mt-4 text-sm text-amber-700">
          Пока нет категорий. Создайте хотя бы одну, чтобы добавлять фото в галерею.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg bg-white ring-1 ring-black/5">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Название</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Порядок</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Фото</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Статус</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-3">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded border border-gray-300 px-2 py-1"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{category.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === category.id ? (
                      <input
                        type="number"
                        value={editOrder}
                        onChange={(e) => setEditOrder(Number(e.target.value) || 0)}
                        className="w-20 rounded border border-gray-300 px-2 py-1"
                      />
                    ) : (
                      category.order
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{category._count?.items ?? 0}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(category)}
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        category.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.active ? "Активна" : "Скрыта"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {editingId === category.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleUpdate(category)}
                          className="mr-3 text-indigo-600 hover:text-indigo-900"
                        >
                          Сохранить
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          Отмена
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => startEdit(category)}
                          className="mr-3 text-indigo-600 hover:text-indigo-900"
                        >
                          Изменить
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Удалить
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<EntityType>("animators");
  const [data, setData] = useState<BaseEntity[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalEntity, setModalEntity] = useState<BaseEntity | null | undefined>(undefined);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/check");
      const { authenticated } = await res.json();
      setAuthenticated(authenticated);
    } catch {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchCategories = useCallback(async () => {
    if (!authenticated) return;
    try {
      const res = await fetch("/api/admin/gallery-categories");
      if (res.ok) {
        setCategories(await res.json());
      }
    } catch (error) {
      console.error("Error fetching gallery categories:", error);
    }
  }, [authenticated]);

  const fetchData = useCallback(async () => {
    if (!authenticated) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${activeTab}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, authenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (activeTab === "gallery") {
      fetchCategories();
    }
  }, [activeTab, fetchCategories]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить эту запись?")) return;

    try {
      const res = await fetch(`/api/admin/${activeTab}?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  const config = ENTITY_CONFIG[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Выйти
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {(Object.keys(ENTITY_CONFIG) as EntityType[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {ENTITY_CONFIG[key].title}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "gallery" && (
          <GalleryCategoriesPanel
            onChanged={() => {
              fetchCategories();
              fetchData();
            }}
          />
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">{config.title}</h2>
            <button
              onClick={() => setModalEntity(null)}
              disabled={activeTab === "gallery" && categories.filter((c) => c.active).length === 0}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              title={
                activeTab === "gallery" && categories.filter((c) => c.active).length === 0
                  ? "Сначала создайте категорию"
                  : undefined
              }
            >
              + Добавить
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Нет данных</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Фото</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Название</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {config.isGallery ? "Категория / порядок" : "Цена"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="w-12 h-12 object-cover rounded-lg" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                            —
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {config.isGallery ? item.title : item.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {config.isGallery ? (
                          <span>
                            {item.categoryName || "Без категории"} · {item.order ?? 0}
                          </span>
                        ) : (
                          <>
                            {(item[config.priceField!] ?? 0).toLocaleString()} ₽
                            {config.priceField === "pricePerHour" && "/ч"}
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {!config.isGallery && item.popular && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              ⭐ Популярный
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              item.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.active ? "Активен" : "Скрыт"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => setModalEntity(item)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Изменить
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {modalEntity !== undefined && (
        <EntityModal
          entity={modalEntity}
          entityType={activeTab}
          categories={categories}
          onClose={() => setModalEntity(undefined)}
          onSave={fetchData}
        />
      )}
    </div>
  );
}
