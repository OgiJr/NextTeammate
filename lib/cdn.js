export function nextSubpath() {
  return process.env.NEXT_PUBLIC_IS_DEV === "TRUE"
    ? `http://localhost:${process.env.NEXT_PUBLIC_NEXT_PORT}/`
    : `https://${process.env.NEXT_PUBLIC_DOMAIN}/`;
}

export function cdnSubpath() {
  return process.env.NEXT_PUBLIC_IS_DEV === "TRUE"
    ? `http://localhost:${process.env.NEXT_PUBLIC_CDN_PORT}/`
    : `https://${process.env.NEXT_PUBLIC_DOMAIN}/uploads/`;
}
