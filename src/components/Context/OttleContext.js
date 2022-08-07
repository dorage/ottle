import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getOttleDetailByNanoID } from '../../app/firestore';

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

const OttleDetailContext = React.createContext(initialContext);

export const OttleContextProvier = ({ children }) => {
    const [context, setContext] = useState(initialContext);
    const { username, nanoid } = useParams();

    const fetchOttle = async () => {
        try {
            // loading
            setContext(initialContext);
            const data = await getOttleDetailByNanoID(username, nanoid);
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
        fetchOttle();
    });

    return (
        <OttleDetailContext.Provider value={context}>
            {children}
        </OttleDetailContext.Provider>
    );
};
