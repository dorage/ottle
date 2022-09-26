import React, { useContext } from 'react';
import styled from 'styled-components';
import { NoItem } from './NoItem';
import { UserOttlesContext } from '../../components/Context/UserOttlesContext';
import { ProfileOttleThumb } from './Thumb';

//#region styled-components
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${(props) => props.theme.gap.gap_4};
`;
const LoadingThumb = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    background-color: ${(props) => props.theme.color.black_600};
`;
//#endregion

export const ProfileItems = () => {
    const { lastPage, loading, ottles, error } = useContext(UserOttlesContext);

    if (!lastPage && loading && !ottles.length)
        return (
            <Container className='pad'>
                {Array(9)
                    .fill()
                    .map((_, idx) => (
                        <LoadingThumb key={idx} />
                    ))}
            </Container>
        );

    if (ottles.length)
        return (
            <Container className='pad'>
                {ottles.map((ottle) => {
                    return <ProfileOttleThumb key={ottle.id} ottle={ottle} />;
                })}
                {!lastPage && loading && (
                    <>
                        <LoadingThumb />
                        <LoadingThumb />
                        <LoadingThumb />
                    </>
                )}
            </Container>
        );

    if (!loading && !ottles.length) return <NoItem />;

    if (error) return <></>;
};
