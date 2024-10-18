[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[NODEJS__BADGE]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[FASTIFY__BADGE]: https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white
[POSTGRES__BADGE]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[DOCKER__BADGE]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[JWT__BADGE]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[NEXT__BADGE]: https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white
[TAILWIND__BADGE]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white

<h1 align="center" style="font-weight: bold;">Laon Streaming 🎞️</h1>

<div align="center">

![typescript][TYPESCRIPT__BADGE]
![nodejs][NODEJS__BADGE]
![fastify][FASTIFY__BADGE]
![postgres][POSTGRES__BADGE]
![docker][DOCKER__BADGE]
![jwt][JWT__BADGE]
![next][NEXT__BADGE]
![tailwind][TAILWIND__BADGE]

</div>

<p align="center">
 <a href="#started">Iniciando o Projeto</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Colaboradores</a>
</p>

<p align="center">
  <b>Projeto full stack de um sistema de catálogo de filmes e séries</b>
</p>

<h2 id="started">🚀 Iniciando o Projeto </h2>

Este projeto foi desenvolvido utilizando Node.js com o framework Fastify, PostgreSQL e Docker no backend, e Next.js com Tailwind CSS no frontend. Para executar este projeto localmente, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

<h3>🔧 Pré requisitos</h3>

- [Git 2](https://git-scm.com/)
- [NodeJS](https://nodejs.org/pt)

Se você deseja rodar o backend localmente, será necessário ter o [Docker](https://www.docker.com/) instalado. Caso contrário, você pode utilizar o backend já hospedado online acessando a URL: [https://backend-laon-h4rc.onrender.com](https://backend-laon-h4rc.onrender.com).

<h3>📁 Clonando o repositório</h3>

Para clonar o repositório do projeto, execute o seguinte comando no seu terminal:

```bash
git clone https://github.com/bantheus/recruiting-laon.git
```

Após clonar o repositório, você encontrará duas pastas principais:

<p>recruiting-laon-backend: contém o código do backend.</p>
<p>recruiting-laon-frontend: contém o código do frontend.</p>
 
<h3>🌍 Variáveis de ambiente</h3>

No backend, você encontrará o arquivo `.env.example`. Use-o como referência para criar seu próprio arquivo `.env` com as seguintes variáveis:

```plaintext
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
JWT_SECRET="secret"
```
No frontend, você encontrará o arquivo `.env.example`. Use-o como referência para criar seu próprio arquivo `.env.local` com a seguinte variável, dependendo de como você deseja conectar ao backend:

```plaintext
# Se estiver usando o backend online
NEXT_PUBLIC_API_URL=https://backend-laon-h4rc.onrender.com

# Ou, se estiver executando o backend localmente com Docker
NEXT_PUBLIC_API_URL=http://localhost:3001
```

<h3>🛠️ Executando o Projeto</h3>

Para executar o backend, navegue até a pasta do backend e siga os passos abaixo:

```bash
#1. Navegue até a pasta do backend:
cd recruiting-laon-backend

#2. Execute o Docker Compose para iniciar o banco de dados:
docker compose up -d

#3. Instale as dependências do backend:
npm install

#4. Construa o projeto:
npm run build

#5. Inicie o backend:
npm run start
```

Para executar o frontend, navegue até a pasta do frontend e siga os passos abaixo:

```bash
#1. Navegue até a pasta do frontend:
cd recruiting-laon-frontend

#2. Instale as dependências do frontend:
npm install

#3. Construa o projeto:
npm run build

#4. Inicie o frontend:
npm run start

# Após isso, você pode acessar a aplicação em:
http://localhost:3000
```

<h2 id="routes">📍 API Endpoints</h2>

Aqui estão as principais rotas da API, junto com os corpos de requisição esperados.
​
| rota                             | descrição                                              
|-----------------------------------|-----------------------------------------------------
| <kbd>POST /signup</kbd>           | Cadastra um novo usuário.  [exemplo](#post-signup-detail)                           |
| <kbd>POST /login</kbd>            | Loga um usuário existente. [exemplo](#post-login-detail)                            |
| <kbd>GET /search?searchTerm=</kbd> | Busca uma lista de mídias pelo termo. [exemplo](#get-search-detail)                |
| <kbd>GET /media/:id</kbd>         | Retorna uma mídia específica pelo ID. [exemplo](#get-media-detail)  |

<h3 id="post-signup-detail">POST /signup</h3>

**REQUISIÇÃO**
```json
{
	"name": "Usuario",
	"email": "usuario@email.com",
	"password": "senhaComplexa123"
}
```
**RESPOSTA**
```json
{
    "id": "r9h51o6qxghhc2smbcsfrem2",
    "name": "Usuario",
    "email": "usuario@email.com"
}
```

<h3 id="post-login-detail">POST /login</h3>

**REQUISIÇÃO**
```json
{
	"email": "usuario@email.com",
	"password": "senhaComplexa123"
}
```
**RESPOSTA**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJndDZ3bG16eTNvajZuOXpuaG9teHYyMG4iLCJpYXQiOjE3MjkyNTgxNzEsImV4cCI6MTcyOTI2MTc3MX0.1UMpM8aJ4IQxgC_-yhVhHyW5maPUyry26Vf4yOL9Z1s"
}
```

<h3 id="get-search-detail">GET /search</h3>

Para buscar mídias, você precisa passar o `searchTerm` na URL. Se não passar, a API retornará todos os filmes e séries com um limite de 100 por página. A URL deve ser assim:

/search?searchTerm=origem&page=1&limit=1000

**RESPOSTA**
```json
{
    "items": [
        {
            "id": "m6c4tb4r6nkjnfbig3klhxjh",
            "name": "A Origem",
            "originalName": "Inception",
            "duration": 148,
            "releaseYear": 2010,
            "actors": [
                "Leonardo DiCaprio",
                "Joseph Gordon-Levitt",
                "Elliot Page"
            ],
            "categories": [
                "Ficção Científica",
                "Ação",
                "Aventura"
            ],
            "type": "filme",
            "description": "Um ladrão que rouba segredos corporativos através do uso de tecnologia de compartilhamento de sonhos é encarregado da tarefa inversa de plantar uma ideia na mente de um CEO.",
            "director": "Christopher Nolan",
            "awards": [
                "Academy Award for Best Cinemography",
                "Golden Globe Award"
            ],
            "rating": 8,
            "coverLink": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
            "trailerLink": "https://youtu.be/cdx31ak4KbQ"
        }
    ],
    "total": 1
}
```

<h3 id="get-media-detail">GET /media/:id</h3>

Para buscar uma mídia específica, use a URL assim:

/media/bauwbw2f7klzwoz0bkwj1igl

**RESPOSTA**
```json
{
    "id": "bauwbw2f7klzwoz0bkwj1igl",
    "name": "O Resgate do Soldado Ryan",
    "originalName": "Saving Private Ryan",
    "duration": 169,
    "releaseYear": 1998,
    "actors": [
        "Tom Hanks",
        "Matt Damon",
        "Tom Sizemore"
    ],
    "categories": [
        "Guerra",
        "Drama"
    ],
    "type": "filme",
    "description": "Após o desembarque na Normandia, um grupo de soldados dos EUA parte em uma missão perigosa para resgatar o soldado James Ryan, cujos irmãos foram mortos em combate.",
    "director": "Steven Spielberg",
    "awards": [
        "5 Academy Awards",
        "Golden Globe Award"
    ],
    "rating": 8,
    "coverLink": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/hMLxNLCXRDd62acfCBn6mIyW1HU.jpg",
    "trailerLink": "https://youtu.be/zwhP5b4tD6g"
}
```

<h2 id="colab">🤝 Colaboradores</h2>

Desenvolvido por

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/bantheus">
        <img src="https://avatars.githubusercontent.com/u/70174902?v=4" width="100px;" alt="Matheus Schmidt Profile Picture"/><br>
        <sub>
          <b>Matheus Schmidt</b>
        </sub>
      </a>
    </td>
  </tr>
</table>