import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from '../reducers/user';

const store = configureStore({
  reducer: { user },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;