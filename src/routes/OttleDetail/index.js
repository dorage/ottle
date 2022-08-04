import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OttleDetailHeader } from './Header';
import { FullScreenContainer } from '../../components/Layout/Container';
import { Ottle } from '../../components/Ottle';
import { selectUser } from '../../features/user/userSlice';
import {
    getMyOttle,
    getOttleDetail,
    getOttleDetailByNanoID,
} from '../../app/firestore';
import { OttleItems } from '../../components/Ottle/Items';

//#region styled-components
const Container = styled.div`
    width: 100%;
    height: 100%;
    padding-bottom: ${(props) => props.theme.gap.gap_64};

    overflow: scroll;
`;
const OttleSection = styled.div`
    padding-top: ${(props) => props.theme.gap.gap_16};
    margin-bottom: ${(props) => props.theme.gap.gap_32};
`;
const ItemSection = styled.div``;
const Divider = styled.div`
    margin-bottom: ${(props) => props.theme.gap.gap_32};
    & > hr {
        color: ${(props) => props.theme.color.black_600};
    }
`;
//#endregion

export const OttleDetail = () => {
    const [{ data, loading, error }, fetchData] = useState({
        data: null,
        loading: true,
        error: false,
    });
    const { username, nanoid } = useParams();

    const fetchOttle = async () => {
        try {
            const data = await getOttleDetailByNanoID(username, nanoid);
            fetchData({ data, loading: false, error: false });
        } catch (err) {
            console.log(err);
            fetchData({ data: null, loading: false, error: true });
        }
    };

    useEffect(() => {
        fetchOttle();
    }, []);

    return (
        <FullScreenContainer>
            <Container>
                {loading ? (
                    <></>
                ) : !error ? (
                    <>
                        <OttleDetailHeader data={data} />
                        <OttleSection className='pad'>
                            <Ottle data={data} />
                        </OttleSection>
                        <Divider className='pad'>
                            <hr />
                        </Divider>
                        <ItemSection className='pad'>
                            <OttleItems items={data.items} />
                        </ItemSection>
                    </>
                ) : (
                    <></>
                )}
            </Container>
        </FullScreenContainer>
    );
};
