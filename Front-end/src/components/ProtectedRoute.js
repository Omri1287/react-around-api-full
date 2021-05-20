import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    return (
        <Route>
            {/* {(...args) => {
                console.log('args:', args)
                return props.loggedIn ? (
                    <>
                        <Component {...props} />
                    </>
                ) : (
                    <Redirect to="/signin" />
                )
            }
            } */}
            { (...args) => {
                console.log('args:', args)
                return props.loggedIn ? <Component {...props} />: <Redirect to='/signin' /> }}
        </Route>
    );
}
//<Component {...props} />
//{ props.loggedIn ? props.children: <Redirect to='/signin' /> }
export default ProtectedRoute;
