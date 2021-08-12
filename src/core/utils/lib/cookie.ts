// eslint-disable-next-line no-useless-escape
const jwtRegex = /(?:^|\;)?token=Bearer(?:\s|%20)(.+?)(?:;|$|\s)/i

export const extractCookie = (req): string | null => {
  let token = null
  if (req && req.headers && req.headers.cookie) {
    token = jwtRegex.exec(req.headers.cookie)
    token = token ? token[1] : null
  }
  return token
}
