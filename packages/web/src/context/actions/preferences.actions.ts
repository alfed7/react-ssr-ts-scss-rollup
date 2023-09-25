import { COOKIE_POLICY, COOKIE_POLICY_ACCEPTED, getCookiePolicy } from "../../utils";

export const preferenceActions = {
  readCookieSettings,
  setCookiePolicy
}

function isPolicyAccepted(policy?: string): boolean | null {
  if(!policy) return null;
  return policy === COOKIE_POLICY_ACCEPTED;
}

function setCookiePolicy(allowCookies: boolean | null) {
  return {
    type: "cookieSettingsAdd",
    value: allowCookies
  }
}
function readCookieSettings(setting?: any) {
  if(setting) {
    const allowCookies = isPolicyAccepted(setting[COOKIE_POLICY]);
    return setCookiePolicy(allowCookies);
  }
  else {
    const allowCookies = isPolicyAccepted(getCookiePolicy());
    return setCookiePolicy(allowCookies);
  }
}