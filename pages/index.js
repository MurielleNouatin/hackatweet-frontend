import { useSelector } from 'react-redux';
import Login from '../components/Login';
import Home from '../components/Home';

export default function IndexPage() {
  const user = useSelector((state) => state.user.value);

  return user.isConnected ? <Home /> : <Login />;
}
// comment