# Guia: Acessando Contêineres Docker com Dev Containers no VS Code

Este guia explica como se conectar a um contêiner Docker em execução (frontend ou backend) diretamente do VS Code usando a extensão Dev Containers. Isso permite que você desenvolva dentro do ambiente do contêiner, evitando problemas de dependência e configuração que podem surgir ao desenvolver localmente.

## Pré-requisitos

1.  **Docker e Docker Compose Instalados:** Certifique-se de que o Docker Desktop (ou Docker Engine com Docker Compose) está instalado e em execução.
2.  **Projeto Configurado:** Seu projeto com `docker-compose.yml` deve estar pronto.
3.  **Extensão Dev Containers:** Instale a extensão "Dev Containers" da Microsoft no VS Code (ID: `ms-vscode-remote.remote-containers`). Se você não a tiver, o VS Code geralmente sugere a instalação ao detectar arquivos de configuração de contêiner.

## Passos para Conectar ao Contêiner

1.  **Inicie os Contêineres:**
    Abra seu terminal na raiz do projeto (`d:\estudo\Faculdade\4-8\Retock\Retock`) e execute o comando para construir e iniciar seus contêineres em modo detached (-d):
    ```powershell
    docker-compose up -d --build
    ```

2.  **Verifique se os Contêineres Estão Rodando:**
    Após o comando anterior, verifique se os contêineres, especialmente o do frontend (e backend, se desejar acessá-lo), estão em execução.
    ```powershell
    docker ps
    ```
    Você deverá ver seus contêineres listados com o status "Up". Anote o nome do contêiner do frontend (algo como `retock-frontend-1` ou similar).

3.  **Abra a Paleta de Comandos do VS Code:**
    No VS Code, pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no macOS) para abrir a paleta de comandos.

4.  **Anexe ao Contêiner em Execução:**
    *   Digite `Dev Containers: Attach to Running Container...` na paleta de comandos e selecione esta opção.
    *   Alternativamente, você pode clicar no ícone verde do Dev Containers no canto esquerdo da janela do VS Code (um monitor com um circulo no canto). Isso abrirá um menu com opções remotas; procure por "Attach to Running Container...".

5.  **Selecione o Contêiner Desejado:**
    Uma lista dos seus contêineres Docker em execução aparecerá. Selecione o contêiner ao qual você deseja se conectar (por exemplo, o contêiner do `frontend` ou do `backend` que você identificou no passo 2).

6.  **Escolha Como Abrir:**
    *   **Attach in Current Window:** A janela atual do VS Code será recarregada e conectada ao contêiner.
    *   **Attach in New Window:** Uma nova janela do VS Code será aberta, conectada ao contêiner.

7.  **Desenvolva Dentro do Contêiner:**
    Após o VS Code se conectar, ele pode levar um momento para configurar o servidor VS Code dentro do contêiner. Uma vez pronto, o explorador de arquivos mostrará o sistema de arquivos *dentro* do contêiner (geralmente o diretório de trabalho especificado no seu `Dockerfile`, como `/usr/src/app`).
    Agora você pode abrir arquivos, usar o terminal integrado do VS Code (que estará executando comandos *dentro* do contêiner) e editar seu código. Todas as ferramentas, linters, e dependências definidas no ambiente do seu contêiner estarão disponíveis, e você não verá erros de dependências ausentes que poderiam ocorrer se estivesse editando os arquivos localmente.

## Benefícios

*   **Ambiente Consistente:** Desenvolva no mesmo ambiente em que sua aplicação será executada.
*   **Sem Conflitos de Dependência:** As dependências são gerenciadas dentro do contêiner, evitando conflitos com sua máquina local.
*   **Integração com a IDE:** Utilize todos os recursos do VS Code (IntelliSense, depuração, etc.) como se estivesse desenvolvendo localmente, mas com o contexto do contêiner.

Seguindo estes passos, você poderá editar e executar seu código diretamente no ambiente Docker, simplificando o fluxo de desenvolvimento e garantindo consistência entre os ambientes.
