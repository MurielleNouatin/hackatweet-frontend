import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from '../reducers/user';
import tweetDraft from '../reducers/tweetDraft';
import '../styles/globals.css';

const store = configureStore({
  reducer: { user, tweetDraft },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;