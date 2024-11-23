import { GoogleOAuthProvider } from "@react-oauth/google";

import GlobalRouter from "./router/router";

const App = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId="">
        <GlobalRouter />
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
