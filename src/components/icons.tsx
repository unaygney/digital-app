export function shimmer(w: number, h: number) {
  return `
  <svg  width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f0f0f0" offset="20%" />
        <stop stop-color="#e0e0e0" offset="50%" />
        <stop stop-color="#f0f0f0" offset="75%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f0f0f0" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;
}
export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M9.99996 18.3333C5.39758 18.3333 1.66663 14.6023 1.66663 9.99996C1.66663 5.39758 5.39758 1.66663 9.99996 1.66663C14.6023 1.66663 18.3333 5.39758 18.3333 9.99996C18.3333 14.6023 14.6023 18.3333 9.99996 18.3333ZM9.16879 13.3333L15.0614 7.44073L13.8829 6.26223L9.16879 10.9763L6.8118 8.61921L5.63328 9.79779L9.16879 13.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}
