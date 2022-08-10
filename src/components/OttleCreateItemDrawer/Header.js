import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HeaderContainer } from '../Layout/Header';
import { IconButton } from '../Button/IconButton';
import { HiChevronLeft, HiX } from 'react-icons/hi';
import { selectItemDrawerCategory } from '../../features/ottleMaker/itemDrawerCategorySlice';
import { selectItemDrawerSearch } from '../../features/ottleMaker/itemDrawerSearchSlice';

//#region styled-components
const Path = styled.div`
    font-size: ${(props) => props.theme.font.p14};
    font-weight: 600;
`;
//#endregion

export const ItemDrawerHeader = ({
    onClickBack,
    onClickSearchBack,
    onClickClose,
}) => {
    const { history, path } = useSelector(selectItemDrawerCategory);
    const { isSearching, path: searchPath, term } = useSelector(
        selectItemDrawerSearch
    );

    if (isSearching)
        return (
            <HeaderContainer>
                <IconButton
                    icon={<HiChevronLeft />}
                    onClick={onClickSearchBack}
                />
                <Path>
                    {searchPath.map((e) => e.name).join(' > ')} ({term})
                </Path>
                <IconButton icon={<HiX />} onClick={onClickClose} />
            </HeaderContainer>
        );

    return (
        <HeaderContainer>
            {history.length ? (
                <>
                    <IconButton
                        icon={<HiChevronLeft />}
                        onClick={onClickBack}
                    />
                    <Path>{path.map((e) => e.name).join(' > ')}</Path>
                </>
            ) : (
                <IconButton />
            )}
            <IconButton icon={<HiX />} onClick={onClickClose} />
        </HeaderContainer>
    );
};
