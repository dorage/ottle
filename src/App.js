import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { route } from './configs/routes';
import { Main } from './routes/Main';
import { PageNotFound } from './routes/PageNotFound';
import { RouterPanel } from './components/devs/RouterPanel';
import { OttleCreate } from './routes/OttleCreate';

function App() {
    return (
        <BrowserRouter>
            {process.env.NODE_ENV === 'development' && <RouterPanel />}
            <Routes>
                <Route path={route.main} element={<Main />} />
                <Route path={route.ottleCreate} element={<OttleCreate />} />
                <Route path={route.ottleDetail()} element={<Main />} />
                <Route path={route.ottleEdit()} element={<Main />} />
                <Route path={route.productDetail()} element={<Main />} />
                <Route path={route.likes} element={<Main />} />
                <Route path={route.boards} element={<Main />} />
                <Route path={route.profile} element={<Main />} />
                <Route path={route.settings} element={<Main />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
