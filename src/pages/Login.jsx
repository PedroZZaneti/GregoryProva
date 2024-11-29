// importando compontentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert  from "react-bootstrap/Alert";

// importar o hook useState para monitorar a mudança das variaveis
import { useState, useEffect } from "react";

// importação do Navigate
import {useNavigate} from "react-router-dom"

const url = "http://localhost:5000/usuarios"

const Login = () => {
  // Resetar Local Storage
  localStorage.removeItem("userName")
  localStorage.removeItem("email")

  //Variaveis pra guardar as informações digitadas pelo usúario
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Variaveis para alerta
  const [alertClass, setAlertClass] = useState("mb-3 d-none")
  const [alertMensagem, setAlertMensagem] = useState("")
  const [alertVariant, setAlertVariant] = useState("danger")

  // lista de Usuarios
  const [usuarios, setUsuarios] = useState([])


  // useEffect pra puxar os dados da API
  useEffect(() =>{
    async function fetchData(){
      try{
        const req = await fetch(url)
        const users = await req.json()
        console.log(users)
        setUsuarios(users)
      }
      catch(erro){
        console.log(erro.message)
      }
    }
    fetchData()
  }, [])

  // Criando o navigate
  const navigate = useNavigate()

  // Função pra guarda na memória do navegador as informações do usuário
  const graverLocalStorage =(usuario) => {
    localStorage.setItem("userName", usuario.nome)
    localStorage.setItem("email", usuario.email)
  }

  // Função para tratar os dados do Login
  const handleLogin = async (e) => {
    // Previne a página de ser recarregada
    e.preventDefault()

    // Verifica se há aquele usuário digitados na lista
    const userToFind = usuarios.find(
      (user) => user.email === email
  )

    if(email !== ""){
      if (senha !== ""){
        if(userToFind !== undefined && userToFind.senha === senha){
          graverLocalStorage(userToFind)
          setAlertClass("mb-3 mt-2")
          setAlertVariant("success")
          setAlertMensagem("login efetuado com sucesso")
          alert("login efetuado com sucesso")
          navigate("/home")
        }
        else{
          setAlertClass("mb-3 mt-2")
      setAlertMensagem("Usuário ou senha inválidos")
        }
      }
      else{
        setAlertClass("mb-3 mt-2")
      setAlertMensagem("O campo senha não pode ser vazio")
      }
    }
    else{
      setAlertClass("mb-3 mt-2")
      setAlertMensagem("O campo email não pode ser vazio")
    }
  }

  return (
    <div style={{ backgroundColor: "#ffcbdb", height: "100%" , width: "100%" }}
    className="justify-content-center align-content-center text-align-center">
      <Container
        style={{ backgroundColor: "pink", height: "100vh" , width: "100vw" }}
        className="justify-content-center align-content-center text-align-center"
      >
        <div style={{height: "200px", width: "100%", alignItems: "center" , textAlign: "center", justifyContent: "center", display: "flex"}}>
      
         <h1 style={{ fontSize: "200px", color: "purple" }}>Entrar</h1> 
      
        </div>
         {/* Divisorio do Form */}
        <div style={{width:"100%", height:"500px", justifyContent: "center", display: "flex", alignItems: "center", alignContent: "center"}}>
          <Form style={{width: "75%", margin: "auto"}} onSubmit ={handleLogin} >
        {/* Caixinha de email */}
        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FloatingLabel>
        {/* Caixinha da senha */}
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
          />
        </FloatingLabel>
        {/* Mensagem de alerta */}
        <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

        {/* Botão para enviar o formulário */}
        <Button  type="submit" className="mt-4" size="lg"
        style={{backgroundColor: "#aa0eee"}}>
          Login
        </Button>
        </Form>
          </div>
      </Container>
    </div>
  );
};

export default Login;