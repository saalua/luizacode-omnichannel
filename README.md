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

> O projeto final da aceleração Luiza < Code > tem como objetivo o desenvolviemnto de um serviço HTTP que resolve a funcionalidade de Omni Channel do cliente.


## :heavy_check_mark: Requisitos obrigatórios
- Listar produtos
- Listar lojas físicas
- Cadastrar cliente
- Adicionar um produto na lista de compra da cliente
- Remover um produto da lista de compra da cliente
- Finalizar compra
- Consultar todas as compras realizadas da cliente

<br>

## 🚀 Instalação e configuração

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você tem uma máquina `Windows, Linux ou Mac`.
* Você instalou a versão mais recente do `npm, node e postgres`

Para a instalação, siga estas etapas:

1) Faça clone do repositório
```
git clone https://github.com/saalua/luizacode-omnichannel.git

```

2) Na pasta do projeto, abra o terminal e execute o comando abaixo para instalar as dependências:

```
npm install
```

3) Crie um arquivo chamado ```.env``` na raiz do projeto com as variáveis abaixo (não altere os nomes que estão em caixa alta) e o preencha com as informações de autenticação do seu banco de dados, como no exemplo: 
```
DB=postgres
USER=postgres
PASS=senha
HOST=localhost
PGPORT=5432

```

## :game_die: Banco de dados
Diagrama do banco de dados: 

![diagram-bd][diagram-bd]


## ☕ Usando o Omni Channel
Endpoints


## :page_with_curl: Rodando o Swagger
Com o servidor rodando, digite ``` localhost:3000/docs``` no navegador (utilize a porta que estiver rodando a aplicação)


## :beetle: Testes automatizados
Os testes da API foram desenvolvidos utilizando o framework Cypress. E podem ser encontrados no repositório abaixo: 

<a href="https://github.com/saalua/luizacode-omnichannel-cypress"> Repositório Cypress </a>

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
[diagram-bd]: img/Diagram.png