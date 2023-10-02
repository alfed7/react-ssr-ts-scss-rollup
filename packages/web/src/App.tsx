import { FC, Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { HelmetHead } from './components';
import './global'
import './App.scss'
import { preferenceActions, useStateSelector } from "./context";
import { CookiesPolicy } from "./components";
import { setCookiePolicy, isServer } from "./utils";
import { useStateDispatch } from "react-reducer-ssr"

export const App: FC = () => {
  const preferences = useStateSelector((s) => s?.preferences);
  const dispatch = useStateDispatch();
  const [doShowCookiesConsentPrompt, setShowCookiesConsentPrompt] = useState(false);

  useEffect(() => {
    dispatch(preferenceActions.readCookieSettings());
    const doShow = !isServer() && null === preferences?.allowCookies
    setShowCookiesConsentPrompt(doShow)
  }, [setShowCookiesConsentPrompt, preferences]);

  const handleCookieSettingsChange = (isAccepted: boolean) => {
    setCookiePolicy(isAccepted);
    dispatch(preferenceActions.setCookiePolicy(isAccepted));
  }
  return (
    <Fragment>
      <HelmetHead title="React SSR Workspace" />
      <Outlet/>
      {doShowCookiesConsentPrompt && <CookiesPolicy onChange={handleCookieSettingsChange}/>}
    </Fragment>
  );
};
async function loadData(dispatch: any, cookies: any) {
  await dispatch(preferenceActions.readCookieSettings(cookies));
}
export default {
  loadData,
  component: App,
};
