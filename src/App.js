import React from 'react';
import './styles/App.scss';
import Navbar from './components/Layout/Navbar';
import Students from './components/students/Students';
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Student from './components/students/Student';
import StudentForm from './components/students/StudentForm';
import { Provider } from 'react-redux';
import store,{rrfProps} from './store';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import Login from './components/pages/Login';
import PrivateRoute from './components/Routes/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
      <div className="App">
      <PrivateRoute component={Navbar} />
      <Switch>
        <PrivateRoute exact path="/" component={Students}/>
        <PrivateRoute exact path="/student/:id" component={Student}/>
        <PrivateRoute exact path="/studentForm/:id?" component={StudentForm}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </div>
    </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
