/** Horizontally scrolling chip strip. The list is doubled so the CSS animation loops seamlessly. */
export default function Marquee({ items, className, id }) {
  return (
    <div className={className} id={id}>
      <div>
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
