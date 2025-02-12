import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectThread,
    threadAsyncAction,
} from '../../features/main/ThreadSlice';
import { Ottle } from '../../components/Ottle';
import { routes } from '../../configs/routes';
import { LoadingBlock } from '../../components/OttleCreateItemDrawer/LoadingItem';

//#region styled-components
const Container = styled.div``;
const Thread = styled.div`
    padding: ${(props) => props.theme.gap.gap_16} 0;
    border-bottom: 1px solid ${(props) => props.theme.color.black_600};
`;
//#endregion

export const MainThread = () => {
    const dispatch = useDispatch();
    const { setOnScrollEvent } = useOutletContext();
    const { lastPage, data, loading, error } = useSelector(selectThread);

    const fetchData = () => {
        if (lastPage) return;
        dispatch(threadAsyncAction());
    };

    useEffect(() => {
        if (!data.length) fetchData();
        setOnScrollEvent((pageRef) => (e) => {
            if (
                pageRef.current.scrollHeight -
                    (pageRef.current.scrollTop +
                        pageRef.current.clientHeight) ===
                0
            ) {
                fetchData();
            }
        });
    }, []);

    return (
        <Container className='pad'>
            {data.map((e, idx) => (
                <Thread key={idx}>
                    <Ottle
                        to={routes.ottleDetail(e.user.username, e.ottle.id)}
                        loading={loading}
                        data={e}
                    />
                </Thread>
            ))}
        </Container>
    );
};
