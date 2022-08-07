import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OttleDetailHeader } from './Header';
import { FullScreenContainer } from '../../components/Layout/Container';
import { Ottle } from '../../components/Ottle';
import { OttleItems } from './Items';
import { logEventFirebase } from '../../app/analytics';
import {
    OttleContext,
    OttleContextProvierHoc,
} from '../../components/Context/OttleContext';
import { OttleItemsContextProvierHoC } from '../../components/Context/OttleItemsContext';
import {
    UserContext,
    UserContextProviderHoC,
} from '../../components/Context/UserContext';
import { Divider } from '../HomeLayout/Divider';

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
//#endregion

const Component = () => {
    const { loading, ottle } = useContext(OttleContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        logEventFirebase('watch_ottle_detail', { isMe: false });
    }, []);

    return (
        <FullScreenContainer>
            <Container>
                <OttleDetailHeader />
                <OttleSection className='pad'>
                    <Ottle loading={loading} user={user} ottle={ottle} />
                </OttleSection>

                <h1 className='pad'>Items</h1>
                <OttleItems />
            </Container>
        </FullScreenContainer>
    );
};

export const OttleDetail = UserContextProviderHoC(
    OttleContextProvierHoc(OttleItemsContextProvierHoC(Component))
);
