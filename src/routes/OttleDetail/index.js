import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OttleDetailHeader } from './Header';
import { FullScreenContainer } from '../../components/Layout/Container';
import { Ottle } from '../../components/Ottle';
import { selectUser } from '../../features/user/userSlice';
import { getMyOttleDoc, getUserOttleDoc } from '../../app/firestore';

//#region styled-components
const Container = styled.div``;
//#endregion

export const OttleDetail = (props) => {
    const [{ data, loading, error }, fetchData] = useState({
        data: null,
        loading: true,
        error: null,
    });
    const { user } = useSelector(selectUser);
    const { username, ottleId } = useParams();

    useEffect(() => {
        let promise =
            user.username === username ? getMyOttleDoc() : getUserOttleDoc();
        promise
            .then((data) => {
                fetchData({ data, loading: false, error: null });
            })
            .catch((error) => {
                fetchData({ data: null, loading: false, error });
            });
    }, []);

    return (
        <FullScreenContainer>
            <OttleDetailHeader />
            <Ottle />
        </FullScreenContainer>
    );
};
