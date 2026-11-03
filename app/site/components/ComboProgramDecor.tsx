import styles from "./ComboProgramsSection.module.css";

export type ComboVariant = "show" | "supermix" | "megaboom" | "craft";

const INK = "#2e477a";
const STAR = "M50 5 63 33 94 37 71 59 77 90 50 75 22 90 28 59 6 37 37 33Z";

function Balloon({ className, color }: { className: string; color: string }) {
  return (
    <svg className={className} viewBox="0 0 110 260" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round">
      <path d="M53 143c-17 25 25 36 6 65-17 22 6 28-8 48" />
      <path fill={color} d="m50 127-6 15q10 8 21 0l-6-15" />
      <ellipse cx="55" cy="70" rx="47" ry="61" fill={color} />
      <path d="M23 68C17 43 32 24 43 21" stroke="white" strokeWidth="4" />
    </svg>
  );
}

function Cloud({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 150 110"><path d="M27 99C2 103-4 68 15 58 8 35 34 18 52 30 62 3 97 6 104 31 130 20 151 45 139 65c23 24-8 45-26 34-14 14-33 7-41-1-13 12-34 12-45 1Z" fill="#fffefb" stroke={INK} strokeWidth="3" strokeLinejoin="round" /></svg>;
}

function Bunting() {
  return (
    <svg className={styles.bunting} viewBox="0 0 700 145" fill="none" stroke={INK} strokeWidth="2.8" strokeLinejoin="round">
      <path d="m-5 78 69 5-35 61Z" fill="#ff99b0" />
      <path d="m64 83 64-14-17 58Z" fill="#8bdec7" />
      <path d="m128 69 58-24 1 55Z" fill="#ffbd8d" />
      <path d="m186 45 49-35 8 67Z" fill="#ffda6a" />
      <path d="M-8 78C78 98 166 66 236 9" />
      <path d="m469 9 48 35-55 33Z" fill="#ffab94" />
      <path d="m517 44 56 25-41 39Z" fill="#7ed9b4" />
      <path d="m573 69 64 15-48 45Z" fill="#caa5ed" />
      <path d="m637 84 68-4-41 64Z" fill="#ffe16f" />
      <path d="M468 8c83 60 151 88 242 70" />
    </svg>
  );
}

function Brushes() {
  return (
    <svg className={styles.craftLeft} viewBox="0 0 130 260" stroke={INK} strokeWidth="3" strokeLinejoin="round">
      <path fill="#ffcf59" d="m29 156-9-83 11-3 11 84Z" />
      <path fill="#c294e6" d="m67 157 14-92 11 3-12 93Z" />
      <path fill="#82d8c1" d="m45 155-1-97 12 1 2 96Z" />
      <path fill="#ffdb5d" d="M19 75c-21-7-4-32-8-46 21 16 22 31 19 42Z" />
      <path fill="#f389af" d="M43 57c-14-15 3-36 4-51 17 19 18 37 8 53Z" />
      <path fill="#b798e6" d="M80 65c-9-20 13-35 13-51 16 20 12 43-2 53Z" />
      <path fill="#ee89ae" d="m11 147 91 7-15 94-61-5Z" />
      <ellipse cx="56" cy="150" rx="46" ry="14" fill="#ffd2e5" />
      <g fill="white" stroke="none"><circle cx="34" cy="177" r="7" /><circle cx="70" cy="181" r="7" /><circle cx="51" cy="207" r="7" /><circle cx="76" cy="231" r="6" /><circle cx="31" cy="231" r="6" /></g>
    </svg>
  );
}

function CraftBag() {
  return (
    <svg className={styles.craftRight} viewBox="0 0 145 275" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round">
      <path d="M33 93C18 9 102-22 106 86m-62 3C32 20 92-3 95 86" strokeWidth="7" />
      <path d="m21 82 103 15 5 139-116-24Z" fill="#fffefa" />
      <path d="m38 89 1 22m57-13 1 23" strokeWidth="5" />
      <path d="M69 188C-7 130 58 104 70 141c20-36 72 8-1 47Z" fill="#f38ca9" />
      <path d="m35 250 74-108 11 7-72 111Z" fill="#bca1e8" />
      <path d="m109 142 7-32 9 25-5 14Z" fill="#ffdc65" />
    </svg>
  );
}

function Palette() {
  return (
    <svg className={styles.palette} viewBox="0 0 140 145" stroke={INK} strokeWidth="3">
      <path d="M111 124C77 160 14 133 8 86-2 24 70-4 111 32c23 19-15 24-5 43 7 13 28 23 5 49Z" fill="#fffef8" />
      <circle cx="89" cy="51" r="10" fill="#ef8ba9" /><circle cx="58" cy="36" r="10" fill="#90d9bc" /><circle cx="31" cy="61" r="10" fill="#81c6e9" /><circle cx="32" cy="98" r="10" fill="#ffd76a" /><circle cx="69" cy="117" r="10" fill="#ed8aaa" />
    </svg>
  );
}

function PaintPot() {
  return (
    <svg className={styles.paintPot} viewBox="0 0 150 210" stroke={INK} strokeWidth="3" strokeLinejoin="round">
      <path d="m11 88 20 100c2 19 87 25 93-1l18-101" fill="#a990df" />
      <ellipse cx="76" cy="88" rx="65" ry="23" fill="#89d4d0" />
      <path d="M14 86c18-29 36 10 51-9 21-26 22-7 41-7 29-1 39 16 33 30-5 15-14-2-17 15-4 26-17 27-19 3-2-19-6-25-21-17-18 10-18-5-30-8-15-4-23 7-38-7Z" fill="#85e0ac" />
      <path d="m90 84 29-77q9-12 16 3l-29 81Z" fill="#f291b5" />
      <path d="m82 108 10-28 15 7-10 29Z" fill="#ffdc5b" />
    </svg>
  );
}

function Ribbon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 300" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round">
      <path d="M78 6c57 44-72 38-69 83 4 46 122 22 91 65-21 29-99 23-82 65 9 21 43 37 68 63l23-19c-21-22-72-34-63-47 8-13 80-16 72-55C109 116 20 119 31 92 44 63 146 62 105 12Z" fill="#b78edf" />
      <path d="M78 6c51 40-40 31-62 65l20 12c22-23 91-21 80-58Z" fill="#f59dbb" />
      <path d="M11 99c20 29 100 11 91 45l15 8c12-39-70-44-86-58Z" fill="#efa4cb" />
      <path d="M18 222c17 29 49 37 68 60l23-19c-24-22-65-32-64-50Z" fill="#f598b9" />
    </svg>
  );
}

