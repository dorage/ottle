import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiGhostSmileLine, RiGhostSmileFill } from 'react-icons/ri';
import { IconButton } from '../../components/Button/IconButton';
import { LinkedTextButton } from '../../components/Button/TextButton';
import { routes } from '../../configs/routes';
import { FullScreenContainer } from '../../components/Layout/Container';

const Container = styled(FullScreenContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;

    font-size: ${(props) => props.theme.font.p16};
    text-align: center;
`;
const Text = styled.div`
    margin-bottom: ${(props) => props.theme.gap.gap_32};
`;

export const PageNotFound = () => {
    const [click, setClick] = useState(false);

    useEffect(() => {
        setTimeout(() => setClick(!click), 1000);
    }, [click]);

    return (
        <Container>
            <IconButton
                w={64}
                h={64}
                active={true}
                icon={click ? <RiGhostSmileLine /> : <RiGhostSmileFill />}
            />
            <Text>
                우리가 아직 만들지 않은 페이지에요
                <br />
                다음에 다시 만나요 :)
            </Text>
            <LinkedTextButton to={routes.main()}>
                홈으로 돌아가기 →
            </LinkedTextButton>
        </Container>
    );
};
