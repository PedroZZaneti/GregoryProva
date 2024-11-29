import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

//Importação de componentes
import NavBar from "../components/NavBar";

// Importação do useState e useEffect
import { useState, useEffect } from "react";

// importação do Navigate
import { useNavigate } from "react-router-dom";

const url = "http://localhost:5000/cats";


const EditarProduto = () => {
  const [cats, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(url);
        const categoria = await req.json();
        console.log(categoria);
        setCategorias(categoria);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  const linkImagem =
  "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("Bolos");
  const [preco, setPreco] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  // Variaveis para alerta
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  // Criando o navigate
  const navigate = useNavigate();

  const params = window.location.pathname.split("/");
  console.log(params);
  const idProd = params[params.length - 1];


  console.log(idProd);

  // Buscar as informacoes do produto
  useEffect(() => {
    async function fetchData() {
        try{
            const req = await fetch(`http://localhost:5000/produtos/${idProd}`);
            const prod = await req.json();
            console.log(prod);
            setNome(prod.nome);
            setCategoria(prod.categoria);
            setPreco(prod.preco);
            setImagemUrl(prod.imagemUrl = "" ? "" : prod.imagemUrl)
        }
        catch(error){
            console.log(error.message)
        }
    }  
    fetchData()
  }, []);

    //  Função pra lidar com o envio dos dados
    const handleSubmit = async (e) => {
        // previne a pagina de se recarregada
        e.preventDefault();

        if (nome !== "") {
            if (preco !== "") {
              const produto = { nome, categoria, preco, imagemUrl };
              console.log(produto);
              try {
                const req = await fetch(`http://localhost:5000/produtos/${idProd}`, {
                  method: "PUT",
                  headers: { "Content-type": "application/json" },
                  body: JSON.stringify(produto),
                });
                const res = req.json();
                console.log(res);
                setAlertClass("mb-3 mt-2");
                setAlertVariant("success");
                setAlertMensagem("Produto editado com sucesso");
                alert("Produto editado com sucesso");
                navigate("/home");
              } catch (error) {
                console.log(error);
              }
            } else {
              setAlertClass("mb-3 mt-2");
              setAlertMensagem("O campo preço não pode ser vazio");
            }
          
        } else {
          setAlertClass("mb-3 mt-2");
          setAlertMensagem("O campo nome não pode ser vazio");
        }
      };

  return (
    <div>
      <NavBar />
      <Container>
        <h1>Editar Produtos</h1>
        <form className="mt-3" onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              {/* Caixinha de Nome */}
              <FloatingLabel
                controlId="floatingInputNome"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do Produto"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FloatingLabel>

              {/* select de categoria */}
              <Form.Group controlId="formGridTipo" className="mb-3">
                <Form.Label>Tipo de produto</Form.Label>
                <Form.Select
                  value={categoria}
                  onChange={(e) => {
                    setCategoria(e.target.value);
                  }}
                >
                  {cats.map((cats) => (
                    <option key={cats.id} value={cats.nome}>
                      {cats.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Caixinha de Preço */}
              <FloatingLabel
                controlId="floatingInputPreco"
                label="Preço"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="Digite a preço do Produto"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="formFileLg" className="mb-3">
                {/* Caixinha da Imagem */}
                <FloatingLabel
                  controlId="floatingInputImage"
                  label="Envie o link da imagem do produto"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Envie o link da imagem do produto"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                  />
                </FloatingLabel>
                <Image
                  src={imagemUrl === "" ? linkImagem : imagemUrl}
                  rounded
                  width={300}
                  height={300}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Alerta caso haja erro */}
          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

          {/* Botão para enviar o formulario de cadastro de produto */}

          <Button variant="primary" size="lg" type="submit">
            Editar
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditarProduto;
