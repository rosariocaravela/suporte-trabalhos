Estou a desenvolver um projeto Web chamado **Suporte-Trabalhos**, cujo objetivo é criar uma plataforma de suporte e qualificação de clientes para um profissional de contabilidade.

O problema que queremos resolver é o seguinte: o contabilista divulga os seus serviços através das redes sociais e recebe muitas mensagens de pessoas que fazem perguntas básicas ou apenas demonstram curiosidade. O objetivo do site é fornecer essas informações antecipadamente, responder dúvidas frequentes através de um assistente de IA e identificar os clientes que realmente pretendem contratar um serviço.

### Objetivo do MVP

O fluxo principal deve ser:

Redes sociais → Website → Conhecer o profissional → Ver serviços → Consultar informações/preços → Tirar dúvidas com IA → Escolher serviço → Solicitar serviço → Pagar uma percentagem inicial → Pedido confirmado → Contabilista recebe o pedido e entra em contacto com o cliente.

O site deve ter uma aparência profissional, moderna, limpa e confiável, adequada para uma empresa/profissional da área de contabilidade.

### Tecnologias

Frontend:

* React
* Vite
* JavaScript
* Tailwind CSS

Não utilizar TypeScript.

O projeto React/Vite já existe e o Tailwind CSS já está configurado. Não recriar a configuração do Tailwind.

### Identidade visual

Utilizar uma paleta profissional baseada nas seguintes cores:

* Azul-marinho: #0F2747 — cor principal
* Azul petróleo: #155E75 — cor secundária
* Dourado suave: #D4A72C — cor de destaque
* Branco: #FFFFFF — fundo principal
* Cinza muito claro: #F5F7FA — fundos alternativos
* Cinza escuro: #1F2937 — textos

A utilização das cores deve ser equilibrada. O azul-marinho deve transmitir confiança e profissionalismo. O dourado deve ser utilizado apenas em detalhes importantes, como pequenos destaques, ícones, indicadores e elementos de chamada para ação.

Evitar excesso de cores, gradientes exagerados ou aparência de template genérico.

### Página inicial

Criar uma Home moderna e responsiva.

A primeira seção deve apresentar claramente:

* Uma mensagem principal sobre os serviços de contabilidade;
* Uma pequena descrição;
* Botão "Ver serviços";
* Botão "Falar com assistente";
* Uma imagem profissional do contabilista.

Depois criar uma seção **"Sobre o profissional"**.

Essa seção deve apresentar a fotografia profissional do contabilista e explicar de forma clara:

* Quem é o profissional;
* A sua área de atuação;
* A sua experiência;
* O tipo de clientes que atende;
* Os principais serviços que presta.

A fotografia deve ter destaque, mas a seção não deve parecer apenas um perfil pessoal. Deve transmitir confiança profissional.

### Seção de serviços

Criar uma seção onde os visitantes possam visualizar os principais serviços.

Cada serviço deve aparecer num cartão contendo:

* Nome do serviço;
* Pequena descrição;
* Preço;
* Percentagem inicial;
* Valor inicial a pagar;
* Prazo, quando aplicável;
* Botão "Solicitar serviço";
* Botão "Ver detalhes".

Exemplo:

Contabilidade Mensal
Preço: 5.000 MT
Pagamento inicial: 20%
Valor inicial: 1.000 MT

O preço e a percentagem devem ser apresentados de forma clara antes de o cliente solicitar o serviço.

### Assistente de IA

Adicionar uma interface de chatbot que posteriormente será integrada com uma API de IA.

O assistente deve responder perguntas frequentes relacionadas com:

* Serviços;
* Preços;
* Documentos necessários;
* Prazos;
* Forma de funcionamento;
* Processo de contratação.

A interface deve deixar claro que o assistente fornece informações iniciais e que questões específicas podem ser encaminhadas para o contabilista.

Adicionar uma chamada para ação quando o cliente demonstrar interesse:

"Quero contratar este serviço"

### Solicitação de serviço

Quando o cliente escolher um serviço, deverá preencher um formulário simples:

* Nome;
* Telefone;
* Email;
* Serviço escolhido;
* Observação ou descrição da necessidade.

Depois mostrar um resumo:

Serviço: Contabilidade Mensal
Preço total: 5.000 MT
Percentagem inicial: 20%
Valor a pagar: 1.000 MT

O cliente deve então avançar para o pagamento.

### Pagamento

O sistema deverá ser preparado para futuramente integrar um meio de pagamento utilizado em Moçambique.

Não criar um pagamento falso nem considerar automaticamente que o pagamento foi realizado apenas porque o utilizador clicou num botão.

O fluxo esperado futuramente será:

PENDING_PAYMENT → pagamento confirmado → PAID → pedido enviado ao contabilista.

### Dashboard do contabilista

Criar uma área protegida para o contabilista visualizar:

* Número de pedidos;
* Pedidos aguardando pagamento;
* Pagamentos confirmados;
* Pedidos em atendimento;
* Pedidos concluídos.

Cada pedido deve apresentar:

* Nome do cliente;
* Telefone;
* Serviço;
* Preço total;
* Percentagem;
* Valor pago;
* Estado;
* Data do pedido.

O objetivo é que o contabilista só precise entrar em contacto pessoalmente depois que o cliente demonstrar interesse real e, no caso do MVP, efetuar o pagamento inicial.

### Páginas iniciais

Criar inicialmente:

1. Home
2. Serviços
3. Detalhes do Serviço
4. Sobre o profissional
5. Solicitar Serviço
6. Pagamento
7. Login
8. Dashboard do contabilista
9. Pedidos

O projeto deve ser responsivo para computador, tablet e telemóvel.

### Estrutura inicial do frontend

Organizar o código de forma simples e escalável:

src/
├── assets/
├── components/
├── pages/
├── layouts/
├── services/
├── App.jsx
├── main.jsx
└── index.css

Criar componentes reutilizáveis, evitando colocar toda a interface dentro do App.jsx.

### Importante

Neste momento, o objetivo é construir primeiro um **MVP funcional e visualmente profissional**, não implementar todas as funcionalidades avançadas.

Priorizar nesta ordem:

1. Home
2. Apresentação do profissional
3. Serviços
4. Detalhes dos serviços
5. Solicitação
6. Dashboard
7. Depois integrar backend, base de dados, IA e pagamento.

Não adicionar funcionalidades desnecessárias ao MVP.

A experiência deve ser simples para o visitante: ele deve entender rapidamente quem é o profissional, quais serviços são oferecidos, quanto custam e como pode solicitar um serviço.
