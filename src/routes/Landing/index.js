import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { getOttleForLanding } from '../../app/firestore';
import { LinkedGradientButton } from '../../components/Button/GradientButton';
import { routes } from '../../configs/routes';
import { randomI, randomF, clamp } from '../../configs/utils';
import { useSelector } from 'react-redux';
import { selectScreen } from '../../features/screen/screenSlice';

//#region styled-components
const Container = styled.div`
    text-align: center;
`;
const rotation = keyframes`
    from{
    transform: rotateY(0deg);
    }
    to{
    transform: rotateY(360deg);
    }
`;
const OttleSlide = styled.div`
    position: relative;
    width: 100%;
    margin: ${(props) => props.theme.gap.gap_32} 0;
    aspect-ratio: 2/1;
    transform-style: preserve-3d;
    animation: ${rotation} 20s linear infinite;
`;
const Ottle = styled.div`
    position: absolute;
    top: ${(props) => `${props.x}px`};
    left: ${(props) => `${props.y}px`};
    width: 50%;
    aspect-ratio: 1/1;
    background-color: ${(props) => props.theme.color.black_600};
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.3);

    &:nth-child(1) {
        transform: rotateY(0deg) translateZ(${(props) => `${props.w}px`});
    }
    &:nth-child(2) {
        transform: rotateY(36deg) translateZ(${(props) => `${props.w}px`});
    }
    &:nth-child(3) {
        transform: rotateY(72deg) translateZ(${(props) => `${props.w}px`});
    }
    &:nth-child(4) {
        transform: rotateY(108deg) translateZ(${(props) => `${props.w}px`});
    }
    &:nth-child(5) {
        transform: rotateY(144deg) translateZ(${(props) => `${props.w}px`});
    }
    &:nth-child(6) {
        transform: rotateY(180deg) translateZ(${(props) => `${props.w}px`});
    }
    &:nth-child(7) {
        transform: rotateY(216deg) translateZ(${(props) => `${props.w}px`});
    }
    &:nth-child(8) {
        transform: rotateY(252deg) translateZ(${(props) => `${props.w}px`});
    }
    &:nth-child(9) {
        transform: rotateY(288deg) translateZ(${(props) => `${props.w}px`});
    }
    &:nth-child(10) {
        transform: rotateY(324deg) translateZ(${(props) => `${props.w}px`});
    }
`;
const Description = styled.div`
    margin-bottom: ${(props) => props.theme.gap.gap_16};

    font-size: ${(props) => props.theme.font.p16};
    line-height: 1.4;
`;
//#endregion

const mockData = [
    'https://picsum.photos/1080',
    'https://picsum.photos/1080',
    'https://picsum.photos/1080',
    'https://picsum.photos/1080',
    'https://picsum.photos/1080',
    'https://picsum.photos/1080',
    'https://picsum.photos/1080',
    'https://picsum.photos/1080',
    'https://picsum.photos/1080',
    'https://picsum.photos/1080',
];

export const Landing = () => {
    const [ottles, setOttles] = useState({
        loading: true,
        data: [],
        error: false,
    });
    const { w } = useSelector(selectScreen);
    console.log(clamp(w, 0, 800));
    const fetchOttles = async () => {
        try {
            setOttles({ ...ottles, loading: true, error: false });
            const data = await getOttleForLanding();
            setOttles({
                ...ottles,
                loading: false,
                data,
            });
        } catch (err) {
            console.log(err);
            setOttles({ ...ottles, loading: false, error: true });
        }
    };

    useEffect(() => {
        fetchOttles();
    }, []);

    return (
        <Container className='pad'>
            <h3>간편하게 코디맵을 만들어</h3>
            <h1>나의 옷뜰을 공유하세요</h1>
            <OttleSlide>
                {process.env.NODE_ENV === 'development'
                    ? mockData.map((ottle, idx) => (
                          <Ottle src={ottle} key={idx} w={clamp(w, 0, 800)} />
                      ))
                    : ottles.data.map((ottle, idx) => (
                          <Ottle
                              src={ottle.image.original}
                              key={idx}
                              w={clamp(w, 0, 800)}
                          />
                      ))}
            </OttleSlide>
            <Description>
                사람들의 시선을 끄는 패션은 분위기가 있습니다.
                <br />
                나의 분위기를 담은 옷뜰을 만들고 사람들과 공유하며
                <br />
                나의 분위기가 사람들을 사로잡는지 확인해보세요.
                <br />
                패션크리에이터가 되는 방법은
                <br />
                생각보다 간단할지 모릅니다.
                <br />
                <br />
                <b>지금 바로 나만의 옷뜰을 만들고 공유해보세요</b>
            </Description>
            <LinkedGradientButton to={routes.profile()}>
                옷뜰 만들러 가기
            </LinkedGradientButton>
        </Container>
    );
};
