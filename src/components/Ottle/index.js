import React from 'react';
import styled from 'styled-components';
import { LoadingBlock } from '../OttleCreateItemDrawer/LoadingItem';
import { OttleHeader } from './Header';
import { OttleLikeContextProvierHoC } from '../Context/OttleLikeContext';
import { OttleControls } from './Controls';

//#region styled-components
const Container = styled.div``;
const ImageSection = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
const Body = styled.div`
    margin-bottom: ${(props) => props.theme.gap.gap_4};
    font-size: ${(props) => props.theme.font.p14};
`;
const Image = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-size: contain;
`;
//#endregion

const Component = ({ loading, ottle, user }) => {
    if (loading)
        return (
            <Container>
                <OttleHeader loading={true} />
                <ImageSection>
                    <LoadingBlock />
                </ImageSection>
                <OttleControls />
                <Body></Body>
            </Container>
        );

    return (
        <Container>
            <OttleHeader user={user} />
            <ImageSection>
                <Image src={ottle.image.original} />
            </ImageSection>
            <OttleControls ottle={ottle} user={user} />
            <Body>{ottle.title}</Body>
        </Container>
    );
};

export const Ottle = OttleLikeContextProvierHoC(Component);
