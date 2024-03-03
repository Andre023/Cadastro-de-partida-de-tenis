import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ListCliente from './components/clientes/ListCliente';
import CreateCliente from './components/clientes/CreateCliente';
import UpdateCliente from './components/clientes/UpdateCliente';
import ListQuadra from './components/quadras/ListQuadra';
import CreateQuadra from './components/quadras/CreateQuadra';
import UpdateQuadra from './components/quadras/UpdateQuadra';
import ListPartida from './components/partidas/ListPartida';
import CreatePartida from './components/partidas/CreatePartida';
import UpdatePartida from './components/partidas/UpdatePartida';

const AppRoutes = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/clientes" element={<ListCliente/>} />
                <Route path="/clientes/create" element={<CreateCliente/>} />
                <Route path="/clientes/update/:id" element={<UpdateCliente/>} />

                <Route path="/quadras" element={<ListQuadra/>} />
                <Route path="/quadras/create" element={<CreateQuadra/>} />
                <Route path="/quadras/update/:id" element={<UpdateQuadra/>} />

                <Route path="/partidas" element={<ListPartida/>} />
                <Route path="/partidas/create" element={<CreatePartida/>} />
                <Route path="/partidas/update/:id" element={<UpdatePartida/>} />
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoutes;