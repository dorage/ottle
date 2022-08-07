import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { getUserByUsername } from '../../app/firestore';
import { routes } from '../../configs/routes';

const initialContext = {
    isMe: false,
    loading: true,
    user: null,
    error: false,
};

const createContext = ({ isMe, loading, user, error }) => ({
    isMe,
    loading,
    user,
    error,
});

export const UserContext = React.createContext(initialContext);

export const UserContextProvider = ({ children }) => {
    const navigator = useNavigate();
    const [context, setContext] = useState(initialContext);
    const { isAuth, user } = useSelector(selectUser);
    const { username } = useParams();

    const fetchUser = async () => {
        try {
            if (isAuth && user.username === username) {
                setContext(
                    createContext({
                        ...context,
                        isMe: true,
                        loading: false,
                        user: user,
                    })
                );
            } else {
                setContext(
                    createContext({
                        ...context,
                        isMe: false,
                        loading: false,
                        user: await getUserByUsername(username),
                    })
                );
            }
        } catch (err) {
            console.log(err);
            setContext(
                createContext({
                    ...context,
                    loading: false,
                    error: true,
                })
            );
        }
    };

    useEffect(() => {
        fetchUser();
    }, [user]);

    useEffect(() => {
        if (context.error) navigator(routes.pageNotFound());
    }, [context.error]);

    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    );
};

export const UserContextProviderHoC = (Component) => (props) => (
    <UserContextProvider>
        <Component {...props} />
    </UserContextProvider>
);
