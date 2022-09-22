import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    deleteOttleLike,
    getItemsById,
    getOttleLike,
    setOttleLike,
} from '../../app/firestore';
import { selectUser } from '../../features/user/userSlice';
import { OttleContext } from './OttleContext';

const initialContext = {
    loading: true,
    like: false,
    error: false,
};

const createContext = ({ loading, like, error }) => ({
    loading,
    like,
    error,
});

export const OttleLikeContext = React.createContext(initialContext);

export const OttleLikeContextProvier = ({ children }) => {
    const [context, setContext] = useState(initialContext);
    const { isAuth, user } = useSelector(selectUser);
    const { loading: ottleLoading, ottle } = useContext(OttleContext);

    const fetchGetLike = async () => {
        try {
            // loading
            setContext(initialContext);
            const data = await getOttleLike(user.uid, ottle.id);
            // fulfilled
            setContext(
                createContext({ ...context, loading: false, like: data })
            );
        } catch (err) {
            console.error(err);
            // rejected
            setContext(
                createContext({
                    ...context,
                    loading: false,
                    like: false,
                    error: true,
                })
            );
        }
    };

    const toggleLike = () => {
        setContext(
            createContext({
                ...context,
                like: !context.like,
            })
        );
    };

    const fetchSetLike = async () => {
        try {
            if (context.like) {
                await deleteOttleLike(user.uid, ottle.id);
            } else {
                await setOttleLike(user.uid, ottle.id);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (ottleLoading) return;
        if (!isAuth) {
            setContext(createContext({ ...context, loading: false }));
            return;
        }
        fetchGetLike();
    }, [ottleLoading]);

    return (
        <OttleLikeContext.Provider
            value={{ state: context, actions: { toggleLike, fetchSetLike } }}
        >
            {children}
        </OttleLikeContext.Provider>
    );
};

export const OttleLikeContextProvierHoC = (Component) => (props) => (
    <OttleLikeContextProvier>
        <Component {...props} />
    </OttleLikeContextProvier>
);
