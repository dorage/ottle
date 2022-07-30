import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectThread,
    threadAsyncAction,
} from '../../features/main/ThreadSlice';
import { Ottle } from '../../components/Ottle';
import { routes } from '../../configs/routes';

//#region styled-components
const Container = styled.div``;
const Thread = styled.div`
    padding: ${(props) => props.theme.gap.gap_16} 0;
    border-bottom: 1px solid ${(props) => props.theme.color.black_600};
`;
//#endregion

export const MainThread = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(selectThread);

    useEffect(() => {
        dispatch(threadAsyncAction());
    }, []);

    return (
        <Container className='pad'>
            {!error ? (
                data.map((e, idx) => (
                    <Thread key={idx}>
                        <Ottle
                            to={routes.ottleDetail(e.user.username, e.ottle.id)}
                            loading={loading}
                            data={e}
                        />
                    </Thread>
                ))
            ) : (
                <></>
            )}
        </Container>
    );
};
