# Executando a aplicação

execute o comando abaixo para instalar as dependências do projeto:

npm install

Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente:

DATABASE_URL="postgresql://postgres:admin@localhost:5432/petshopDB?schema=public"

execute o comando abaixo para iniciar a aplicação:

npm run dev

Se preferir, abra outro terminal para executar a visualização do banco de dados com o prisma:

npx prisma studio

Em seguida, abra o navegador e acesse a url http://localhost:3000

Com a aplicação rodando, siga as etapas do README do frontend em seguida.