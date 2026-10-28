const appShell = document.getElementById('appShell');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const authTabs = document.querySelectorAll('.auth-tab');
const modeToggle = document.getElementById('modeToggle');
const modeStatus = document.getElementById('modeStatus');
const assistantInput = document.getElementById('assistantInput');
const assistantSend = document.getElementById('assistantSend');
const assistantChat = document.getElementById('assistantChat');
const summaryCards = document.getElementById('summaryCards');
const todayAgenda = document.getElementById('todayAgenda');
const clientsTableBody = document.getElementById('clientsTableBody');
const clientDetail = document.getElementById('clientDetail');
const agendaCalendar = document.getElementById('agendaCalendar');
const radarPanel = document.getElementById('radarPanel');
const demoStage = document.getElementById('demoStage');
const settingsForm = document.getElementById('settingsForm');
const servicesList = document.getElementById('servicesList');
const hoursList = document.getElementById('hoursList');

const settings = {
  businessName: 'Barbearia ChryS',
  ownerName: 'ChryS',
  whatsapp: '(42) 99999-9999',
  address: 'Rua do Corte, 125',
  instagram: '@chrysbarber',
  services: [
    { id: 'corte', name: 'Corte', price: 40, duration: 30 },
    { id: 'barba', name: 'Barba', price: 30, duration: 30 },
    { id: 'corte-barba', name: 'Corte + Barba', price: 65, duration: 60 },
    { id: 'sobrancelha', name: 'Sobrancelha', price: 15, duration: 15 }
  ],
  schedule: {
    Segunda: '09:00 - 19:00',
    Terça: '09:00 - 19:00',
    Quarta: '09:00 - 19:00',
    Quinta: '09:00 - 19:00',
    Sexta: '09:00 - 19:00',
    Sábado: '09:00 - 16:00',
    Domingo: 'Fechado'
  }
};

const state = {
  isLoggedIn: false,
  modeAtendimento: false,
  agendaView: 'day',
  selectedClientId: 1,
  selectedService: null,
  selectedDate: 'quinta-feira',
  selectedTime: '14:00',
  wizardStep: 1,
  demoData: {
    name: 'Rafael',
    whatsapp: '(42) 98888-7777'
  }
};

const clientes = [
  { id: 1, nome: 'João Silva', ultimoAtendimento: 'há 7 dias', servico: 'Corte', proximoHorario: 'sábado', status: 'Ativo', whatsapp: '(42) 98888-1111', historico: ['Corte', 'Corte', 'Corte + Barba'], frequencia: '30 dias', retorno: '30 dias', ultimo: '27 dias atrás' },
  { id: 2, nome: 'Carlos Souza', ultimoAtendimento: 'há 31 dias', servico: 'Corte + Barba', proximoHorario: '—', status: 'Retorno pendente', whatsapp: '(42) 98888-2222', historico: ['Corte + Barba', 'Barba'], frequencia: '35 dias', retorno: '31 dias', ultimo: '31 dias atrás' },
  { id: 3, nome: 'Rafael Lima', ultimoAtendimento: 'há 12 dias', servico: 'Corte', proximoHorario: 'terça', status: 'Agendado', whatsapp: '(42) 98888-3333', historico: ['Corte', 'Sobrancelha'], frequencia: '14 dias', retorno: '12 dias', ultimo: '12 dias atrás' },
  { id: 4, nome: 'Mateus Costa', ultimoAtendimento: 'há 18 dias', servico: 'Barba', proximoHorario: 'quarta', status: 'Ativo', whatsapp: '(42) 98888-4444', historico: ['Barba', 'Barba'], frequencia: '20 dias', retorno: '18 dias', ultimo: '18 dias atrás' },
  { id: 5, nome: 'Lucas Pereira', ultimoAtendimento: 'há 9 dias', servico: 'Corte', proximoHorario: 'sexta', status: 'Ativo', whatsapp: '(42) 98888-5555', historico: ['Corte', 'Corte + Barba'], frequencia: '10 dias', retorno: '9 dias', ultimo: '9 dias atrás' },
  { id: 6, nome: 'Henrique Almeida', ultimoAtendimento: 'há 63 dias', servico: 'Corte + Barba', proximoHorario: '—', status: 'Retorno pendente', whatsapp: '(42) 98888-6666', historico: ['Corte + Barba', 'Corte'], frequencia: '40 dias', retorno: '63 dias', ultimo: '63 dias atrás' },
  { id: 7, nome: 'Gabriel Rocha', ultimoAtendimento: 'há 5 dias', servico: 'Sobrancelha', proximoHorario: 'quinta', status: 'Ativo', whatsapp: '(42) 98888-7777', historico: ['Sobrancelha', 'Corte'], frequencia: '7 dias', retorno: '5 dias', ultimo: '5 dias atrás' },
  { id: 8, nome: 'Vinícius Nunes', ultimoAtendimento: 'há 42 dias', servico: 'Corte', proximoHorario: '—', status: 'Retorno pendente', whatsapp: '(42) 98888-8888', historico: ['Corte', 'Barba'], frequencia: '30 dias', retorno: '42 dias', ultimo: '42 dias atrás' }
];

