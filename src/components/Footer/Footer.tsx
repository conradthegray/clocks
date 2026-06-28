export function Footer() {
  return (
    <footer className="grid grid-cols-2 items-center px-6 py-4 text-sm">
      <a
        href="https://github.com/conradthegray/clocks"
        target="_blank"
        rel="noopener noreferrer"
        className="justify-self-start text-muted hover:text-accent hover:underline"
      >
        GitHub
      </a>
      <a
        href="https://ko-fi.com/conradthegray"
        target="_blank"
        rel="noopener noreferrer"
        className="justify-self-end text-muted hover:text-accent hover:underline"
      >
        Can I have a cookie?
      </a>
      <p className="col-span-2 mt-6 text-center text-xs text-muted">
        This page does not collect any data.
      </p>
    </footer>
  );
}
