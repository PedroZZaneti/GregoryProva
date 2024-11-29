// importando compontentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// importação de compontentes
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

// importação do Navigate
import { useNavigate } from "react-router-dom";

const urlUsers = "http://localhost:5000/usuarios";

const CadastroUsuario = () => {
  
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  // Variaveis para alerta
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  // Criando o navigate
  const navigate = useNavigate();

  //  Função pra lidar com recarregamento da pagina
  const handleSubmit = async (e) => {
    // previne a pagina de se recarregada
    e.preventDefault();
    if (nome !== "") {
      if (senha !== "") {
        if (email !== "") {
          const usuario = { nome, senha, email };
          console.log(usuario);
          try {
            const req = await fetch(urlUsers, {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(usuario),
            });
            const res = req.json();
            console.log(res);
            setAlertClass("mb-3 mt-2");
            setAlertVariant("success");
            setAlertMensagem("Usuario cadastrado com sucesso");
            alert("Usuario cadastrado com sucesso com sucesso");
            navigate("/home");
          } catch (error) {
            console.log(error);
          }
        } else {
          setAlertClass("mb-3 mt-2");
          setAlertMensagem("O campo email não pode ser vazio");
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O campo senha não pode ser vazio");
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O campo nome não pode ser vazio");
    }
  };

  return (
    <div>
      <NavBar />
      <Container style={{height: "100vh", textAlign:"center"}}
      className="justify-content-center align-content-center">
        <h1>Cadastrar Usuario</h1>
        <form className="mt-3" onSubmit={handleSubmit}>
          <Row  style={{alignContent:"center", justifyContent:"center"}}>
            <Col xs={6}>
              {/* Caixinha de Nome */}
              <FloatingLabel
                controlId="floatingInputNome"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do Usuario"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FloatingLabel>

              {/* Caixinha da Senha */}
              <FloatingLabel
                controlId="floatingInputSenha"
                label="Senha"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite a senha do Usuario"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FloatingLabel>
              {/* Caixinha do Email */}
              <FloatingLabel
                controlId="floatingInputSenha"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite a senha do Usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
             
            </Col>
          </Row>

          {/* Alerta caso haja erro */}
          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

          {/* Botão para enviar o formulario de cadastro de produto */}

          <Button variant="primary" size="lg" type="submit">
            Cadastrar
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CadastroUsuario;
