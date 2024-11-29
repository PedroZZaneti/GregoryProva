import React from 'react'
import CardProduto from '../components/CardProduto'
import Container from "react-bootstrap/Container";

// importar o hook useState para monitorar a mudança das variaveis
import { useState, useEffect } from "react";

//Importação de componentes
import NavBar from '../components/NavBar';



const url = "http://localhost:5000/produtos"


const Home = () => {
  const [produtos, setProduto] = useState([])
  
  // useEffect pra puxar os dados da API
  useEffect(() =>{
    async function fetchData(){
      try{
        const req = await fetch(url)
        const prods = await req.json()
        console.log(prods)
        setProduto(prods)
      }
      catch(erro){
        console.log(erro.message)
      }
    }
    fetchData()
  }, [])
  
  return (
    <div>
      <NavBar/>
      <h1 style={{textAlign: "center"}}>Produtos</h1>
      <Container>
      <div className='lista-produtos d-flex col-12 gap-4 mt-3 justify-content-center flex-wrap'>

      {produtos.map((prod) =>
      <CardProduto  
        key={prod.key}
        id={prod.id} 
        nome={prod.nome}
        descricao={prod.descricao}
        preco={prod.preco}
        categoria={prod.categoria}
        imagemUrl={prod.imagemUrl}
        />
      )}
     

      </div>
      </Container>
    </div>
  )
}

export default Home
