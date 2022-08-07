import React, { useContext } from 'react';
import styled from 'styled-components';
import { OttleItemsContext } from '../../components/Context/OttleItemsContext';
import { Item } from './Item';

//#region styled-components
const Container = styled.div``;
//#endregion

export const OttleItems = () => {
    const { loading, items, error } = useContext(OttleItemsContext);

    if (loading)
        return (
            <Container className='pad'>
                <Item loading={true} />
                <Item loading={true} />
                <Item loading={true} />
            </Container>
        );

    if (error) return <></>;

    return (
        <Container className='pad'>
            {items.map((item, idx) => (
                <Item item={item} key={idx} />
            ))}
        </Container>
    );
};
