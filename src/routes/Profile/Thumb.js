import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../configs/routes';
import { AiFillEyeInvisible } from 'react-icons/ai';

//#region styled-components
const Container = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
`;
const Thumb = styled.div`
    width: 100%;
    height: 100%;

    background-color: ${(props) => props.theme.color.black_600};
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-position: center;
`;
const VisibleOption = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 2rem;
    height: 2rem;
    aspect-ratio: 1/1;
    padding: ${(props) => props.theme.gap.gap_4};

    & > svg {
        width: 1.5rem;
        height: 1.5rem;
        opacity: 0.3;
    }
`;
//#endregion

export const ProfileOttleThumb = ({
    ottle: { id, image, nanoid, visible: isVisible },
}) => {
    const navigation = useNavigate();
    const { username } = useParams();

    const onClickOttle = (ottleId) => () => {
        console.log('ho');
        navigation(routes.ottleDetail(username, ottleId));
    };

    return (
        <Container onClick={onClickOttle(nanoid)}>
            <Thumb src={image.original} />
            {isVisible === false && (
                <VisibleOption>
                    <AiFillEyeInvisible />
                </VisibleOption>
            )}
        </Container>
    );
};
