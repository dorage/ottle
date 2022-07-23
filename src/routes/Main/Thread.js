import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectThread,
    threadAsyncAction,
} from '../../features/main/ThreadSlice';

//#region styled-components
const Container = styled.div``;
//#endregion

export const MainThread = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(selectThread);
    useEffect(() => {
        dispatch(threadAsyncAction());
    }, []);
    return (
        <Container>
            {loading ? (
                <></>
            ) : data ? (
                <>
                    {data.map((e) => (
                        <img src={e.image.lg} />
                    ))}
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};
