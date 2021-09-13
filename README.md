<h1 align="center"> Luiza &lt;Code> - Omni Channel.</h1>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" />
</p>


<a href="https://ibb.co/mF5btfN"><img src="https://i.ibb.co/k6250Nm/luiza-banner.png" alt="luiza-banner" width="100%" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'></a><br />

> O objetivo do projeto final do Luiza < Code > é desenvolver um serviço HTTP que resolve a funcionalidade de Omni Channel do cliente.

<p align="center">
  <a href="#heavy_check_mark-pré-requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-configuração">Instalação e configuração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-usando-o-omni-channel">Rodando o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#page_with_curl-documentação-swagger">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#game_die-banco-de-dados">Banco de dados</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#bug-testes">Testes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-squad-sparck-girls">Colaboradoras</a>
</p>

## :heavy_check_mark: Pré-requisitos
API contendo os seguintes endpoints:
- Listar produtos
- Listar lojas físicas
- Cadastrar cliente
- Adicionar um produto na lista de compra da cliente;
- Remover um produto da lista de compra da cliente;
- Finalizar compra
- Consultar todas as compras realizadas da cliente; 


## 🚀 Instalação e configuração

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você instalou a versão mais recente do `npm, node e postgres`

Para a instalação, siga estas etapas:

1) Faça um clone do repositório:
```
  git clone https://github.com/saalua/luizacode-omnichannel.git
```

2) Na pasta do projeto, abra o terminal e execute o comando abaixo para instalar as dependências:

```
npm install
```

3) Crie um arquivo chamado ```.env``` na raiz do projeto com as variáveis abaixo e o preenche com as informações de autenticação do seu banco de dados, como no exemplo: 
```
DB=postgres
USER=postgres
PASS=senha
HOST=localhost
PGPORT=5432
JWTSecret=palavra-secreta
```

## ☕ Usando o Omni Channel

Para usar, siga estas etapas:

1) Na pasta da aplicação, abra o terminal e digite. O servidor irá iniciar na porta 3000, caso queira trocar a porta, altere no arquivo app.js 

```
npm start
```


2) Par abrir a documentação Swagger, digite no navegador: 

```
localhost:3000/docs
```

## :page_with_curl: Documentação Swagger
<strong>Endpoints acessíveis sem autenticação: </strong>

- Retornar todas as lojas
- Retornar todos os produtos e produtos por id
- Criar um novo cliente
- Fazer login

![endpoints][endpoints-01]

<br>

<strong>Endpoints com autenticação: </strong>

- Retornar todos os pedidos de um cliente
- Cliente pode criar um novo pedido
- Retornar um único pedido de um cliente 
- Fazer login

![endpoints][endpoints-02]


## :game_die: Banco de dados

Diagrama do banco de dados:

<br>

![diagrama banco de dados][diagrama-bd]

<br>

## :bug: Testes
Os testes automatizados da aplicação foram desenvolvidos com o framework Cypress e os testes podem ser encontrados no repositório abaixo: 

<a href="https://github.com/saalua/luizacode-omnichannel-cypress"> Repositório Cypress </a>

![cypress][cypress]

<br>

## 🤝 Squad SPARCK GIRLS

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/juliadutra">
        <img src="https://github.com/juliadutra.png" width="100px;" alt="Foto de Julia Dutra"/><br>
        <sub>
          <b>Julia Dutra</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/LayaneLino">
        <img src="https://github.com/LayaneLino.png" width="100px;" alt="Foto de Layane Lino"/><br>
        <sub>
          <b>Layane Lino</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/lecesion">
        <img src="https://github.com/lecesion.png" width="100px;" alt="Foto de Letícia Cesion"/><br>
        <sub>
          <b>Letícia Cesion</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/saalua">
        <img src="https://github.com/saalua.png" width="100px;" alt="Foto de Luana Santos"/><br>
        <sub>
          <b>Luana Santos</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/nathaliaveneziano">
        <img src="https://github.com/nathaliaveneziano.png" width="100px;" alt="Foto de Nathália Veneziano"/><br>
        <sub>
          <b>Nathália Veneziano</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Walquirialima">
        <img src="https://github.com/Walquirialima.png" width="100px;" alt="Foto de Walquiria Lima"/><br>
        <sub>
          <b>Walquiria Lima</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :purple_heart: Mentora
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/tainajmedeiros">
        <img src="https://github.com/tainajmedeiros.png" width="100px;" alt="Foto de Tainá Medeiros"/><br>
        <sub>
          <b>Tainá Medeiros</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


<!-- MARKDOWN LINKS & IMAGES -->
[diagrama-bd]: img/diagram.png
[endpoints-01]: img/endpoints1.png
[endpoints-02]: img/endpoints2.png
[cypress]: img/cy.gif
