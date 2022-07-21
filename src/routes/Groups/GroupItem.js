import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MAX_WIDTH_INT, MAX_WIDTH_PX } from '../../assets/styles/GlobalStyles';

//#region styled-components
const Container = styled.div``;
const Ottles = styled.div`
    position: relative;
    display: flex;
    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
const Ottle = styled.div`
    width: calc(
        (
                ${window.innerWidth > MAX_WIDTH_INT ? MAX_WIDTH_PX : '100vw'} -
                    (3.2rem * 4)
            ) / 3
    ); // 3.2rem은 간격
    aspect-ratio: 1/1;

    background-color: #ffffff;
    background-image: url(${(props) => props.src});
    background-size: cover;
    border: 1px solid ${(props) => props.theme.color.black_600};
    border-radius: ${(props) => props.theme.gap.gap_8};

    &:first-child {
        z-index: 3;
    }
    &:nth-child(2) {
        position: absolute;
        left: 20%;
        z-index: 2;
    }
    &:nth-child(3) {
        position: absolute;
        left: 40%;
        z-index: 1;
    }
`;
const Title = styled.div`
    margin-bottom: ${(props) => props.theme.gap.gap_4};
    font-size: ${(props) => props.theme.font.p14};
    font-weight: 700;
`;
const Description = styled.div`
    font-size: ${(props) => props.theme.font.p10};
`;
//#endregion

export const GroupItem = ({ group }) => {
    const { ottleCount, saveCount, imgSrc } = group;
    /*
    TODO;
    groups : [
        group: {
            name, saveCount, ottleCount, src: Array(3)
        }
    ]
    
    */
    return (
        <Container>
            <Ottles>
                <Ottle src={ottleCount < 1 ? '' : imgSrc} />
                <Ottle src={ottleCount < 2 ? '' : imgSrc} />
                <Ottle src={ottleCount < 3 ? '' : imgSrc} />
            </Ottles>
            <Title>내가 저장한 옷뜰</Title>
            <Description>
                {ottleCount}개의 옷뜰, {saveCount}명 저장
            </Description>
        </Container>
    );
};
