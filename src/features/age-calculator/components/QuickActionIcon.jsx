const PATHS = {
  whatsapp: (
    <>
      <path d="M12 2.5a9.5 9.5 0 0 0-8.1 14.4L2.6 21.4l4.6-1.2A9.5 9.5 0 1 0 12 2.5z" />
      <path d="M8.6 8.3c.3-.7.9-.8 1.3-.5l1 1.5c.2.4 0 .8-.3 1l-.4.4c.6 1.1 1.4 1.9 2.6 2.5l.5-.5c.3-.3.7-.3 1-.1l1.5 1c.4.3.3.9-.3 1.5-.9.8-2.2.6-3.7-.1-1.8-.9-3-2.2-3.7-3.9-.4-1-.3-2 .5-2.8z" />
    </>
  ),
  brochure: (
    <>
      <path d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5z" />
      <path d="M14 2.5v5h5" />
      <path d="M12 11.5v6M9.5 15.2l2.5 2.5 2.5-2.5" />
    </>
  ),
  register: (
    <>
      <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" />
      <path d="M13.5 6.5l4 4" />
    </>
  ),
};

/** Line icons for the floating rail (inherit the text colour). */
export default function QuickActionIcon({ type }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[type]}
    </svg>
  );
}