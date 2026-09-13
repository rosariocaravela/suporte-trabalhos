# SUPORTE-TRABALHOS

## Plataforma Web de Suporte Informático

O **Suporte-Trabalhos** é uma plataforma web pessoal desenvolvida para apresentar e disponibilizar os meus serviços de suporte informático.

A plataforma funciona como o meu espaço profissional na internet, onde clientes podem conhecer o meu trabalho, consultar os serviços que presto, obter informações sobre problemas informáticos comuns e solicitar assistência.

O objetivo é facilitar o contacto entre mim, enquanto profissional de suporte informático, e os clientes que necessitam de assistência técnica.

---

## Objetivo do Projeto

O objetivo principal do projeto é criar uma plataforma profissional através da qual eu possa:

- Apresentar os meus serviços de suporte informático;
- Apresentar-me como profissional;
- Permitir que clientes conheçam os serviços disponíveis;
- Informar sobre preços e condições dos serviços;
- Receber pedidos de assistência;
- Organizar e acompanhar os pedidos dos clientes;
- Facilitar a comunicação com os clientes;
- Disponibilizar conteúdos e informações úteis sobre informática.

---

## Como a Plataforma Funciona

O cliente poderá chegar ao site através das redes sociais, Google, WhatsApp, links partilhados ou outros meios.

O fluxo principal será:

**Cliente**
→ Entra no site  
→ Conhece o profissional  
→ Consulta os serviços  
→ Consulta preços e informações  
→ Escolhe o serviço pretendido  
→ Solicita suporte  
→ Envia os dados e descreve o problema  
→ O pedido é recebido pelo profissional  
→ O profissional analisa o pedido  
→ Entra em contacto com o cliente  
→ O serviço é realizado

---

## Serviços de Suporte Informático

A plataforma poderá disponibilizar diferentes tipos de serviços, como:

- Manutenção de computadores;
- Formatação de computadores;
- Instalação do Windows;
- Instalação e configuração de programas;
- Configuração de computadores;
- Remoção de vírus e malware;
- Backup e recuperação de dados;
- Recuperação de ficheiros;
- Configuração de impressoras;
- Configuração de redes;
- Resolução de problemas de Internet;
- Suporte remoto;
- Configuração de equipamentos;
- Manutenção preventiva;
- Otimização de computadores;
- Outros serviços de assistência informática.

Os serviços serão apresentados com informações claras para que o cliente possa perceber o que é oferecido antes de solicitar assistência.

---

## Área do Cliente

O cliente poderá:

- Consultar os serviços;
- Solicitar assistência;
- Descrever o problema;
- Consultar os seus pedidos;
- Acompanhar o estado de um pedido;
- Consultar informações relacionadas ao serviço.

---

## Área do Profissional

A plataforma terá uma área privada para gestão dos serviços e pedidos.

Através do painel administrativo, poderei:

- Visualizar pedidos;
- Consultar informações dos clientes;
- Gerir serviços;
- Alterar preços;
- Acompanhar o estado dos pedidos;
- Gerir conteúdos;
- Consultar pedidos em andamento;
- Marcar pedidos como concluídos;
- Gerir informações profissionais.

---

## Estados dos Pedidos

Os pedidos poderão possuir diferentes estados:

- `PENDING` — Pedido recebido;
- `IN_REVIEW` — Pedido em análise;
- `SCHEDULED` — Serviço agendado;
- `IN_PROGRESS` — Serviço em execução;
- `COMPLETED` — Serviço concluído;
- `CANCELLED` — Pedido cancelado.

---

## Assistente de Atendimento

No futuro, a plataforma poderá possuir um assistente inteligente para responder às dúvidas mais comuns dos clientes.

O assistente poderá ajudar com questões relacionadas a:

- Serviços disponíveis;
- Preços;
- Problemas informáticos comuns;
- Manutenção;
- Backup;
- Formatação;
- Instalação de programas;
- Suporte remoto;
- Processo de solicitação de assistência.

Quando a situação exigir uma análise específica, o cliente poderá ser encaminhado diretamente para o profissional.

---

## Tecnologias

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS

### Backend

- Node.js
- Express

### Base de Dados

- PostgreSQL
- Sequelize

---

## Estrutura Inicial

```text
suporte-trabalhos/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── logos/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── services/
│   │   └── contents/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │
│   ├── hooks/
│   │
│   ├── context/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── README.md
└── .gitignore