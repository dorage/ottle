import styled from 'styled-components';
import { LinkHoC } from '../HOC/LinkHoC';

export const RoundButton = styled.button`
    padding: 0.4rem 1.6rem;

    color: ${(props) => props.color || 'white'};
    font-size: 1.4rem;
    font-weight: 700;

    border: none;
    border-radius: 2rem;
    background: ${(props) => props.bg || props.theme.color.black_400};
`;
export const LinkedRoundButton = LinkHoC(RoundButton);

export const SemiRoundButton = styled.button`
    padding-top: ${(props) => props.theme.gap.gap_4};
    padding-bottom: ${(props) => props.theme.gap.gap_4};
    padding-left: ${(props) => props.theme.gap.gap_16};
    padding-right: ${(props) => props.theme.gap.gap_16};

    color: ${(props) => props.color || 'white'};
    font-size: 1.4rem;
    font-weight: 700;

    border: none;
    border-radius: 0.5rem;
    background: ${(props) => props.bg || props.theme.color.black_400};
`;
export const LinkedSemiRoundButton = LinkHoC(RoundButton);
