import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemsById } from '../../app/firestore';
import { OttleContext } from './OttleContext';

const initialContext = {
    loading: true,
    items: null,
    error: false,
};

const createContext = ({ loading, items, error }) => ({
    loading,
    items,
    error,
});

export const OttleItemsContext = React.createContext(initialContext);

export const OttleItemsContextProvier = ({ children }) => {
    const [context, setContext] = useState(initialContext);
    const { loading: ottleLoading, ottle } = useContext(OttleContext);

    const fetchOttle = async () => {
        try {
            const { items } = ottle;
            // loading
            setContext(initialContext);
            const data = await getItemsById(items);
            // fulfilled
            setContext(
                createContext({ ...context, loading: false, items: data })
            );
        } catch (err) {
            console.error(err);
            // rejected
            setContext(
                createContext({
                    ...context,
                    loading: false,
                    items: null,
                    error: true,
                })
            );
        }
    };

    useEffect(() => {
        if (ottleLoading) return;
        fetchOttle();
    }, [ottleLoading]);

    return (
        <OttleItemsContext.Provider value={context}>
            {children}
        </OttleItemsContext.Provider>
    );
};

export const OttleItemsContextProvierHoC = (Component) => (props) => (
    <OttleItemsContextProvier>
        <Component {...props} />
    </OttleItemsContextProvier>
);
