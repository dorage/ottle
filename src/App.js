import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    // TODO; 나중에 삭제
    if (process.env.NODE_ENV === 'development') {
        const state = useSelector(selectArtboard);
        useEffect(() => {
            console.log(state);
        }, [state]);
    }

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
                <Route path={routes.ottleCreate} element={<OttleMaker />} />
                <Route path={routes.ottleDetail()} element={<Main />} />
                <Route path={routes.ottleEdit()} element={<Main />} />
                <Route path={routes.productDetail()} element={<Main />} />
                <Route path={routes.settings} element={<Main />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
