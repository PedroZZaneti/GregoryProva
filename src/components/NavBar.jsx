import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
  return (
    <div>
    <Navbar bg='dark' data-bs-theme="dark">
        <Container>
            {/* Texto logo */}
          <Navbar.Brand href="#home">Cupcakes do Gregory</Navbar.Brand>
          <Navbar.Toggle aria-controls='minha-nav' />
          <Navbar.Collapse id="minha-nav">
          {/* Paginas */}
          <Nav className="me-auto">
            <Nav.Link href="/home" className='active'>Produtos</Nav.Link>
            <Nav.Link href="/produto/cadastrar">Cadastro</Nav.Link>
            <Nav.Link href="/usuario/cadastrar">Criar Novo Usuario</Nav.Link>
          </Nav>
          {/* Sair */}
          <Nav className="justify-content-end">
            <Nav.Link href="/login" onClick={localStorage.removeItem("userName")}
            >Sair</Nav.Link>
          </Nav>
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
