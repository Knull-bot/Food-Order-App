/**
 * Renders a button element with CSS classes `button` and `text-button`.
 *
 * The `textOnly` prop can be used to render the button as a text-only
 * button, without any background color or border.
 *
 * The `className` prop can be used to add additional CSS classes to the
 * button element.
 *
 * All other props are passed through to the button element.
 *

 */
export default function Button({ children, textOnly, className, ...props }) {
  const cssClasses = textOnly
    ? ` text-button ${className}`
    : `button ${className}`;
  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
}
