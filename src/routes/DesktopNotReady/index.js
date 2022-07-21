import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiMacLine, RiMacbookLine } from 'react-icons/ri';
import { BiExit } from 'react-icons/bi';
import { IconButton } from '../../components/Button/IconButton';
import { LinkedTextButton } from '../../components/Button/TextButton';
import { routes } from '../../configs/routes';

const Container = styled.div`
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

export const DesktopNotReady = () => {
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
                icon={click ? <RiMacLine /> : <RiMacbookLine />}
            />
            <Text>
                PC에선 아직 지원하지 않고 있어요 :"
                <br />
                다음에 다시 만나요.
            </Text>
            <LinkedTextButton to={routes.main}>
                홈으로 돌아가기 →
            </LinkedTextButton>
        </Container>
    );
};