function Pinata() {
  return (
    <svg className={styles.pinata} viewBox="0 0 180 290" stroke={INK} strokeWidth="3" strokeLinejoin="round">
      <path d="M74 0 87 53" fill="none" />
      <path fill="#b59ae8" d="m67 39 25-3 17 27-10 53 58 8 14 67-20 15-6 68-25-3-3-66-37-2-9 65-26-2 4-68-24-26-8-53 40-4 7-41-19-9Z" />
      {[100, 123, 146, 169, 192].map((y, i) => <path key={y} d={`M23 ${y}h136l-3 21-8-6-8 7-8-7-8 7-8-7-8 7-8-7-8 7-8-7-8 7-8-7-8 7-8-7-8 7-8-7-8 7Z`} fill={["#bb8cde", "#f18db3", "#ffdf6f", "#82d4c2", "#b696e9"][i]} />)}
      <path d="m48 224 22 1-1 20-8-5-7 5-7-5Zm71 0h25l-1 21-8-5-7 5-8-6Z" fill="#f694b8" />
      <path d="m48 245 20 1-1 21-21-2Zm72 0h24l-2 25-21-1Z" fill="#b696e9" />
    </svg>
  );
}

function Cannon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 180 260" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round">
      <path d="m30 114 103-6-6 123-39 21-40-27Z" fill="#b88ce2" />
      <ellipse cx="82" cy="113" rx="52" ry="19" fill="#4d589b" />
      <path d="M74 102C34 47 27 34 9 40L0 59c27-8 31 12 50 49Z" fill="#f598bb" />
      <path d="M93 101c-2-47 24-47 48-48l-6 24c-19-2-26 4-26 27Z" fill="#91dfbe" />
      <path d="M80 104C70 64 72 34 83 16l23 8c-17 27-17 42-11 80Z" fill="#ffe069" />
      <path d="M51 88 21 72l-8 13 33 20Z" fill="#9bcbe9" />
      <path d="m130 31 13-19 14 11-13 18Z" fill="#e898c1" />
      <path d="m19 18 11-13 13 12-9 13Z" fill="#8dd7c1" />
      <path d="m99 145 6 11 13 2-9 9 2 13-12-7-12 7 2-13-9-9 13-2Z" fill="#ffdf62" stroke="none" />
    </svg>
  );
}

export default function ComboProgramDecor({ variant }: { variant: ComboVariant }) {
  return (
    <div aria-hidden="true" className={styles.decor}>
      {variant !== "megaboom" && <Bunting />}
      <svg className={styles.confetti} viewBox="0 0 700 1000" preserveAspectRatio="none">
        {[
          [46, 25, "#ffdd62", 22], [661, 30, "#ffdd62", 22],
          [83, 374, "#f49ab8", 23], [652, 390, "#b696e8", 20],
          [40, 675, "#ffdf66", 23], [640, 720, "#9dc9ed", 17],
          [62, 883, "#f29ac0", 22], [661, 907, "#b89ce7", 22],
        ].map(([x, y, fill, size], index) => <path key={index} d={STAR} transform={`translate(${x},${y}) scale(${Number(size) / 100})`} fill={String(fill)} stroke={INK} strokeWidth="8" strokeLinejoin="round" />)}
        {Array.from({ length: 38 }, (_, i) => {
          const x = 10 + (i * 131) % 680;
          const y = 58 + (i * 173) % 921;
          if (x > 124 && x < 577) return null;
          return <path key={i} d={STAR} transform={`translate(${x},${y}) scale(${i % 3 === 0 ? .13 : .085}) rotate(${i * 13},50,50)`} fill={["#a4decf", "#d0b5ea", "#f6adc6", "#ffe18a", "#aad8ec"][i % 5]} opacity=".85" />;
        })}
        {Array.from({ length: 45 }, (_, i) => <circle key={`sparkle-${i}`} cx={(i * 79 + 38) % 700} cy={(i * 127 + 88) % 1000} r={i % 3 === 0 ? 2 : 1.1} fill="white" opacity=".8" />)}
      </svg>
      {variant === "craft" ? <><Brushes /><CraftBag /><Palette /><PaintPot /></> : variant === "megaboom" ? (
        <><Pinata /><Ribbon className={styles.ribbonRight} /><Ribbon className={styles.ribbonLeft} /><Cannon className={styles.cannonLeft} /><Cannon className={styles.cannonRight} /></>
      ) : (
        <><Balloon className={styles.balloonLeft} color="#c29be5" /><Balloon className={styles.balloonRight} color="#f59fba" /><Balloon className={styles.balloonBottom} color="#ffe079" /><Cloud className={styles.cloudLeft} /><Cloud className={styles.cloudRight} /></>
      )}
    </div>
  );
}
