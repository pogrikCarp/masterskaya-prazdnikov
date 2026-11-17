export default function AnimatorPhoto({ imageUrl, name, className = "" }: {
  imageUrl: string | null;
  name: string;
  className?: string;
}) {
  return (
    <div className={`relative isolate overflow-hidden bg-[linear-gradient(145deg,#eee6ff,#fff4ed_65%,#e5f6f1)] ${className}`}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-contain mix-blend-multiply" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-5xl" aria-label={name}>🎭</div>
      )}
    </div>
  );
}