const agenda = [
  { time: '09:00', cliente: 'João', servico: 'Corte', status: 'Confirmado', type: 'booking' },
  { time: '10:00', cliente: 'Carlos', servico: 'Corte + Barba', status: 'Confirmado', type: 'booking' },
  { time: '11:00', cliente: 'Lucas', servico: 'Corte', status: 'Aguardando', type: 'booking' },
  { time: '14:00', cliente: 'Rafael', servico: 'Corte', status: 'Confirmado', type: 'booking' },
  { time: '15:00', cliente: 'Mateus', servico: 'Barba', status: 'Confirmado', type: 'booking' },
  { time: '16:30', cliente: 'Gabriel', servico: 'Sobrancelha', status: 'Aguardando', type: 'booking' },
  { time: '17:30', cliente: '—', servico: 'Disponível', status: 'Livre', type: 'free' },
  { time: '18:30', cliente: '—', servico: 'Disponível', status: 'Livre', type: 'free' }
];

const weekAgenda = [
  { day: 'Seg', slots: ['09:00', '10:00', '14:00'] },
  { day: 'Ter', slots: ['09:30', '11:00', '15:30'] },
  { day: 'Qua', slots: ['10:30', '13:00', '16:00'] },
  { day: 'Qui', slots: ['09:00', '10:30', '14:00'] },
  { day: 'Sex', slots: ['09:30', '11:30', '15:00'] },
  { day: 'Sáb', slots: ['09:00', '12:00'] },
  { day: 'Dom', slots: ['Fechado'] }
];

const assistantExamples = [
  { ask: 'como está minha agenda amanhã', answer: 'Amanhã você tem 6 horários ocupados e 3 horários disponíveis. Seu primeiro atendimento é às 09:00 e o último às 17:30. Previsão de faturamento: R$ 390.' },
  { ask: 'quem está marcado hoje', answer: 'Hoje estão agendados: João às 09:00 — Corte, Carlos às 10:00 — Corte + Barba, Lucas às 11:00 — Corte, Rafael às 14:00 — Corte, Mateus às 15:00 — Barba, Gabriel às 16:30 — Sobrancelha.' },
  { ask: 'quais clientes estão há muito tempo sem voltar', answer: 'Henrique Almeida está há 63 dias sem voltar acompanhado de Corte + Barba. Vinícius Nunes está há 42 dias e Carlos Souza há 31 dias. Posso preparar uma mensagem para qualquer um deles.' },
  { ask: 'bloqueie amanhã das 12h às 14h', answer: 'Perfeito. Amanhã, o intervalo das 12:00 às 14:00 foi bloqueado para sua agenda.' },
  { ask: 'quanto tenho previsto para faturar hoje', answer: 'Hoje você tem previsão de faturamento de R$ 520. O maior volume está em cortes e combinações de corte + barba.' }
];

