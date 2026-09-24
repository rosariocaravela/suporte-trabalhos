export const requestStatuses = {
  pending: "Pendente",
  reviewing: "Em análise",
  waiting_client: "Aguardando cliente",
  quote_sent: "Orçamento enviado",
  awaiting_payment: "Aguardando pagamento",
  in_progress: "Em execução",
  completed: "Concluído",
  cancelled: "Cancelado",
};

export const requestPriorities = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
};

const requests = [
  {
    id: "ST-2048",
    service: "Diagnóstico e reparação",
    title: "Computador muito lento e reinicia sozinho",
    status: "reviewing",
    priority: "high",
    clientName: "Mariana Costa",
    provider: "Nélio M.",
    createdAt: "2026-09-20T09:20:00",
    updatedAt: "2026-09-21T10:40:00",
    description:
      "O equipamento liga normalmente, mas demora muito a abrir programas e reinicia sem aviso. Preciso de ajuda para identificar a causa e recuperar a estabilidade.",
    budget: "1 500,00 MT",
    budgetNote: "Diagnóstico + limpeza de software + otimização de arranque.",
    paymentStatus: "pending",
    contact: { phone: "+258 84 000 0000", email: "mariana@email.com" },
    messages: [
      {
        id: 1,
        sender: "client",
        author: "Mariana Costa",
        time: "2026-09-20 09:42",
        text: "O computador está lento desde ontem, principalmente ao abrir o navegador e o Office.",
      },
      {
        id: 2,
        sender: "provider",
        author: "Nélio M.",
        time: "2026-09-20 11:05",
        text: "Vou analisar o problema e confirmar se a causa é software, malware ou falha de hardware.",
      },
    ],
    timeline: [
      { label: "Pedido criado", date: "20 Set 2026", note: "Pedido submetido pelo cliente." },
      { label: "Em análise", date: "21 Set 2026", note: "Prestador confirmou receção do pedido." },
    ],
  },
  {
    id: "ST-2051",
    service: "Backup e recuperação",
    title: "Perdi ficheiros importantes após falha de sistema",
    status: "awaiting_payment",
    priority: "urgent",
    clientName: "João Pinto",
    provider: "Helena R.",
    createdAt: "2026-09-16T15:00:00",
    updatedAt: "2026-09-22T08:20:00",
    description:
      "Houve uma falha no sistema e alguns ficheiros digitais importantes deixaram de abrir. Preciso de recuperar os dados e compreender se existe risco de perda permanente.",
    budget: "2 900,00 MT",
    budgetNote: "Recuperação de dados, validação e configuração de backup preventivo.",
    paymentStatus: "pending",
    contact: { phone: "+258 82 111 2222", email: "joao@email.com" },
    messages: [
      {
        id: 1,
        sender: "client",
        author: "João Pinto",
        time: "2026-09-16 15:14",
        text: "Tive uma falha de sistema e preciso de recuperar vários documentos da pasta de trabalho.",
      },
      {
        id: 2,
        sender: "provider",
        author: "Helena R.",
        time: "2026-09-17 09:00",
        text: "Podemos fazer uma recuperação segura e confirmar se os ficheiros ainda estão acessíveis antes de avançar.",
      },
    ],
    timeline: [
      { label: "Pedido criado", date: "16 Set 2026", note: "Cliente identificou falha de sistema." },
      { label: "Orçamento enviado", date: "17 Set 2026", note: "Prestador apresentou valor e descrição." },
      { label: "Aguardando pagamento", date: "22 Set 2026", note: "Cliente ainda não confirmou a execução." },
    ],
  },
  {
    id: "ST-2056",
    service: "Suporte remoto",
    title: "Erro de rede e falha de conectividade",
    status: "in_progress",
    priority: "medium",
    clientName: "Sofia Almeida",
    provider: "Dário L.",
    createdAt: "2026-09-10T13:15:00",
    updatedAt: "2026-09-23T11:00:00",
    description:
      "O Wi-Fi cai em vários momentos do dia e tenho dificuldades para aceder ao sistema de gestão da empresa. Necesito apoio remoto para validar a rede.",
    budget: "1 200,00 MT",
    budgetNote: "Diagnóstico de rede e ajuste da configuração de Wi-Fi.",
    paymentStatus: "paid",
    contact: { phone: "+258 82 333 4444", email: "sofia@email.com" },
    messages: [
      {
        id: 1,
        sender: "client",
        author: "Sofia Almeida",
        time: "2026-09-10 13:22",
        text: "A conectividade falha mesmo quando estou a trabalhar no sistema.",
      },
      {
        id: 2,
        sender: "provider",
        author: "Dário L.",
        time: "2026-09-11 08:05",
        text: "Vou validar o router, a configuração da WLAN e o tráfego da rede.",
      },
    ],
    timeline: [
      { label: "Pedido criado", date: "10 Set 2026", note: "Pedido enviado para support remoto." },
      { label: "Em execução", date: "11 Set 2026", note: "Prestador iniciou diagnóstico e testes." },
    ],
  },
  {
    id: "ST-2060",
    service: "Formatação e instalação",
    title: "Preciso de reinstalar o sistema e os programas da empresa",
    status: "completed",
    priority: "low",
    clientName: "Anselmo Azevedo",
    provider: "Nélio M.",
    createdAt: "2026-09-05T08:30:00",
    updatedAt: "2026-09-12T17:15:00",
    description:
      "O equipamento está lento e com muitos programas desnecessários. Pretendo fazer uma reinstalação limpa com os programas essenciais para o trabalho.",
    budget: "1 800,00 MT",
    budgetNote: "Reinstalação, suporte e configuração de software essencial.",
    paymentStatus: "paid",
    contact: { phone: "+258 84 555 6666", email: "anselmo@email.com" },
    messages: [
      {
        id: 1,
        sender: "client",
        author: "Anselmo Azevedo",
        time: "2026-09-05 08:40",
        text: "Preciso da reinstalação com os programas necessários para o escritório.",
      },
      {
        id: 2,
        sender: "provider",
        author: "Nélio M.",
        time: "2026-09-06 10:21",
        text: "Irei instalar uma base limpa e validar os programas essenciais para evitar problemas futuros.",
      },
    ],
    timeline: [
      { label: "Pedido criado", date: "05 Set 2026", note: "Cliente solicitou reinstalação do sistema." },
      { label: "Concluído", date: "12 Set 2026", note: "Trabalho concluído e verificado." },
    ],
  },
];

export default requests;
