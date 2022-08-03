import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import { SignIn } from './routes/SignIn';
import { Registration } from './routes/Registration';
import { FullScreenContainer } from './components/Layout/Container';
import { MobileScreenHoC } from './components/HOC/MobileScreenHoC';

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const { loading: userLoading, isAuth, user } = useSelector(selectUser);

    useEffect(() => {
        // userAgent 체크해서 모바일인지 확인
        setIsMobile(
            navigator.userAgent
                .toLowerCase()
                .match(/(iphone)|(android)|(mobile)/g)
        );
    }, []);

    if (isAuth && !user.is_registered) return <Registration />;

    return (
        <Routes>
            <Route
                path={routes.ottleCreate()}
                element={isMobile ? <OttleMaker /> : <DesktopNotReady />}
            />
            <Route path={routes.ottleDetail()} element={<OttleDetail />} />
            <Route path={routes.pageNotFound()} element={<PageNotFound />} />
            <Route path='*' element={<Navigate to={routes.pageNotFound()} />} />
            <Route path={routes.main()} element={<HomeLayout />}>
                <Route
                    path={routes.main()}
                    element={<Navigate to={routes.profile()} />}
                />
                <Route
                    path={routes.profile()}
                    element={
                        isAuth ? (
                            <Navigate to={routes.user(user.username)} />
                        ) : (
                            <SignIn />
                        )
                    }
                />
                <Route
                    path={routes.user()}
                    element={
                        isAuth ? (
                            <Profile />
                        ) : (
                            <Navigate to={routes.profile()} />
                        )
                    }
                />
            </Route>
        </Routes>
    );
}

export default MobileScreenHoC(AuthHoC(ScreenHoC(App)));
