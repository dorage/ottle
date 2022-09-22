import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMyOttleByNanoId, getOttleByNanoId } from '../../app/firestore';
import { UserContext } from './UserContext';

const initialContext = {
    loading: true,
    ottle: null,
    error: false,
};

const createContext = ({ loading, ottle, error }) => ({
    loading,
    ottle,
    error,
});

export const OttleContext = React.createContext(initialContext);

export const OttleContextProvier = ({ children }) => {
    const [context, setContext] = useState(initialContext);
    const { nanoid } = useParams();
    const { loading: userloading, isMe, user } = useContext(UserContext);

    const fetchOttle = async () => {
        try {
            // loading
            setContext(initialContext);
            const data = isMe
                ? await getMyOttleByNanoId(user.uid, nanoid)
                : await getOttleByNanoId(user.uid, nanoid);
            // fulfilled
            setContext(
                createContext({ ...context, loading: false, ottle: data })
            );
        } catch (err) {
            console.error(err);
            // rejected
            setContext(
                createContext({
                    ...context,
                    loading: false,
                    ottle: null,
                    error: true,
                })
            );
        }
    };

    useEffect(() => {
        if (userloading) return;
        fetchOttle();
    }, [userloading]);

    return (
        <OttleContext.Provider value={context}>
            {children}
        </OttleContext.Provider>
    );
};

export const OttleContextProvierHoc = (Component) => (props) => (
    <OttleContextProvier>
        <Component {...props} />
    </OttleContextProvier>
);
