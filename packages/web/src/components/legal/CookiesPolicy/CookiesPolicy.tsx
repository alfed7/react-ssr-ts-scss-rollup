import './CookiePolicy.scss'

export interface ICookiesPolicyProps {
  onChange: (isAccepted: boolean) => void;
}

export const CookiesPolicy = (props: ICookiesPolicyProps) => {
  const handleAccept = (isAccepted: boolean) => () => {
    props.onChange(isAccepted);
  }

  return (
    <div className="cookie-policies">
      <h2>Cookies Policy</h2>
      <p>This website stores cookies on your computer.</p>
      <p>These cookies are used to collect information about how you interact with this website and allow us to remember you. We use this information in order to improve and customize your browsing experience and for analytics and metrics about our visitors on this website.</p>
      <p>If you decline, your information won't be tracked when you visit this website. A single cookie will be used in your browser to remember your preference not to be tracked.</p>
      <div className="action-area"><button onClick={handleAccept(false)}>Decline</button>
      <button onClick={handleAccept(true)}>Accept</button></div>
    </div>
  )
}

export default CookiesPolicy