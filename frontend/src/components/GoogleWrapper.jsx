import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleWrapper = ({children}) => {
  return <GoogleOAuthProvider clientId="948835835960-rjb1sbr1tqqku60qo5hbu2qld15304av.apps.googleusercontent.com">{children}</GoogleOAuthProvider>;
};
export default GoogleWrapper;
