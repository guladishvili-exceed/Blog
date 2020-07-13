import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LogIn from './components/LogIn/Login';
import Register from './components/Register/Register';
import Homepage from './pages/HomePage/HomePage';
import Profile from './components/Profile/Profile';
import Posts from './components/addPostUI/Posts';
import PostOnPage from './components/PostOnPage/PostOnPage';
import reducer from './Redux/rootReducer';

import './app.css';

// @ts-ignore
export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const routes = [
  {
    path: '/',
    exact: true,
    component: LogIn,
  },
  {
    path: '/login',
    component: LogIn,
  },
  {
    path: '/registration',
    component: Register,
  },
  {
    path: '/homepage/',
    component: Homepage,
  },
  {
    path: '/profile/:userId',
    component: Profile,
  },
  {
    path: '/posts',
    component: Posts,
  },
  {
    path: '/postsOnPage/:postId',
    component: PostOnPage,
  },
];

const App: React.FunctionComponent = () => {
  toast.configure()
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            { routes.map(route => <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />) }
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