function formatPrice(value) {
  return `R$ ${Number(value).toFixed(0)}`;
}

function renderSummary() {
  const totalClients = clientes.length;
  const totalRevenue = 520;
  const appointmentsToday = agenda.filter(item => item.type === 'booking').length;
  const pending = agenda.filter(item => item.status === 'Aguardando').length;

  summaryCards.innerHTML = `
    <div class="stat-card"><span>📅 Agenda de hoje</span><strong>${appointmentsToday} agendamentos</strong></div>
    <div class="stat-card"><span>⏳ Confirmações</span><strong>${pending} aguardando</strong></div>
    <div class="stat-card"><span>👥 Clientes</span><strong>${totalClients} cadastrados</strong></div>
    <div class="stat-card"><span>💰 Faturamento previsto</span><strong>${formatPrice(totalRevenue)}</strong></div>
  `;
}

function renderTodayAgenda() {
  todayAgenda.innerHTML = agenda.map(item => `
    <div class="agenda-item ${item.type === 'free' ? 'free' : ''}">
      <div class="time-label">${item.time}</div>
      <div class="agenda-meta">
        <strong>${item.cliente === '—' ? 'Disponível' : item.cliente}</strong>
        <span>${item.servico}</span>
        <small>${item.status}</small>
      </div>
    </div>
  `).join('');
}

function renderClientsTable() {
  clientsTableBody.innerHTML = clientes.map(cliente => `
    <tr data-client-id="${cliente.id}" class="client-row ${cliente.id === state.selectedClientId ? 'is-selected' : ''}">
      <td>${cliente.nome}</td>
      <td>${cliente.ultimoAtendimento}</td>
      <td>${cliente.servico}</td>
      <td>${cliente.proximoHorario}</td>
      <td><span class="status-badge ${cliente.status === 'Retorno pendente' ? 'pending' : 'active'}">${cliente.status}</span></td>
    </tr>
  `).join('');

  document.querySelectorAll('.client-row').forEach(row => {
    row.addEventListener('click', () => {
      state.selectedClientId = Number(row.dataset.clientId);
      renderClientsTable();
      renderClientDetail();
    });
  });
}

function renderClientDetail() {
  const client = clientes.find(item => item.id === state.selectedClientId) || clientes[0];

  clientDetail.innerHTML = `
    <h3>${client.nome}</h3>
    <p><strong>WhatsApp:</strong> ${client.whatsapp}</p>
    <p><strong>Histórico:</strong> ${client.historico.join(', ')}</p>
    <p><strong>Serviços usados:</strong> ${client.historico.join(', ')}</p>
    <p><strong>Último atendimento:</strong> ${client.ultimo}</p>
    <p><strong>Frequência aproximada:</strong> ${client.frequencia}</p>
    <button class="secondary-btn small" type="button">Preparar mensagem</button>
  `;
}

