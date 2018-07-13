export default function parseJwt(token) {
  const base64 = token.split('.')[1].replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
