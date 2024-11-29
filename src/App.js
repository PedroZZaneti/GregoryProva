// Importacao do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importacap de Estilo CSS padrao
import './App.css';

// Importacao das paginas
import Login from './pages/Login';
import Home from './pages/Home';
import CadastroProduto from './pages/CadastroProduto';
import EditarProduto from './pages/EditarProduto';
import CadastroUsuario from './pages/CadastroUsuario'


// Importacao dos Componentes


//Importacao do gerenciador de rotas
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path="/produto/cadastrar" element={<CadastroProduto />}/>
        <Route path="/usuario/cadastrar" element={<CadastroUsuario />}/>
        <Route path="/produto/editar/:id" element={<EditarProduto/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
