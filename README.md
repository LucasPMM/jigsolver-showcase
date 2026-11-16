# JigSolver Showcase

Uma apresentação interativa do **JigSolver**, projeto de montagem assistida de quebra-cabeças desenvolvido por Lucas Paulo em Ciência da Computação na UFMG.

A página aproxima o visitante da experiência do sistema: fotografar e caracterizar peças, analisar possibilidades de encaixe e acompanhar uma reconstrução. Foi pensada para complementar o banner acadêmico em uma apresentação com tablet, sem deixar de funcionar no celular ou no computador.

## O que você encontra

- Uma jornada visual das etapas de captura, análise e montagem assistida.
- Demonstrações curtas da interface desktop e mobile, reproduzidas automaticamente em loop e sem áudio.
- Resultados experimentais acompanhados de contexto e limitações, sem prometer resolver qualquer quebra-cabeça.
- Conteúdo em português e inglês, com troca de idioma e preferência salva no dispositivo.
- Temas claro, escuro e automático. O botão de tema percorre essas opções e informa o estado atual por descrição acessível.
- Controles de pausa, navegação por teclado e respeito à preferência de redução de movimento.

As gravações mostram o estágio experimental do projeto. A demonstração desktop é um replay de uma reconstrução sintética de 80 peças guiada por uma imagem de referência. A demonstração mobile é uma montagem editada de telas reais, não uma captura contínua nem uma demonstração de câmera ativa. Origem, edição e créditos estão em [public/media/README.md](public/media/README.md).

## Escopo

Este repositório é a vitrine pública e estática do projeto, não a aplicação de reconstrução. Não depende do backend privado, de banco de dados, de credenciais ou de autenticação. Não recebe imagens do visitante nem processa quebra-cabeças. Não inclui analytics ou rastreamento de terceiros.

## Desenvolvimento local

Requisitos: **Node.js 24** e **pnpm 10.33.4**.

```sh
pnpm install --frozen-lockfile
pnpm start       # http://localhost:4173
pnpm check       # TypeScript, Biome, testes e build
```

Outros comandos:

```sh
pnpm lint        # valida lint, imports e formatação
pnpm lint:fix    # aplica correções seguras
pnpm format     # formata os arquivos suportados pelo Biome
pnpm test
pnpm build
pnpm preview
```

Se a porta 4173 estiver ocupada por outra execução, encerre essa execução ou use `pnpm start --port 4175`.

## Organização

- `src/components/Nome/Nome.tsx` e `index.tsx`: componentes Preact com funções arrow e exportações nomeadas.
- `src/context/ShowcaseContext.tsx`: preferências, idioma, reprodução e estado compartilhado da apresentação.
- `src/content.ts`: textos PT/EN; os testes verificam que suas estruturas correspondem.
- `src/preferences.ts`: resolução das preferências e regras puras testáveis.
- `src/media.ts`: manifesto dos vídeos e resolução de caminhos compatíveis com subdiretórios.
- `src/style.css`: identidade visual, responsividade e integração Tailwind.
- `public/media/`: vídeos otimizados, posters e legendas WebVTT.
- `tests/`: testes com Vitest.

Stack: **Preact, TypeScript, Vite, Tailwind CSS, i18next e Biome**. As fontes são servidas localmente. O `biome.json` adapta o padrão do JigSolver para esta aplicação estática, sem regras específicas de Next.js.

## Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` instala com lockfile fixo e executa `pnpm check` antes de gerar o artefato de publicação. O deploy depende desse job: falhas de lint, tipagem, testes ou build impedem a publicação. Pull requests apenas validam; a publicação é restrita à branch `main`.

Depois da revisão do código, configure **Pages → Source → GitHub Actions** no repositório e envie as alterações aprovadas. Não há domínio customizado ou CNAME configurado aqui.

Para validar localmente o caminho usado pelo Pages:

```sh
BASE_PATH=/jigsolver-showcase/ pnpm build
BASE_PATH=/jigsolver-showcase/ pnpm preview --port 4174
```

O caminho no workflow deriva do nome do repositório. Um domínio próprio requer ajustar `BASE_PATH` para `/` e configurar o domínio separadamente.

## Uso na apresentação

Os previews iniciam quando entram na área visível e pausam ao sair dela, ao abrir um vídeo ampliado ou ao ocultar a aba. “Pausar animações” interrompe todos os previews; a preferência de redução de movimento inicia a página pausada. Políticas de economia de bateria ou do navegador ainda podem bloquear reprodução automática; os posters e o player ampliado continuam disponíveis.

Teste no tablet físico antes da apresentação e mantenha uma cópia local dos vídeos. A página não possui service worker nem garantia de funcionamento offline. Preserve a identificação dos exemplos sintéticos e as limitações da pesquisa ao atualizar o conteúdo.
