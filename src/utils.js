export function getRedirectUrl({ avatar, type }) {
  let url = `/${type}`;
  let info = "info";
  if (!avatar) {
    url += info;
  }
  return url;
}
