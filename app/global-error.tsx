"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#fff8f9" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 28 }}>Страница не открылась</h1>
          <p style={{ marginTop: 12, maxWidth: 420, color: "rgba(0,0,0,0.55)" }}>
            Обновите страницу. Если ошибка повторится, напишите нам в Telegram.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              border: 0,
              borderRadius: 999,
              padding: "12px 22px",
              color: "#fff",
              background: "linear-gradient(135deg, #9b7cff 0%, #c084fc 48%, #ff8aa8 100%)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Обновить
          </button>
        </div>
      </body>
    </html>
  );
}
