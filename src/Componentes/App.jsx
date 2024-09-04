import { React, useState, useEffect, useNavigate } from 'react';
import { NavBar } from './NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Ventas } from '../Routes/Ventas';
import { CrearVenta } from '../Routes/CrearVenta';
import { Facturas } from '../Routes/Facturas';
import { Clientes } from '../Routes/Clientes';
import { Warehouse } from '../Routes/Warehouse';
import { Instalaciones } from '../Routes/Instalaciones';
import { ProtectedRoute } from '../Routes/ProtectedRoute';
import { Login } from '../Routes/Login';
import { Provedores } from '../Routes/Provedores';
import { EstadoVentas } from '../Routes/EstadoVentas';
import { MesaCorteTela } from '../Routes/MesaCorteTela';
import { MesaCorteCano } from '../Routes/MesaCorteCano';
import { MesaArmado } from '../Routes/MesaArmado';
import Home from '../Routes/Home';

const App = () => {

    const [Loginerror,setLoginError]= useState(false)

    const [User, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const urlIP = import.meta.env.REACT_APP__IPSQL;


    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(User));
    }, [User]);

    const login = async (usuario) => {
        try {
            const url = `/Usuario/${usuario.mail}/${usuario.Pass}`;
            //const url = `http://192.168.1.130:8085/Usuario/${usuario.mail}/${usuario.Pass}`;
            console.log(url);
    
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
    
            const response = await fetch(url, requestOptions);
            const result = await response.json();
    
            console.log(result);
            
            if (result.id!=0) {
                localStorage.setItem('user', JSON.stringify(result)); // Guardar el usuario en localStorage
                setUser(result)

                setLoginError(false); // Asumiendo que la función se llama setLoginError
                window.location.reload();
            } else {
               setLoginError(true); // Asumiendo que la función se llama setLoginError
            }
        } catch (error) {
            console.log('Error:', error);
            setLoginError(true); 
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };



    return (
        <>
            <Routes>
                <Route path='/Ventas' element={
                    <ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                        <Ventas />
                    </ProtectedRoute>
                } >
                </Route>
                <Route path='/Provedores' element={
                    <ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                        <Provedores/>
                    </ProtectedRoute>
                } ></Route>
                <Route path='/MesaCorteCano' element={
                    <ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                        <MesaCorteCano/>
                    </ProtectedRoute>
                } >
                </Route>
                <Route path='/MesaArmado' element={
                    <ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                        <MesaArmado/>
                    </ProtectedRoute>
                } >
                </Route>
                <Route path='/Clientes' element={
                    <ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                        <Clientes />
                    </ProtectedRoute>
                } >
                </Route>
                <Route path='/CrearVenta' element={<ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                    <CrearVenta />
                </ProtectedRoute>} >

                </Route>
                <Route path='/Deposito' element={<ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                    <Warehouse />
                </ProtectedRoute>} >

                </Route>
                <Route path='/Facturas' element={<ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                    <Facturas />
                </ProtectedRoute>} >

                </Route>
                <Route path='/Instalaciones' element={<ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                    <Instalaciones />
                </ProtectedRoute>} >

                </Route>
                
                <Route path='/MesaCorteTela' element={<ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                    <MesaCorteTela/>
                </ProtectedRoute>} >
                </Route>

                <Route path='/Home' element={<ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                    <Home/>
                </ProtectedRoute>} >
                </Route>

                <Route path='/EstadoVentas' element={<ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                    <EstadoVentas/>
                </ProtectedRoute>} >
                </Route>
                <Route path='/Login' element={
                    <ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                        <Ventas />
                    </ProtectedRoute>
                }>

                </Route>
                <Route path='/*' element={
                    <ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                        <Ventas />
                    </ProtectedRoute>} >
                    
                </Route>
            </Routes>
        </>
    );
}

export default App;