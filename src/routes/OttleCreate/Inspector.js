import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ControlPanel } from './ControlPanel';
import { IconButton } from '../../components/IconButton/IconButton';
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';

//#region styled-components
const Container = styled.div`
    background-color: white;
    height: 100%;
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;
const HeaderControls = styled.div`
    display: flex;
    align-items: center;
`;
const LayerContainer = styled.div``;
const Row = styled.div`
    display: flex;
    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
const FlexBox = styled.div`
    flex: 1;
`;
const SmallProfile = styled.div`
    border-radius: 2rem;
    background-color: ${(props) => props.theme.color.black_600};
    aspect-ratio: 1/1;
`;
//#endregion

const Product = ({ src }) => (
    <FlexBox>
        <SmallProfile imgSrc={src} />
    </FlexBox>
);

export const Inspector = () => {
    return (
        <Container className='pad'>
            <ControlPanel />
            <Header>
                <h1>Products</h1>
                <HeaderControls>
                    <IconButton w={24} h={24} icon={<HiOutlineTrash />} />
                    <IconButton w={24} h={24} icon={<HiOutlinePlus />} />
                </HeaderControls>
            </Header>
            <LayerContainer>
                <Row>
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </Row>
                <Row>
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </Row>
                <Row>
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </Row>
            </LayerContainer>
        </Container>
    );
};
