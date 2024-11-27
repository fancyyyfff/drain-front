/**
 * 设置 Cookie
 * @param name Cookie 名称
 * @param value Cookie 值
 * @param timeout 过期时间（毫秒）
 */
export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;domain: 'localhost';`;
  console.log(document.cookie)
}

/**
 * 获取 Cookie
 * @param name Cookie 名称
 * @returns Cookie 值或 null
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

/**
 * 清除 Cookie
 * @param name Cookie 名称
 */
export function clearCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}
