import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from './store/AuthStore';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const { user, loading, fetchUser } = useUserStore();

        useEffect(() => {
            if (!user) {
                fetchUser();
            }
        }, [user, fetchUser]);

        useEffect(() => {
            if (!loading && !user) {
                navigate('/login');
            }
        }, [loading, user, navigate]);

        if (loading || !user) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
