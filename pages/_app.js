import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from '../reducers/user';
import tweetDraft from '../reducers/tweetDraft';


const store = configureStore({
  reducer: { userInfos, tweetDraft },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;