import Cookie from 'js-cookie';

export const COOKIE_POLICY = 'cookie-policy';
export const COOKIE_POLICY_ACCEPTED = 'accepted';
export const COOKIE_POLICY_DECLINED = 'declined';

export function setCookiePolicy(isAccepted: boolean) {
  Cookie.set(COOKIE_POLICY, isAccepted ? COOKIE_POLICY_ACCEPTED : COOKIE_POLICY_DECLINED, { expires: 365 });  
}
export function getCookiePolicy() {
  return Cookie.get(COOKIE_POLICY);
}