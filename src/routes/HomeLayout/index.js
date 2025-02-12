import React, { useRef } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { FullScreenContainer } from '../../components/Layout/Container';
import { HomeLayoutHeader } from './Header';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-y: scroll;
`;

const ContentSection = styled.div`
    flex: 1;
    padding-top: ${(props) => props.theme.gap.gap_8};
    padding-bottom: ${(props) => props.theme.gap.gap_64};
`;

const FooterBlock = styled.div`
    height: 5rem;
    margin-top: ${(props) => props.theme.gap.gap_32};
`;

export const HomeLayout = () => {
    const pageRef = useRef();

    const setOnScrollEvent = (event) => {
        pageRef.current.onscroll = event(pageRef);
    };

    return (
        <FullScreenContainer>
            <Page ref={pageRef}>
                <HomeLayoutHeader />
                <ContentSection>
                    <Outlet context={{ setOnScrollEvent }} />
                </ContentSection>
            </Page>
        </FullScreenContainer>
    );
};
