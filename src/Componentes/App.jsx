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
const App = () => {

    const [Loginerror,SetLoginerror]= useState(false)

    const [User, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const urlIP = import.meta.env.REACT_APP__IPSQL;

    console.log("url:",urlIP)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(User));
    }, [User]);

    const login = async (usuario) => {
        try {
            const url = '/api/Usuario/' + usuario.mail + "/" + usuario.Pass
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('e?')
                    console.log(result)
                    if(result.id){
                        localStorage.setItem('user', JSON.stringify(result)); // Guardar el usuario en localStorage
                        SetLoginerror(false)
                        window.location.reload();
                    }else{
                        SetLoginerror(true)
                    }
                });
        } catch (error) {
            console.log('errorrr')
        }
    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };



    return (
        <>
            { User ? <NavBar logged={User !== null} onLogout={handleLogout}/>: null } 
            <Routes>
                <Route path='/Ventas' element={
                    <ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
                        <Ventas />
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
                <Route path='/WareHouse' element={<ProtectedRoute user={User} login={login} errorLogin={Loginerror}>
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