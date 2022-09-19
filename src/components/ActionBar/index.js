import React, { useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import styled from 'styled-components';
import { theme } from '../../assets/styles/GlobalStyles';
import { IconButton } from '../Button/IconButton';

//#region styled-components
const Container = styled.div`
    display: flex;
    align-items: center;
`;
const ActionButton = styled(IconButton)`
    transform: rotate(0deg);
    transition: 0.3s linear;
    &.open {
        transform: rotate(90deg);
    }
`;
const Actions = styled.div`
    display: flex;
    opacity: 0;
    transition: 0.3s linear;
    transform: translateX(30%);
    &.open {
        opacity: 1;
        transform: translateX(0);
    }
`;
const Item = styled.div`
    position: relative;
    margin-left: ${(props) => props.theme.gap.gap_8};
`;
//#endregion

export const ActionBar = ({ children }) => {
    const [actionBar, setActionBar] = useState(false);

    const onClickActionBar = () => {
        setActionBar(!actionBar);
    };

    return (
        <Container>
            <Actions className={actionBar && 'open'}>{children}</Actions>
            <ActionButton
                className={actionBar && 'open'}
                h={theme.font.p16}
                active={true}
                icon={<BsCaretDownFill />}
                onClick={onClickActionBar}
            />
        </Container>
    );
};

export const ActionBarItem = ({ onClick, children }) => (
    <Item onClick={onClick}>{children}</Item>
);
