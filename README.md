# SUPORTE-TRABALHOS

## Plataforma de suporte técnico e serviços informáticos

O projeto **Suporte-Trabalhos** é uma plataforma web desenvolvida para apresentar serviços de suporte informático, facilitar o contacto com clientes e organizar pedidos de assistência técnica.

A ideia central deste trabalho é criar uma solução moderna, funcional e profissional para mostrar as competências técnicas, disponibilizar conteúdos úteis e permitir que os clientes solicitem ajuda de forma simples e organizada.

A plataforma vai além de uma simples apresentação pessoal: é um sistema pensado como canal de atendimento, divulgação de serviços e gestão de solicitações informáticas.

---

## Objetivo do projeto

Este projeto tem como objetivo principal criar uma plataforma digital que permita:

- Apresentar os serviços de suporte informático oferecidos;
- Explicar como funciona o atendimento e o processo de suporte;
- Permitir que o cliente consulte conteúdos e recursos úteis;
- Receber pedidos de assistência com descrição do problema;
- Organizar e acompanhar solicitações de serviço;
- Facilitar a comunicação entre cliente e prestador de serviços;
- Criar uma interface profissional e acessível para suporte técnico.

---

## Contexto do trabalho

O projeto foi pensado como uma solução para apoiar pessoas e empresas que precisam de assistência técnica em áreas como:

- manutenção de computadores;
- instalação e configuração de software;
- suporte a redes e conectividade;
- recuperação de ficheiros e backups;
- manutenção preventiva;
- resolução de problemas de hardware e software;
- suporte remoto e orientação técnica.

A plataforma atua como um ponto de contacto digital entre quem precisa de ajuda e quem presta o serviço.

---

## Como funciona a plataforma

O fluxo principal da aplicação pode ser resumido assim:

**Cliente**
→ entra no site  
→ visualiza os serviços e conteúdos  
→ consulta informações úteis  
→ solicita suporte  
→ descreve o problema  
→ envia pedido para análise  
→ recebe contacto ou orientação  
→ segue o processo de atendimento  
→ conclui o serviço

O sistema foi estruturado para servir como um canal prático de atendimento técnico e de apresentação profissional dos serviços.

---

## Serviços disponíveis

A plataforma inclui uma secção dedicada aos serviços informáticos, com foco em áreas como:

- suporte técnico geral;
- manutenção de computadores;
- instalação de software;
- configuração de sistemas;
- diagnóstico e resolução de problemas;
- suporte a redes e internet;
- backup e recuperação de dados;
- otimização de desempenho de equipamentos;
- suporte remoto;
- manutenção preventiva;
- orientação na escolha de soluções técnicas.

---

## Conteúdos e recursos educativos

Além dos serviços, a aplicação também oferece conteúdos informativos para ajudar o utilizador a compreender melhor problemas técnicos comuns e boas práticas de utilização.

Entre os conteúdos podem constar:

- dicas de manutenção;
- tutoriais de segurança digital;
- explicações sobre desempenho de computadores;
- resoluções de problemas de conectividade;
- orientações sobre backups;
- conteúdos sobre suporte remoto e prevenção.

Essa parte ajuda a posicionar o projeto como uma plataforma útil, informativa e de apoio técnico.

---

## Área pública

A aplicação possui uma área pública acessível a qualquer visitante, com páginas para:

- página inicial;
- apresentação dos serviços;
- conteúdos informativos;
- vídeos e materiais de apoio;
- FAQ;
- página de contacto;
- formulário de solicitação de suporte.

Esta área é pensada para facilitar a descoberta do projeto e incentivar a procura de ajuda técnica.

---

## Área de gestão

O projeto inclui áreas privadas para clientes e prestadores. A autenticação, perfis, catálogo de serviços, pedidos, histórico, mensagens e notificações estão ligados ao Supabase. A área de pagamentos mantém histórico somente de leitura; cobrança online e administração ainda não estão disponíveis.

- visualizar pedidos recebidos;
- consultar detalhes dos clientes;
- acompanhar o estado dos pedidos;
- gerir serviços e conteúdos;
- controlar informações do atendimento;
- manter organização do processo de suporte.

