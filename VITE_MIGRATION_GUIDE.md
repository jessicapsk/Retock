# Guia de Migração para o Novo Frontend com Vite

Este guia destina-se aos membros da equipe que possuem componentes desenvolvidos no frontend antigo e precisam integrá-los ao novo frontend baseado em Vite.

## Passos para Integrar Componentes Existentes

1.  **Certifique-se de que está na sua branch de feature/desenvolvimento atual.**
    Se você estava trabalhando em uma branch como `feature/meu-componente`, continue nela.

2.  **Navegue até a pasta `frontend` do projeto no seu terminal:**
    ```bash
    cd caminho/para/Retock/Retock/frontend
    ```

3.  **Execute o comando `git checkout` para buscar os arquivos da branch `bugfix/vite`**, excluindo as pastas de componentes, páginas, serviços e tipos que você já desenvolveu. Isso trará a estrutura base do Vite e outras configurações necessárias, mantendo seus componentes intactos.

    ```bash
    git checkout bugfix/vite -- . ':!src/components' ':!src/pages' ':!src/services' ':!src/types'
    ```
    *   O `.` indica para aplicar o checkout aos arquivos no diretório atual (`frontend`).
    *   `':!src/components'`, `':!src/pages'`, etc., são *pathspecs* que excluem explicitamente essas pastas do checkout. Desta forma, seus arquivos dentro dessas pastas não serão sobrescritos pelos da branch `bugfix/vite`.

4.  **Resolva quaisquer conflitos de merge (se houverem):**
    É possível que alguns arquivos fora das pastas excluídas (como `package.json`, `vite.config.ts`, etc.) tenham sido modificados tanto na sua branch quanto na `bugfix/vite`. O Git pode pedir para você resolver esses conflitos. Abra os arquivos conflitantes e edite-os para incorporar as mudanças de ambas as branches conforme necessário.

5.  **Verifique as dependências:**
    O novo frontend com Vite pode ter dependências diferentes. Após o checkout e a resolução de conflitos, compare o `package.json` da branch `bugfix/vite` com o seu. Pode ser necessário instalar novas dependências ou remover antigas.

6.  **Teste a aplicação:**
    Rode o comando `docker-compose up -d --build` e verifique se seus componentes estão funcionando como esperado no novo ambiente.

7.  **Commite as mudanças:**
    Após garantir que tudo está funcionando corretamente, adicione as mudanças e faça o commit.
    ```bash
    git add .
    git commit -m "Integração de componentes existentes com a estrutura Vite da branch bugfix/vite"
    ```

