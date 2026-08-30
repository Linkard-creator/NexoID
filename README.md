# NexoID

Sistema de identidade digital com perfil público, links, QR Code, autenticação e experiência premium.

## Status geral

Projeto em evolução com foco em estabilidade, experiência real do usuário e preparação para uso em produção.

## Regras de execução segura

- Nunca commitar arquivos locais com segredos reais.
- Separar variáveis públicas das internas/administrativas.
- Manter `NEXT_PUBLIC_*` apenas para dados públicos.
- Respeitar a separação entre ambiente de desenvolvimento, produção e admin.
- Validar builds e rotas antes de considerar uma etapa concluída.
- Trabalhar por fases completas, nunca por itens isolados sem contexto de objetivo da fase.
- Cada fase deve ser entregue com validação real, documentação e commit final.
- Cada check representa uma fase concluída, não uma tarefa mínima desconectada do objetivo geral.
- Ao fim de cada fase bem-sucedida, executar commit com mensagem clara e objetiva.

## Regra de trabalho por fases

1. Escolher uma prioridade e entender o objetivo completo da fase.
2. Implementar tudo que faz parte daquela fase, sem quebrar escopo.
3. Validar comportamento real com build, testes relevantes ou execução local.
4. Atualizar o checklist marcando a fase como concluída.
5. Fazer commit representando a entrega daquela fase.

> Importante: um "check" deve cobrir a fase em andamento, e não apenas um detalhe isolado. Isso mantém a evolução consistente e segura.

## Regra de otimização — Zero retrabalho

**Princípio**: Máxima eficiência de recursos. Cada arquivo é editado uma única vez por sessão.

- Ler arquivo completo antes de editar
- Validar sintaxe TypeScript/React antes de editar
- Usar `multi_replace_string_in_file` para múltiplas mudanças no mesmo arquivo
- Nunca tentar editar o mesmo arquivo duas vezes sem confirmação de sucesso
- Build obrigatório antes de considerar fase completa
- Se build falhar, investigar causa raiz e corrigir em uma única passada
- Evitar incrementalismo: implementar feature completa de uma vez
- Commits somente após validação total da fase

**Checklist pré-commit**:

- [ ] Build passou sem erros: `npm run build`
- [ ] Sintaxe TypeScript/JSX validada
- [ ] Arquivos editados seguem padrões do projeto
- [ ] Funcionalidade foi testada (navegação, lógica)
- [ ] Nenhum arquivo quebrado ou incompleto
- [ ] Checklist atualizado com items [x]
- [ ] Commit mensagem clara e associada à fase


## Checklist de desenvolvimento

### Prioridade 0 — Base segura e ambiente

- [x] Revisão inicial da arquitetura e estrutura do app
- [x] Separação clara entre env público e env admin/internal
- [x] Configuração de OAuth Google validada e condicionada
- [x] Estrutura de ambiente para desenvolvimento e local
- [x] Auditoria de arquivos e limpeza de artefatos não utilizados
- [x] Verificação de build final da aplicação
- [ ] Revisar `.env.example` e manter alinhado com o padrão real do projeto
- [ ] Validar ambiente de produção no Vercel com separação final de secrets

### Prioridade 1 — Autenticação e perfil real

- [x] Registro e login funcionando com fluxo básico
- [x] Proteção de rotas autenticadas
- [x] Sistema de roles de usuário e admin
- [x] Usuário admin separado e controlado por e-mail
- [x] Perfil público consultando dados reais do banco
- [x] Endpoint de atualização de perfil do usuário
- [x] Edição de nome, username e bio no dashboard
- [ ] Validar cenários de username duplicado em UX mais amigável
- [ ] Criar feedback mais completo para sucesso/erro no cadastro e login

### Prioridade 2 — Perfil, links e QR Code

- [x] Página de perfil do usuário conectada ao banco
- [x] Gestão de links no dashboard
- [x] API de criação/atualização/remoção de links
- [x] Links aparecendo no perfil público
- [x] QR Code real do perfil gerado para o usuário
- [x] Download do QR Code do perfil
- [x] Melhorar preview de perfil público com UI refinada
- [x] Adicionar status visual do perfil (ativo/inativo, público/privado)
- [x] Permitir reorder real de links com UX mais fluida

### Prioridade 3 — Personalização e UX

- [x] Suporte a tema claro e escuro
- [x] Persistência de preferências visuais do usuário
- [x] Toggle de tema no menu de configuração do usuário
- [x] Ajustes visuais e consistência de identidade visual
- [ ] Refinar acessibilidade geral (contraste, foco, keyboard navigation)
- [ ] Revisar microinterações e estados de loading/empty
- [ ] Melhorar mensagens de erro e success do usuário

### Prioridade 4 — Gestão administrativa

- [x] Estrutura inicial do painel admin
- [x] Configurações administrativas baseadas em sistema
- [ ] Revisar painel de usuários e ações internas
- [ ] Criar gestão de usuários ativos/inativos
- [ ] Revisar administração de produtos e checkout Stripe
- [ ] Melhorar controle de logs e auditoria

### Prioridade 5 — Produto e monetização

- [ ] Finalizar fluxo de compra do cartão NexoID
- [ ] Validar integração completa de Stripe
- [ ] Revisar webhook e sincronização do status do pagamento
- [ ] Definir pricing e regras de produto
- [ ] Criar onboarding real pós-cadastro

### Prioridade 6 — Expansão social e descoberta

- [ ] Implementar busca por perfis
- [ ] Criar feed ou páginas públicas de descoberta
- [ ] Adicionar sistema de seguidores / conexões
- [ ] Criar experiências de networking em eventos
- [ ] Definir roadmap de comunidades e recomendações

## Status atual

Fase 1 e 2 concluídas: autenticação, perfil real, links, QR Code e reorder.

Fase ativa: 3

Itens concluidos neste momento:

- ambiente seguro e separado
- autenticação e roles
- perfil real
- links funcionais
- QR Code funcional
- tema claro/escuro persistente

Próximo foco:

- refinamento de UX do perfil público
- ajustes de acessibilidade
- painel administrativo e monetização
- onboarding e experiência pós-cadastro

## Como acompanhar evolução

Ao concluir uma fase inteira, troque o item de:

- [ ] para [x]

A marca representa que a fase foi implementada, validada e entregue com commit final.

## Política de commit por fase

Ao finalizar uma fase bem-sucedida:

```bash
git add .
git commit -m "feat: fase X - [nome da fase]"
```

Exemplos:

```bash
git commit -m "feat: fase 1 - autenticação e perfil real"
git commit -m "feat: fase 2 - links e qr code"
```

Sem commit após fase concluída, a fase não é considerada finalizada.

## Comandos de validação segura

```bash
cd /workspaces/NexoID/nexoid
npm install
npm run build
```

Se for alterar Prisma ou banco:

```bash
npx prisma generate
npx prisma db push
```

Antes de publicar ou rodar em produção:

- confirmar `NEXT_PUBLIC_APP_URL`
- confirmar `AUTH_SECRET`
- confirmar `POSTGRES_*`
- confirmar `AUTH_GOOGLE_*` e `STRIPE_*`
- confirmar `ADMIN_EMAIL`
- testar fluxo público e fluxo admin separadamente

## Observações importantes

- O perfil público nunca deve depender de chaves internas ou admin.
- A experiência de usuário comum não deve ser afetada por funções administrativas.
- Qualquer melhoria visual deve respeitar tema claro e escuro.
- O checklist deve ser atualizado junto com o código.

---

NexoID — identidade digital consistente, acessível e pronta para crescer.
