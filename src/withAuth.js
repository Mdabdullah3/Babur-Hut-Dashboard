import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from './store/AuthStore';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const { user, loading, fetchUser } = useUserStore();

        useEffect(() => {
            const checkAuth = async () => {
                if (!user) {
                    await fetchUser();
                }
            };
            checkAuth();
        }, [user, fetchUser]);

        useEffect(() => {
            if (!loading) {
                if (!user) {
                    navigate('/');
                } else {
                    navigate('/admin');
                }
            }
        }, [loading, user, navigate]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