function renderAgenda() {
  if (state.agendaView === 'week') {
    agendaCalendar.innerHTML = `
      <div class="week-grid">
        ${weekAgenda.map(day => `
          <div class="week-day">
            <strong>${day.day}</strong>
            <div class="day-slots">
              ${day.slots.map(slot => `<span>${slot}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    return;
  }

  agendaCalendar.innerHTML = `
    <div class="day-grid">
      ${agenda.map(slot => `
        <button class="slot ${slot.type === 'free' ? 'slot-free' : ''}" type="button" data-slot="${slot.time}">
          <span>${slot.time}</span>
          <small>${slot.cliente === '—' ? 'Livre' : slot.cliente}</small>
          <strong>${slot.servico}</strong>
        </button>
      `).join('')}
    </div>
  `;

  document.querySelectorAll('.slot').forEach(slot => {
    slot.addEventListener('click', () => {
      const selectedTime = slot.dataset.slot;
      const target = agenda.find(item => item.time === selectedTime);
      if (target && target.type === 'free') {
        target.type = 'booking';
        target.cliente = 'Novo cliente';
        target.servico = 'Corte';
        target.status = 'Confirmado';
        renderAgenda();
        renderTodayAgenda();
        renderSummary();
      }
    });
  });
}

function renderRadar() {
  const suggestions = [
    { nome: 'João', tempo: 'Último corte: 27 dias atrás', mensagem: 'Costuma voltar aproximadamente a cada 30 dias.' },
    { nome: 'Carlos', tempo: 'Último corte: 31 dias atrás', mensagem: 'Costuma voltar aproximadamente a cada 35 dias.' },
    { nome: 'Henrique', tempo: 'Último corte: 63 dias atrás', mensagem: 'Cliente de alto valor, retorno pendente.' }
  ];

  radarPanel.innerHTML = `
    <div class="radar-card">
      <p class="radar-title">3 clientes podem estar próximos de retornar.</p>
      ${suggestions.map(item => `
        <div class="radar-item">
          <div class="radar-info">
            <strong>${item.nome}</strong>
            <span>${item.tempo}</span>
            <small>${item.mensagem}</small>
          </div>
          <button class="ghost-btn small" type="button">Preparar mensagem</button>
        </div>
      `).join('')}
    </div>
  `;

  const prepareButtons = radarPanel.querySelectorAll('.ghost-btn');
  prepareButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.textContent = 'Mensagem pronta';
      button.classList.add('success');
    });
  });
}

function renderAssistant() {
  assistantChat.innerHTML = `
    <div class="assistant-message assistant-bot">
      <strong>Assistente</strong>
      <p>Olá, ChryS. Como posso ajudar?</p>
    </div>
  `;
}

function handleAssistantPrompt() {
  const value = assistantInput.value.trim();
  if (!value) return;

  const lower = value.toLowerCase();
  let answer = 'Posso ajudar com isso. Sua agenda de hoje está equilibrada e você tem 8 clientes agendados.';

  const match = assistantExamples.find(item => lower.includes(item.ask.toLowerCase().replace(/[^a-z0-9]/g, '')));
  if (match) {
    answer = match.answer;
  }

  assistantChat.innerHTML += `
    <div class="assistant-message assistant-user">
      <strong>Você</strong>
      <p>${value}</p>
    </div>
    <div class="assistant-message assistant-bot">
      <strong>Assistente</strong>
      <p>${answer}</p>
    </div>
  `;

  assistantInput.value = '';
  assistantChat.scrollTop = assistantChat.scrollHeight;
}

function renderSettingsForm() {
  const inputs = {
    fieldBusinessName: settings.businessName,
    fieldOwnerName: settings.ownerName,
    fieldWhatsApp: settings.whatsapp,
    fieldAddress: settings.address,
    fieldInstagram: settings.instagram
  };

  Object.entries(inputs).forEach(([id, value]) => {
    document.getElementById(id).value = value;
  });

  servicesList.innerHTML = settings.services.map(service => `
    <div class="service-row">
      <span>${service.name} — ${formatPrice(service.price)} — ${service.duration} min</span>
    </div>
  `).join('');

  hoursList.innerHTML = Object.entries(settings.schedule).map(([day, range]) => `
    <div class="hours-row">
      <span>${day}</span>
      <strong>${range}</strong>
    </div>
  `).join('');
}

function handleSettingsSubmit(event) {
  event.preventDefault();

  settings.businessName = document.getElementById('fieldBusinessName').value;
  settings.ownerName = document.getElementById('fieldOwnerName').value;
  settings.whatsapp = document.getElementById('fieldWhatsApp').value;
  settings.address = document.getElementById('fieldAddress').value;
  settings.instagram = document.getElementById('fieldInstagram').value;

  alert('Configuração salva com sucesso.');
}

function initDemoWizard() {
  const serviceOptions = [
    { id: 'corte', label: '✂️ Corte', price: 'R$ 40', duration: '30 min' },
    { id: 'corte-barba', label: '🧔 Corte + Barba', price: 'R$ 65', duration: '60 min' },
    { id: 'barba', label: '🧔 Barba', price: 'R$ 30', duration: '30 min' }
  ];

  const dates = [
    'quinta-feira',
    'sexta-feira',
    'sábado',
    'segunda-feira'
  ];

  const timeSlots = [
    { time: '09:00', status: 'disponível' },
    { time: '09:30', status: 'ocupado' },
    { time: '10:00', status: 'disponível' },
    { time: '10:30', status: 'disponível' },
    { time: '11:00', status: 'ocupado' },
    { time: '14:00', status: 'disponível' },
    { time: '14:30', status: 'disponível' },
    { time: '16:00', status: 'ocupado' }
  ];

  function renderWizard() {
    const { wizardStep, selectedService, selectedDate, selectedTime } = state;

    if (wizardStep === 1) {
      demoStage.innerHTML = `
        <p class="fake-title">Escolha o serviço</p>
        <div class="demo-service-list">
          ${serviceOptions.map(service => `
            <button class="demo-option ${selectedService === service.id ? 'selected' : ''}" data-service="${service.id}" type="button">
              <span>${service.label}</span>
              <small>${service.price}</small>
              <em>${service.duration}</em>
            </button>
          `).join('')}
        </div>
      `;

      demoStage.querySelectorAll('[data-service]').forEach(button => {
        button.addEventListener('click', () => {
          state.selectedService = button.dataset.service;
          state.wizardStep = 2;
          renderWizard();
        });
      });
      return;
    }

    if (wizardStep === 2) {
      demoStage.innerHTML = `
        <p class="fake-title">Escolha o dia</p>
        <div class="date-grid">
          ${dates.map(date => `
            <button class="demo-date ${selectedDate === date ? 'selected' : ''}" data-date="${date}" type="button">${date}</button>
          `).join('')}
        </div>
      `;

      demoStage.querySelectorAll('[data-date]').forEach(button => {
        button.addEventListener('click', () => {
          state.selectedDate = button.dataset.date;
          state.wizardStep = 3;
          renderWizard();
        });
      });
      return;
    }

    if (wizardStep === 3) {
      demoStage.innerHTML = `
        <p class="fake-title">Escolha um horário</p>
        <div class="time-grid">
          ${timeSlots.map(slot => `
            <button class="demo-time ${slot.status === 'ocupado' ? 'occupied' : ''} ${selectedTime === slot.time ? 'selected' : ''}" data-time="${slot.time}" type="button" ${slot.status === 'ocupado' ? 'disabled' : ''}>
              ${slot.time} — ${slot.status}
            </button>
          `).join('')}
        </div>
      `;

      demoStage.querySelectorAll('[data-time]').forEach(button => {
        button.addEventListener('click', () => {
          state.selectedTime = button.dataset.time;
          state.wizardStep = 4;
          renderWizard();
        });
      });
      return;
    }

    if (wizardStep === 4) {
      demoStage.innerHTML = `
        <p class="fake-title">Informações do cliente</p>
        <div class="client-form-demo">
          <label>
            <span>Nome</span>
            <input id="demoName" type="text" value="${state.demoData.name}" />
          </label>
          <label>
            <span>WhatsApp</span>
            <input id="demoWhatsApp" type="text" value="${state.demoData.whatsapp}" />
          </label>
          <button id="confirmBookingBtn" class="primary-btn full" type="button">Confirmar agendamento</button>
        </div>
      `;

      document.getElementById('confirmBookingBtn').addEventListener('click', () => {
        state.demoData.name = document.getElementById('demoName').value || 'Cliente';
        state.demoData.whatsapp = document.getElementById('demoWhatsApp').value || '(42) 99999-0000';
        state.wizardStep = 5;
        const newBooking = {
          time: state.selectedTime,
          cliente: state.demoData.name,
          servico: state.selectedService === 'corte-barba' ? 'Corte + Barba' : state.selectedService === 'barba' ? 'Barba' : 'Corte',
          status: 'Confirmado',
          type: 'booking'
        };

        const existingIndex = agenda.findIndex(item => item.time === state.selectedTime);
        if (existingIndex >= 0) {
          agenda[existingIndex] = newBooking;
        }

        renderSummary();
        renderTodayAgenda();
        renderAgenda();
        renderWizard();
      });
      return;
    }

    demoStage.innerHTML = `
      <div class="confirmation-box">
        <h3>Agendamento confirmado!</h3>
        <p>Seu corte foi marcado para:<br /><strong>${state.selectedDate}, ${state.selectedTime}</strong></p>
        <ul>
          <li>Serviço: ${state.selectedService === 'corte-barba' ? 'Corte + Barba' : state.selectedService === 'barba' ? 'Barba' : 'Corte'}</li>
          <li>Profissional: ChryS</li>
          <li>Data: ${state.selectedDate}</li>
          <li>Horário: ${state.selectedTime}</li>
        </ul>
        <div class="confirmation-actions">
          <button class="primary-btn small" type="button">Adicionar ao calendário</button>
          <button class="secondary-btn small" type="button">Enviar confirmação pelo WhatsApp</button>
        </div>
      </div>
    `;
  }

  renderWizard();
}

function toggleMode() {
  state.modeAtendimento = !state.modeAtendimento;
  modeToggle.textContent = state.modeAtendimento ? 'Modo atendimento ativo' : 'Ativar modo atendimento';
  modeStatus.classList.toggle('active', state.modeAtendimento);
  modeStatus.classList.toggle('idle', !state.modeAtendimento);
  modeStatus.innerHTML = `
    <span class="mode-dot"></span>
    <p>${state.modeAtendimento ? 'Atendimento ativo' : 'Atendimento inativo'}</p>
  `;
}

function bindEvents() {
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(item => item.classList.toggle('active', item === tab));
      const mode = tab.dataset.auth;
      loginForm.classList.toggle('active', mode === 'login');
      signupForm.classList.toggle('active', mode === 'signup');
    });
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loginModal.classList.add('hidden');
    appShell.classList.remove('hidden');
    state.isLoggedIn = true;
  });

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loginModal.classList.add('hidden');
    appShell.classList.remove('hidden');
    state.isLoggedIn = true;
  });

  document.querySelectorAll('[data-scroll]').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('.mobile-tab').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.mobile-tab').forEach(item => item.classList.toggle('active', item === button));
      const target = document.getElementById(button.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  modeToggle.addEventListener('click', toggleMode);

  assistantSend.addEventListener('click', handleAssistantPrompt);
  assistantInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleAssistantPrompt();
    }
  });

  settingsForm.addEventListener('submit', handleSettingsSubmit);

  document.getElementById('copyLinkBtn').addEventListener('click', () => {
    navigator.clipboard?.writeText('pvbarber.com/pv');
    document.getElementById('copyLinkBtn').textContent = 'Link copiado';
  });

  document.getElementById('viewAsClientBtn').addEventListener('click', () => {
    const demo = document.getElementById('demo');
    demo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('newBookingBtn').addEventListener('click', () => {
    const firstFree = agenda.find(item => item.type === 'free');
    if (firstFree) {
      firstFree.type = 'booking';
      firstFree.cliente = 'Novo cliente';
      firstFree.servico = 'Corte';
      firstFree.status = 'Confirmado';
      renderAgenda();
      renderTodayAgenda();
      renderSummary();
    }
  });

  document.getElementById('blockTimeBtn').addEventListener('click', () => {
    const target = agenda.find(item => item.type === 'free');
    if (target) {
      target.type = 'blocked';
      target.cliente = 'Bloqueado';
      target.servico = 'Reservado';
      target.status = 'Indisponível';
      renderAgenda();
      renderTodayAgenda();
    }
  });

  document.querySelectorAll('.segmented').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.segmented').forEach(item => item.classList.toggle('active', item === button));
      state.agendaView = button.dataset.agendaView;
      renderAgenda();
    });
  });
}

bindEvents();
renderSettingsForm();
renderSummary();
renderTodayAgenda();
renderClientsTable();
renderClientDetail();
renderAgenda();
renderRadar();
renderAssistant();
initDemoWizard();

