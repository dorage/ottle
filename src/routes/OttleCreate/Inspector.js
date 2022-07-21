import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { ArtboardControlPanel, ItemControlPanel } from './ControlPanel';
import { IconButton } from '../../components/Button/IconButton';
import { HiOutlineInbox, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectOttleItem,
    itemHasSelected,
} from '../../features/ottleMaker/ottleItemSlice';
import { ProductLayer } from './ProductLayer';
import { Textbutton } from '../../components/Button/TextButton';
import { RoundButton } from '../../components/Button/RoundButton';
import { openItemDrawer } from '../../features/ottleMaker/ottleItemDrawerSlice';

//#region styled-components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: white;
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;
const HeaderControls = styled.div`
    display: flex;
    align-items: center;
`;
const LayerContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: ${(props) => props.theme.gap.gap_4};
`;
const NoItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: ${(props) => props.theme.gap.gap_32};
`;
//#endregion

export const Inspector = () => {
    const dispatch = useDispatch();
    const { selected, items } = useSelector(selectOttleItem);
    const [deleteMode, setDeleteMode] = useState(false);

    const turnOnDeleteMode = () => {
        setDeleteMode(true);
    };
    const turnOffDeleteMode = () => {
        setDeleteMode(false);
    };

    return (
        <Container className='pad'>
            {itemHasSelected(selected) ? (
                <ItemControlPanel />
            ) : (
                <ArtboardControlPanel />
            )}
            <Header>
                <h1>Products</h1>
                <HeaderControls>
                    {deleteMode ? (
                        <>
                            <Textbutton onClick={turnOffDeleteMode}>
                                완료
                            </Textbutton>
                        </>
                    ) : (
                        <>
                            <IconButton
                                w={24}
                                h={24}
                                icon={<HiOutlineTrash />}
                                onClick={turnOnDeleteMode}
                            />
                            <IconButton
                                w={24}
                                h={24}
                                icon={<HiOutlinePlus />}
                                onClick={() => {
                                    dispatch(openItemDrawer());
                                }}
                            />
                        </>
                    )}
                </HeaderControls>
            </Header>
            {items.length ? (
                <LayerContainer>
                    {items.map((e, idx) => (
                        <ProductLayer
                            key={idx}
                            index={idx}
                            src={e.src}
                            selected={selected === idx}
                            deleteMode={deleteMode}
                        />
                    ))}
                </LayerContainer>
            ) : (
                <NoItemContainer>
                    <IconButton
                        active={true}
                        w={64}
                        h={64}
                        icon={<HiOutlineInbox />}
                    />
                    <h1>아이템이 없어요 :\</h1>
                    <RoundButton
                        onClick={() => {
                            dispatch(openItemDrawer());
                        }}
                    >
                        아이템 추가하기
                    </RoundButton>
                </NoItemContainer>
            )}
        </Container>
    );
};
