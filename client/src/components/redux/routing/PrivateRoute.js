import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-redux';
import { connect } from 'react-redux';

const PrivateRoute = ({
    component: Component,
    auth: {
        isAuthenticated,
        loading
    },
    ...rest
}) => {
    return (
        <Route {...rest} render={
            props=>{
                !isAuthenticated && !loading ? (
                    <Redirect to="/signin" />
                ) : (
                    <Component {...props} />
                )
            }
        } />
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);