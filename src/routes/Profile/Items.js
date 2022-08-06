import React, { useContext } from 'react';
import { routes } from '../../configs/routes';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { NoItem } from './NoItem';
import { UserOttleContext } from './UserOttleContext';

//#region styled-components
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${(props) => props.theme.gap.gap_4};
`;
const OttleThumb = styled.div`
    width: 100%;
    aspect-ratio: 1/1;

    background-color: ${(props) => props.theme.color.black_600};
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-position: center;
`;
const LoadingThumb = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    background-color: ${(props) => props.theme.color.black_600};
`;
//#endregion

export const ProfileItems = () => {
    const navigation = useNavigate();
    const { username } = useParams();
    const { lastPage, loading, ottles, error } = useContext(UserOttleContext);

    const onClickOttle = (ottleId) => () => {
        navigation(routes.ottleDetail(username, ottleId));
    };

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
                {ottles.map(({ id, image, nanoid }) => {
                    return (
                        <OttleThumb
                            key={id}
                            src={image.original}
                            onClick={onClickOttle(nanoid)}
                        />
                    );
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
