import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthRoute() {
    const user = useSelector((state) => state?.auth?.user);
    return user ? <Outlet/> : <Navigate to="/login"/>
}
