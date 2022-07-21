import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { resizeScreen } from '../../features/screen/screenSlice';

export const ScreenHoC = (Component) => (props) => {
    const dispatch = useDispatch();

    // 화면 크기 정보를 업데이트
    const updateScreenSize = () => {
        dispatch(resizeScreen({ w: window.innerWidth, h: window.innerHeight }));
    };

    useEffect(() => {
        // 화면 사이즈 체크
        updateScreenSize();
        // resize 리스너 등록
        window.addEventListener('resize', updateScreenSize);
    }, []);

    return (
        <>
            <Component {...props} />
        </>
    );
};