---

## Estados dos pedidos

A aplicação pode seguir um fluxo de atendimento com estados como:

- `PENDING` — pedido recebido;
- `IN_REVIEW` — em análise;
- `SCHEDULED` — agendado;
- `IN_PROGRESS` — em execução;
- `COMPLETED` — concluído;
- `CANCELLED` — cancelado.

---

## Tecnologias utilizadas

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Lucide React
- Supabase Auth e PostgreSQL

### Estrutura da aplicação

- React Router
- Componentes reutilizáveis
- Layouts públicos e privados
- Hooks para lógica de interface
- Row Level Security (RLS) para proteger os dados no Supabase

### Estado da integração

- Registo, login, sessão e logout com Supabase Auth
- Recuperação de password por email; Google/GitHub dependem de configuração dos fornecedores no Supabase
- Perfis criados por trigger e atualização permitida de nome/telefone
- Serviços e catálogo público carregados do Supabase, com gestão pelo prestador
- Pedidos persistidos, listas/dashboards reais, histórico de estados, transições e agendamento
- Conteúdos e vídeos geridos por prestadores e visíveis publicamente apenas quando publicados
- Notificações e mensagens internas em tempo real, protegidas por RLS
- Estrutura de pagamentos e histórico de leitura; não existe gateway, cobrança nem confirmação pelo frontend
- Não existe painel administrativo dedicado

## Configuração local

Instala as dependências:

```bash
npm install
```

Cria `.env.local` a partir de `.env.example` e preenche as credenciais do projeto Supabase:

```powershell
Copy-Item .env.example .env.local
```

O ficheiro deve conter a URL do projeto e a chave pública:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica
```

Não coloques uma chave `service_role` no frontend nem submetas ficheiros `.env` com credenciais.

No painel do Supabase, abre **SQL Editor** e executa os ficheiros pela ordem indicada:

1. `supabase/schema.sql`
2. `supabase/policies.sql`

Os scripts são repetíveis e atualizam as tabelas existentes. Depois de alterações nestes ficheiros, executa novamente `schema.sql` e depois `policies.sql`. A aplicação não consegue validar a base de dados remota até os scripts serem executados no painel.

Para recuperação de password e OAuth, adiciona `http://localhost:5173/auth/password-reset` e `http://localhost:5173/auth/login` às URLs permitidas em **Authentication → URL Configuration**. Para Google/GitHub, ativa cada fornecedor e configura as respetivas credenciais no Supabase.

Pagamentos online exigem país/moeda confirmados, conta de comerciante num gateway e uma Edge Function/webhook configurados no servidor. Até isso existir, a aplicação não inicia nem simula cobranças.

Inicia a aplicação:

```bash
npm run dev
```

Para verificar o projeto, também podes executar `npm run lint` e `npm run build`.

---

## Estrutura do projeto

```text
suporte-trabalhos/
│
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── logos/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── services/
│   │   └── contents/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── main.jsx
│   └── index.css
│
├── supabase/
│   ├── schema.sql
│   └── policies.sql
├── package.json
├── vite.config.js
├── README.md
├── eslint.config.js
└── .gitignore
```

---

## Objetivo do trabalho atual

Este projeto está a ser desenvolvido como uma plataforma de apoio técnico e apresentação de serviços digitais, com foco em:

- profissionalismo;
- clareza de comunicação;
- organização de pedidos;
- suporte técnico acessível;
- disponibilização de informações úteis;
- experiência do cliente no contacto com o serviço.

Em vez de ser apenas uma “página pessoal”, o projeto assume uma identidade mais prática: uma solução digital para atendimento e suporte informático.

---

## Conclusão

O **Suporte-Trabalhos** é uma proposta de plataforma web para transformar o atendimento técnico em uma experiência mais organizada, moderna e funcional.

O objetivo é unir apresentação profissional, divulgação de serviços, conteúdo útil e processo de solicitação de apoio num único espaço digital, tornando o suporte informático mais acessível e eficiente.
