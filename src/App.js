import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './configs/routes';
import { Main } from './routes/Main';
import { Likes } from './routes/Likes';
import { Groups } from './routes/Groups';
import { Profile } from './routes/Profile';
import { OttleDetail } from './routes/OttleDetail';
import { PageNotFound } from './routes/PageNotFound';
import { OttleMaker } from './routes/OttleCreate';
import { RouterPanel } from './components/devs/RouterPanel';
import { useSelector } from 'react-redux';
import { HomeLayout } from './routes/HomeLayout';
import { selectUser } from './features/user/userSlice';
import { ScreenHoC } from './components/HOC/ScreenHoC';
import { AuthHoC } from './components/HOC/AuthHoC';
import { DesktopNotReady } from './routes/DesktopNotReady';
import styled from 'styled-components';

export const Background = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.color.black_600};
`;

function App() {
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // userAgent 체크해서 모바일인지 확인
        setIsMobile(
            navigator.userAgent
                .toLowerCase()
                .match(/(iphone)|(android)|(mobile)/g)
        );
    }, []);

    return (
        <Background>
            <BrowserRouter>
                {process.env.NODE_ENV === 'development' && <RouterPanel />}
                <Routes>
                    <Route path={routes.main} element={<HomeLayout />}>
                        <Route path={routes.main} element={<Main />} />
                        <Route path={routes.likes} element={<Likes />} />
                        <Route path={routes.boards} element={<Groups />} />
                        <Route path={routes.profile} element={<Profile />} />
                    </Route>
                    <Route
                        path={routes.ottleCreate}
                        element={
                            isMobile ? <OttleMaker /> : <DesktopNotReady />
                        }
                    />
                    <Route
                        path={routes.ottleDetail()}
                        element={<OttleDetail />}
                    />
                    <Route path={routes.productDetail()} element={<Main />} />
                    <Route path={routes.settings} element={<Main />} />
                    <Route
                        path={routes.pageNotFound}
                        element={<PageNotFound />}
                    />
                    <Route
                        path='*'
                        element={<Navigate to={routes.pageNotFound} />}
                    />
                </Routes>
            </BrowserRouter>
        </Background>
    );
}

export default ScreenHoC(AuthHoC(App));
