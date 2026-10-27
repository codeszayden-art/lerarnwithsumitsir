import { Fragment } from 'react';

/** Renders a plain string where **double-asterisk** segments become <strong>. */
export default function RichText({ text }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}
