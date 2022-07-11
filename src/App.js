import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './configs/routes';
import { Main } from './routes/Main';
import { Likes } from './routes/Likes';
import { Boards } from './routes/Boards';
import { Profile } from './routes/Profile';
import { PageNotFound } from './routes/PageNotFound';
import { OttleMaker } from './routes/OttleCreate';
import { Layout } from './components/Layout';
import { RouterPanel } from './components/devs/RouterPanel';
import { useSelector } from 'react-redux';
import { selectArtboard } from './features/ottleMaker/artboardSlice';

function App() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(
            navigator.userAgent
                .toLowerCase()
                .match(/(iphone)|(android)|(mobile)/g)
        );
    }, []);

    return (
        <BrowserRouter>
            {process.env.NODE_ENV === 'development' && <RouterPanel />}
            <Routes>
                <Route path={routes.main} element={<Layout />}>
                    <Route path={routes.main} element={<Main />} />
                    <Route path={routes.likes} element={<Likes />} />
                    <Route path={routes.boards} element={<Boards />} />
                    <Route path={routes.profile} element={<Profile />} />
                </Route>
                <Route
                    path={routes.ottleCreate}
                    element={isMobile ? <OttleMaker /> : <OttleMaker />}
                />
                <Route path={routes.ottleDetail()} element={<Main />} />
                <Route path={routes.ottleEdit()} element={<Main />} />
                <Route path={routes.productDetail()} element={<Main />} />
                <Route path={routes.settings} element={<Main />} />
                <Route path={routes.pageNotFound} element={<PageNotFound />} />
                <Route
                    path='*'
                    element={<Navigate to={routes.pageNotFound} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
