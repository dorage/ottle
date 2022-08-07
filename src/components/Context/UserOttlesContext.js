import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { _ } from '../../utils/fp';
import { getOttlesByUID, PAGE } from '../../app/firestore';
import { useOutletContext } from 'react-router-dom';

export const contextUtility = (object) => {
    const initialContext = object;
    const createContext = (obj) => ({ ...object, ...obj });
    return [initialContext, createContext];
};

const initialContext = {
    lastPage: false,
    loading: true,
    ottles: [],
    error: false,
};

const createContext = ({ lastPage, loading, ottles, error }) => ({
    lastPage,
    loading,
    ottles,
    error,
});

export const UserOttlesContext = React.createContext(initialContext);

export const UserOttlesContextProvider = ({ children }) => {
    const [context, setContext] = useState(initialContext);
    const { setOnScrollEvent } = useOutletContext();
    const { loading: userLoading, user } = useContext(UserContext);

    const fetchOttles = async (context, firstPage) => {
        if (context.lastPage) return;
        try {
            // loading
            setContext(
                createContext({ ...context, loading: true, error: false })
            );
            const data = await getOttlesByUID(user.uid, firstPage);
            // fulfilled
            setContext(
                createContext({
                    ...context,
                    loading: false,
                    lastPage: data.length < PAGE,
                    ottles: [...context.ottles, ...data],
                })
            );
        } catch (err) {
            console.error(err);
            // rejected
            setContext(
                createContext({
                    ...context,
                    loading: false,
                    lastPage: true,
                    error: true,
                })
            );
        }
    };

    // user가 로드될 떄 ottle들을 로드
    useEffect(() => {
        // loading 중인 경우
        if (userLoading) return;
        // 첫번째 ottle 데이터 불러오기
        fetchOttles(context, true);
    }, [user]);

    // context가 변경될 때 마다 새로운 context를 담은 scroll event 저장
    useEffect(() => {
        if (context.loading) return;
        // scroll 이벤트 등록
        setOnScrollEvent((pageRef) => (e) => {
            if (
                pageRef.current.scrollHeight -
                    (pageRef.current.scrollTop +
                        pageRef.current.clientHeight) ===
                0
            ) {
                fetchOttles(context, false);
            }
        });
    }, [context.loading]);

    return (
        <UserOttlesContext.Provider value={context}>
            {children}
        </UserOttlesContext.Provider>
    );
};
