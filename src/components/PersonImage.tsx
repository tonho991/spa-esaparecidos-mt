export default function PersonImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      loading="lazy"
      src={src ?? "/static/images/desaparecido.jpg"}
      alt={alt ?? "Pessoa Desconhecida"}
      className={`rounded-md object-cover ${className}`}
      onError={(e) => (e.currentTarget.src = "/static/images/desaparecido.jpg")}
    />
  );
}
