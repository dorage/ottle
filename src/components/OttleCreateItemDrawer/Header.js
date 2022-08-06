import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HeaderContainer } from '../Layout/Header';
import { IconButton } from '../Button/IconButton';
import { HiChevronLeft, HiX } from 'react-icons/hi';
import { selectItemDrawerCategory } from '../../features/ottleMaker/itemDrawerCategorySlice';

//#region styled-components
const Path = styled.div`
    font-size: ${(props) => props.theme.font.p14};
    font-weight: 600;
`;
//#endregion

export const ItemDrawerHeader = ({ onClickBack, onClickClose }) => {
    const { history, path } = useSelector(selectItemDrawerCategory);
    return (
        <HeaderContainer>
            {history.length ? (
                <>
                    <IconButton
                        icon={<HiChevronLeft />}
                        onClick={onClickBack}
                    />
                    <Path>{path.join(' / ')}</Path>
                </>
            ) : (
                <IconButton />
            )}
            <IconButton icon={<HiX />} onClick={onClickClose} />
        </HeaderContainer>
    );
};
