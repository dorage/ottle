import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OttleDetailHeader } from './Header';
import { FullScreenContainer } from '../../components/Layout/Container';
import { Ottle } from '../../components/Ottle';
import { selectUser } from '../../features/user/userSlice';
import { getMyOttle, getOttleDetail } from '../../app/firestore';

//#region styled-components
const OttleSection = styled.div`
    padding-top: ${(props) => props.theme.gap.gap_16};
`;
//#endregion

export const OttleDetail = (props) => {
    const [{ data, loading, error }, fetchData] = useState({
        data: null,
        loading: true,
        error: false,
    });
    const { user } = useSelector(selectUser);
    const { username, ottleId } = useParams();

    useEffect(() => {
        let promise = getOttleDetail(username, ottleId);
        promise
            .then((data) => {
                fetchData({ data, loading: false, error: false });
            })
            .catch((error) => {
                fetchData({ data: null, loading: false, error: true });
            });
    }, []);
    useEffect(() => {
        console.log(data, loading, error);
    }, [data, loading, error]);

    return (
        <FullScreenContainer>
            {!error ? (
                <>
                    <OttleDetailHeader loading={loading} data={data} />
                    <OttleSection>
                        <Ottle loading={loading} data={data} />
                    </OttleSection>
                </>
            ) : (
                <></>
            )}
        </FullScreenContainer>
    );
};
