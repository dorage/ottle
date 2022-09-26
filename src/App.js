import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './configs/routes';
import { Profile } from './routes/Profile';
import { OttleDetail } from './routes/OttleDetail';
import { PageNotFound } from './routes/PageNotFound';
import { OttleMaker } from './routes/OttleCreate';
import { useSelector } from 'react-redux';
import { HomeLayout } from './routes/HomeLayout';
import { selectUser } from './features/user/userSlice';
import { ScreenHoC } from './components/HOC/ScreenHoC';
import { AuthHoC } from './components/HOC/AuthHoC';
import { DesktopNotReady } from './routes/DesktopNotReady';
import { SignIn } from './routes/SignIn';
import { Registration } from './routes/Registration';
import { MobileScreenHoC } from './components/HOC/MobileScreenHoC';
import { Landing } from './routes/Landing';

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const { isAuth, user } = useSelector(selectUser);

    useEffect(() => {
        // userAgent 체크해서 모바일인지 확인
        setIsMobile(
            navigator.userAgent
                .toLowerCase()
                .match(/(iphone)|(android)|(mobile)/g)
        );
    }, []);

    if (isAuth && !user.is_registered) return <Registration />;

    // 로그인 하지 않은 상태
    if (!isAuth) {
        return (
            <Routes>
                <Route
                    path={routes.ottleCreate()}
                    element={<Navigate to={routes.profile()} />}
                />
                <Route path={routes.ottleDetail()} element={<OttleDetail />} />
                <Route
                    path={routes.pageNotFound()}
                    element={<PageNotFound />}
                />
                <Route path={routes.main()} element={<HomeLayout />}>
                    <Route path={routes.main()} element={<Landing />} />
                    <Route path={routes.profile()} element={<SignIn />} />
                    <Route path={routes.user()} element={<Profile />} />
                </Route>
                <Route
                    path='*'
                    element={<Navigate to={routes.pageNotFound()} />}
                />
            </Routes>
        );
    }
    // 로그인을 한 상태
    return (
        <Routes>
            <Route
                path={routes.ottleCreate()}
                element={isMobile ? <OttleMaker /> : <DesktopNotReady />}
            />
            <Route path={routes.ottleDetail()} element={<OttleDetail />} />
            <Route path={routes.pageNotFound()} element={<PageNotFound />} />
            <Route path={routes.main()} element={<HomeLayout />}>
                <Route
                    path={routes.main()}
                    element={<Navigate to={routes.user(user.username)} />}
                />
                <Route
                    path={routes.profile()}
                    element={<Navigate to={routes.user(user.username)} />}
                />
                <Route path={routes.user()} element={<Profile />} />
            </Route>
            <Route path='*' element={<Navigate to={routes.pageNotFound()} />} />
        </Routes>
    );
}

export default MobileScreenHoC(AuthHoC(ScreenHoC(App)));
