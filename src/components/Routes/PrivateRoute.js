import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import Loader from '../Layout/Loader';

const PrivateRoute = ({component:Component,...rest}) => {

    const auth = useSelector(state => state.firebase.auth)

    if(!isLoaded(auth)){
        return <Loader/>
    }

    return !isEmpty(auth) ? (<Route {...rest}  render={(props) => <Component {...rest} {...props} /> } />) : <Redirect to="/login" />
}

export default PrivateRoute;