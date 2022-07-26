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
const Image = styled.img`
    width: 100%;
    aspect-ratio: 1/1;
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
            {loading ? (
                <></>
            ) : data ? (
                <>
                    {data.map((e) => (
                        <Image src={e.image.lg} />
                    ))}
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};
