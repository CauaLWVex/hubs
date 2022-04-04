# Documentação Mozilla Hubs

- **Preparando o ambiente**
    
    Para criar e personalizar um cliente customizado você precisa primeiro criar um fork do repositório. Para isso acesse o [repositório oficial](https://github.com/mozilla/hubs) do mozilla hubs, e crie um fork para a sua conta.
    
    [fork mozilla hubs.mp4](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1e369d69-b150-40e2-88e0-4eec4ee5d702%2Ffork_mozilla_hubs.mp4?table=block&id=974f5412-0c82-4065-b323-bb523a8364af&spaceId=cbf4f6e8-6540-42ae-8087-e0ca29517d8a&userId=51f4a6e9-2bd5-48d5-b77c-c0e4c0b15f5a&cache=v2)
    
    Para começar a customizar no seu pc, você precisa clonar o projeto, e adicionar as fontes do hubs para atualizaçõs da próprio mozilla.
    
    Primeiro clone o projeto no diretório desejado:
    
    ```bash
    git clone <url do repositório forkado>
    ```
    
    Entre no diretório e defina a sua branch como a selecionada:
    
    ```bash
    git checkout hubs-cloud
    ```
    
    Adicione a branch oficial do hubs para atualizaçõs do cliente padrão:
    
    ```bash
    git remote add upstream https://github.com/mozilla/hubs.git
    ```
    
- **Instalando as dependências e rodando localmente**
    
    Para rodar localmente, entre no diretório do projeto, e instale as dependências:
    
    ```bash
    npm i
    ```
    
    E para rodar localmente:
    
    ```bash
    npm run dev
    ```
    
    O projeto então irá rodar no [https://localhost:8080](https://localhost:8080).
    
    [run dev hubs.mp4](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fde145eb3-d9ea-42a8-ae4c-a4c823716dcf%2Frun_dev_hubs.mp4?table=block&id=addfa3f7-aa46-4c19-af32-cca6e903f5e4&spaceId=cbf4f6e8-6540-42ae-8087-e0ca29517d8a&userId=51f4a6e9-2bd5-48d5-b77c-c0e4c0b15f5a&cache=v2)
    
- **Criando um serviço na AWS**
    
    Pra rodar um cliente customizado, você precisa criar um serviço do mozilla hubs na aws, então entre na conta, e pesquise por hubs cloud no marketplace:
    
    [open hubs cloud.mp4](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F711e1cfc-65c9-4cce-94aa-509c964400b3%2Fopen_hubs_cloud.mp4?table=block&id=36170856-ff02-4f80-a38c-f05cd8288bc6&spaceId=cbf4f6e8-6540-42ae-8087-e0ca29517d8a&userId=51f4a6e9-2bd5-48d5-b77c-c0e4c0b15f5a&cache=v2)
    
    Agora, você precisa configurar o serviço, esta parte é simples, você somente precisará preencher algumas informações, e não alterar outras, tenha em mente que **neste ponto você precisa ter os domínios configurados no Route 53**:
    
    [configure hubs stack compressed.mp4](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdf1e7449-ee58-439b-939d-09f202101174%2Fconfigure_hubs_stack_compressed.mp4?table=block&id=6d057732-b523-4732-91de-1772a6dd8c5a&spaceId=cbf4f6e8-6540-42ae-8087-e0ca29517d8a&userId=51f4a6e9-2bd5-48d5-b77c-c0e4c0b15f5a&cache=v2)
    
    E agora o seu cliente está online, acesse o domínio .link registrado e veja se tudo está ok.
    
- **Fazendo login e deploy do cliente customizado**
    
    Primeiro, você deve fazer login com o seu cliente que foi lançado na aws, para isso, rode o comando de login:
    
    ```bash
    npm run login
    ```
    
    E então, você vai preencher o domínio e fazer o login pelo seu e-mail:
    
    [login command.mp4](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2e3cf375-45bf-4cee-98b5-19daa496bd08%2Flogin_command.mp4?table=block&id=e10307f2-de0a-4634-bdb7-d6d37effe3e4&spaceId=cbf4f6e8-6540-42ae-8087-e0ca29517d8a&userId=51f4a6e9-2bd5-48d5-b77c-c0e4c0b15f5a&cache=v2)
    
    Agora, para fazer o deploy, basta rodar o comando de deploy:
    
    ```bash
    npm run deploy
    ```
    
    [run deploy hubs.mp4](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc03beda3-a385-460e-920b-f7a7861c1d86%2Frun_deploy_hubs.mp4?table=block&id=fc88fda7-7122-4410-9ece-89fe30fb5046&spaceId=cbf4f6e8-6540-42ae-8087-e0ca29517d8a&userId=51f4a6e9-2bd5-48d5-b77c-c0e4c0b15f5a&cache=v2)
    
    E aguardar o deploy finalizar.