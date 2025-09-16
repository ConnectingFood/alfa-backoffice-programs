import { Partner, Program, OSC, Loja } from '@/types';

export const mockPrograms = [
  { id: '1', name: 'Extra - SP', bandeira: 'Extra', cliente: 'GPA', estado: 'São Paulo', type: 'contra_desperdicio', status: 'ativo', createdAt: '2024-01-01', totalPartners: 15, activePartners: 12, totalDonations: { amount: 2450, unit: 'kg' } },
  { id: '2', name: 'Pão de Açúcar - RJ', bandeira: 'Pão de Açúcar', cliente: 'GPA', estado: 'Rio de Janeiro', type: 'contra_desperdicio', status: 'ativo', createdAt: '2024-01-15', totalPartners: 8, activePartners: 6, totalDonations: { amount: 1800, unit: 'kg' } },
  { id: '3', name: 'Assaí - MG', bandeira: 'Assaí', cliente: 'Assaí', estado: 'Minas Gerais', type: 'destino_certo', status: 'ativo', createdAt: '2024-02-01', totalPartners: 10, activePartners: 8, totalDonations: { amount: 3200, unit: 'kg' } },
  { id: '4', name: 'Proença - SP', bandeira: 'Proença', cliente: 'Proença', estado: 'São Paulo', type: 'doacao_do_bem', status: 'ativo', createdAt: '2024-01-10', totalPartners: 5, activePartners: 4, totalDonations: { amount: 1200, unit: 'kg' } }
] as unknown as Program[]; // bypass dos campos extras exigidos por Program

export const mockDailyOperations = [
  { id: '1', programId: '1', lojaId: '1', data: '2024-01-21', status: 'programado', responsavel: 'Maria Santos', quantidadePrevista: 80 },
  { id: '2', programId: '1', lojaId: '2', data: '2024-01-21', status: 'coletado', responsavel: 'João Silva', quantidadePrevista: 60, quantidadeColetada: 55 }
];

export const mockNotifications = [
  { id: '1', type: 'loja_sem_coleta', title: 'Loja sem coleta há 3 dias', message: 'Extra Vila Olímpia não teve coleta', data: '2024-01-20', read: false, priority: 'alta' },
  { id: '2', type: 'quantidade_baixa', title: 'Quantidade baixa', message: 'Pão de Açúcar coletou apenas 20kg', data: '2024-01-19', read: false, priority: 'media' }
];

export const mockPartners: Partner[] = [
  { 
    id: '1', 
    name: 'Extra Vila Olímpia', 
    type: 'loja', 
    stage: 'ativo', 
    program: 'contra_desperdicio', 
    bandeira: 'Extra', 
    regional: 'São Paulo',
    logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    codigo: 'EXT001',
    endereco: 'Av. das Nações Unidas, 14401',
    gerente: 'João Silva',
    email: 'joao@extra.com.br',
    phone: '(11) 99999-9999',
    lastContact: '2024-01-20',
    donations: 850,
    status: 'active',
    tags: ['visitadas', 'colaborativa'],
    lastInteraction: {
      type: 'whatsapp',
      date: '2024-01-20',
      description: 'Confirmação da coleta de amanhã'
    },
    contacts: [{ name: 'João Silva', role: 'Gerente', phone: '(11) 99999-9999', email: 'joao@extra.com.br' }], 
    lastDonation: { date: '2024-01-15', amount: 850, unit: 'kg' }, 
    nfs: [], 
    interactions: [] 
  },
  { 
    id: '2', 
    name: 'Mesa Brasil SESC', 
    type: 'osc', 
    stage: 'ativo', 
    program: 'contra_desperdicio', 
    bandeira: 'Pão de Açúcar', 
    regional: 'São Paulo',
    logo: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    cnpj: '61.871.810/0001-08',
    programas: 3,
    campanhas: 5,
    numeroLojas: 12,
    confianca: 'muito_confiavel',
    email: 'ana@mesabrasil.org.br',
    phone: '(11) 88888-8888',
    lastContact: '2024-01-18',
    donations: 1200,
    status: 'active',
    tags: ['instituicao', 'ligacoes_ok'],
    lastInteraction: {
      type: 'ligacao',
      date: '2024-01-18',
      description: 'Agendamento de nova coleta'
    },
    contacts: [{ name: 'Ana Costa', role: 'Coordenadora', phone: '(11) 88888-8888', email: 'ana@mesabrasil.org.br' }], 
    lastDonation: { date: '2024-01-16', amount: 1200, unit: 'kg' }, 
    nfs: [], 
    interactions: [],
    idCF: '198'
  },
  { 
    id: '3', 
    name: 'Banco de Alimentos SP', 
    type: 'osc', 
    stage: 'verificar', 
    program: 'contra_desperdicio', 
    bandeira: 'Extra', 
    regional: 'São Paulo',
    cnpj: '12.345.678/0001-90',
    programas: 1,
    campanhas: 2,
    numeroLojas: 8,
    confianca: 'confiavel',
    email: 'pedro@bancodealimentos.org.br',
    phone: '(11) 77777-7777',
    lastContact: '2024-01-10',
    donations: 2500,
    status: 'active',
    tags: ['sem_contato', 'verificar_docs'],
    contacts: [{ name: 'Pedro Oliveira', role: 'Diretor', phone: '(11) 77777-7777', email: 'pedro@bancodealimentos.org.br' }], 
    lastDonation: { date: '2024-01-17', amount: 2500, unit: 'kg' }, 
    nfs: [], 
    interactions: [],
    idCF: '205'
  },
  { 
    id: '4', 
    name: 'Pão de Açúcar Jardins', 
    type: 'loja', 
    stage: 'verificar', 
    program: 'contra_desperdicio', 
    bandeira: 'Pão de Açúcar', 
    regional: 'São Paulo',
    codigo: 'PDA002',
    endereco: 'R. Augusta, 2840',
    gerente: 'Ricardo Mendes',
    email: 'ricardo@paodeacucar.com.br',
    phone: '(11) 66666-6666',
    lastContact: '2024-01-12',
    donations: 0,
    status: 'inactive',
    tags: ['iniciando', 'sem_parceria'],
    lastInteraction: {
      type: 'email',
      date: '2024-01-12',
      description: 'Envio de documentação para parceria'
    },
    contacts: [{ name: 'Ricardo Mendes', role: 'Gerente', phone: '(11) 66666-6666', email: 'ricardo@paodeacucar.com.br' }], 
    nfs: [], 
    interactions: [] 
  },
  { 
    id: '5', 
    name: 'Extra Ibirapuera', 
    type: 'loja', 
    stage: 'inativo', 
    program: 'contra_desperdicio', 
    bandeira: 'Extra', 
    regional: 'São Paulo',
    codigo: 'EXT003',
    endereco: 'Av. Ibirapuera, 3103',
    gerente: 'Carlos Santos',
    email: 'carlos@extra.com.br',
    phone: '(11) 55555-5555',
    lastContact: '2023-12-15',
    donations: 0,
    status: 'inactive',
    tags: ['sem_contato', 'ocorrencias'],
    contacts: [{ name: 'Carlos Santos', role: 'Gerente', phone: '(11) 55555-5555', email: 'carlos@extra.com.br' }], 
    nfs: [], 
    interactions: [] 
  },
  { 
    id: '6', 
    name: 'Instituto Solidário', 
    type: 'osc', 
    stage: 'inativo', 
    program: 'contra_desperdicio', 
    bandeira: 'Assaí', 
    regional: 'São Paulo',
    cnpj: '98.765.432/0001-10',
    programas: 0,
    campanhas: 1,
    numeroLojas: 0,
    confianca: 'pouco_confiavel',
    email: 'maria@instituto.org.br',
    phone: '(11) 44444-4444',
    lastContact: '2023-11-20',
    donations: 0,
    status: 'inactive',
    tags: ['bloqueada', 'problemas_docs'],
    contacts: [{ name: 'Maria Silva', role: 'Coordenadora', phone: '(11) 44444-4444', email: 'maria@instituto.org.br' }], 
    nfs: [], 
    interactions: [] 
  },
  { 
    id: '7', 
    name: 'Assaí Morumbi', 
    type: 'loja', 
    stage: 'encerrada', 
    program: 'contra_desperdicio', 
    bandeira: 'Assaí', 
    regional: 'São Paulo',
    codigo: 'ASS003',
    endereco: 'Av. Giovanni Gronchi, 5930',
    gerente: 'José Lima',
    email: 'jose@assai.com.br',
    phone: '(11) 33333-3333',
    lastContact: '2023-10-01',
    donations: 0,
    status: 'inactive',
    tags: ['fechada', 'encerrada'],
    contacts: [{ name: 'José Lima', role: 'Ex-Gerente', phone: '(11) 33333-3333', email: 'jose@assai.com.br' }], 
    nfs: [], 
    interactions: [] 
  },
  { 
    id: '8', 
    name: 'ONG Esperança', 
    type: 'osc', 
    stage: 'encerrada', 
    program: 'contra_desperdicio', 
    bandeira: 'Pão de Açúcar', 
    regional: 'São Paulo',
    cnpj: '11.222.333/0001-44',
    programas: 0,
    campanhas: 0,
    numeroLojas: 0,
    confianca: 'confiavel',
    email: 'ana@esperanca.org.br',
    phone: '(11) 22222-2222',
    lastContact: '2023-09-15',
    donations: 0,
    status: 'inactive',
    tags: ['encerrada', 'mudou_foco'],
    contacts: [{ name: 'Ana Paula', role: 'Ex-Coordenadora', phone: '(11) 22222-2222', email: 'ana@esperanca.org.br' }], 
    nfs: [], 
    interactions: [] 
  }
]; // <- sem cast errado aqui

export const mockOSCs: OSC[] = [
  { id: '1', name: 'Instituto Esperança', email: 'contato@esperanca.org.br', cnpj: '12.345.678/0001-90', status: 'ativo', programas: 2, campanhas: 3, cadastroAtualizadoEm: '2024-01-15', arrecadado: 2450, numeroLojas: 5, confianca: 'muito_confiavel', ultimaColeta: '2024-01-20', tipo: 'normal', checklist: { cnpjAtivo: true, fitObjetivos: true, verificacaoReputacao: true, pesquisadoCNEP: true, pesquisadoCEPIM: true, pesquisadoCEIS: true, enderecoConfirmado: true, emailContato: 'contato@esperanca.org.br' }, contato: { responsavel: 'Maria Silva' }, tags: ['boas_vindas'], observacoesCRM: ['OSC organizada'], parcerias: ['1'] },
  { id: '2', name: 'OSC Bom Coração', email: 'admin@bomcoracao.org', cnpj: '98.765.432/0001-10', status: 'verificar', programas: 1, campanhas: 2, cadastroAtualizadoEm: '2024-01-10', arrecadado: 1800, numeroLojas: 3, confianca: 'confiavel', ultimaColeta: '2024-01-18', tipo: 'normal', checklist: { cnpjAtivo: true, fitObjetivos: false, verificacaoReputacao: true, pesquisadoCNEP: false, pesquisadoCEPIM: false, pesquisadoCEIS: false, enderecoConfirmado: true, emailContato: 'admin@bomcoracao.org' }, contato: { responsavel: 'João Santos' }, tags: ['sem_contato'], observacoesCRM: ['Verificar docs'], parcerias: ['2'] }
];

export const mockLojas: Loja[] = [
  {
    id: '1',
    nome: 'Extra Vila Olímpia',
    codigo: 'EXT001',
    bandeira: 'Extra',
    regional: 'São Paulo',
    endereco: 'Av. das Nações Unidas, 14401',
    cidade: 'São Paulo',
    estado: 'SP',
    gerente: 'João Silva',
    telefone: '(11) 99999-9999',
    email: 'joao@extra.com.br',
    status: 'ativo',
    ultimaColeta: '2024-01-15',
    totalArrecadado: 2450,
    tags: ['visitadas'],
    contato: { responsavel: 'João Silva' },
    observacoesCRM: ['Colaborativa'],
    parcerias: ['1'],
    programas: ['1'], // <-- ADICIONADO
  },
  {
    id: '2',
    nome: 'Pão de Açúcar Jardins',
    codigo: 'PDA002',
    bandeira: 'Pão de Açúcar',
    regional: 'São Paulo',
    endereco: 'R. Augusta, 2840',
    cidade: 'São Paulo',
    estado: 'SP',
    gerente: 'Maria Santos',
    telefone: '(11) 88888-8888',
    email: 'maria@paodeacucar.com.br',
    status: 'ativo',
    ultimaColeta: '2024-01-18',
    totalArrecadado: 1800,
    tags: ['iniciando'],
    contato: { responsavel: 'Maria Santos' },
    observacoesCRM: ['Nova'],
    parcerias: ['1'],
    programas: ['1'], // <-- ADICIONADO
  },
  {
    id: '3',
    nome: 'Assaí Morumbi',
    codigo: 'ASS003',
    bandeira: 'Assaí',
    regional: 'São Paulo',
    endereco: 'Av. Giovanni Gronchi, 5930',
    cidade: 'São Paulo',
    estado: 'SP',
    gerente: 'Carlos Lima',
    telefone: '(11) 77777-7777',
    email: 'carlos@assai.com.br',
    status: 'verificar',
    ultimaColeta: '-',
    totalArrecadado: 0,
    tags: ['ocorrencias'],
    contato: { responsavel: 'Carlos Lima' },
    observacoesCRM: ['Problemas'],
    parcerias: [],
    programas: ['0'], // <-- ADICIONADO
  },
];

export const mockParcerias = [
  { id: '1', lojaId: '1', oscId: '1', status: 'ativa', dataInicio: '2024-01-01', observacoes: 'Produtiva' },
  { id: '2', lojaId: '2', oscId: '1', status: 'ativa', dataInicio: '2024-01-10', observacoes: 'Promissor' }
];

export const oscStatusConfig: Record<OSC['status'], { label: string; color: string }> = {
  ativo: { label: 'Ativo', color: 'bg-green-100 text-green-800' },
  verificar: { label: 'Verificar', color: 'bg-yellow-100 text-yellow-800' },
  inativo: { label: 'Inativo', color: 'bg-red-100 text-red-800' },
  backlog: { label: 'Backlog', color: 'bg-gray-100 text-gray-800' }
};

export const lojaStatusConfig: Record<Loja['status'], { label: string; color: string }> = {
  ativo: { label: 'Ativo', color: 'bg-green-100 text-green-800' },
  verificar: { label: 'Verificar', color: 'bg-yellow-100 text-yellow-800' },
  inativo: { label: 'Inativo', color: 'bg-red-100 text-red-800' },
  encerrada: { label: 'Encerrada', color: 'bg-gray-100 text-gray-800' },
  backlog: { label: 'Backlog', color: 'bg-blue-100 text-blue-800' }
};

export const confiancaConfig: Record<OSC['confianca'], { label: string; color: string; tooltip: string }> = {
  muito_confiavel: { 
    label: 'Muito Confiável', 
    color: 'bg-green-100 text-green-800',
    tooltip: 'Nunca pisou na bola, documentos em dia, aceita doação'
  },
  confiavel: { 
    label: 'Confiável', 
    color: 'bg-blue-100 text-blue-800',
    tooltip: 'Boa parceira, documentos ok'
  },
  pouco_confiavel: { 
    label: 'Pouco Confiável', 
    color: 'bg-red-100 text-red-800',
    tooltip: 'Problemas anteriores, documentação pendente'
  }
};

export const stageConfig: Record<Partner['stage'], { label: string; color: string; icon: string }> = {
  ativo: { label: 'Ativo', color: 'bg-green-100 text-green-800', icon: '✓' },
  verificar: { label: 'Verificar', color: 'bg-yellow-100 text-yellow-800', icon: '⚠️' },
  inativo: { label: 'Inativo', color: 'bg-red-100 text-red-800', icon: '❌' },
  encerrada: { label: 'Encerrada', color: 'bg-gray-100 text-gray-800', icon: '🏪' },
  backlog: { label: 'Backlog', color: 'bg-blue-100 text-blue-800', icon: '📋' }
};

export const programConfig: Record<Program['type'], { label: string; color: string }> = {
  arrecadacao: { label: 'Arrecadação', color: 'bg-blue-100 text-blue-800' },
  contra_desperdicio: { label: 'Contra o Desperdício', color: 'bg-green-100 text-green-800' },
  doacao_alimentos: { label: 'Doação de Alimentos', color: 'bg-purple-100 text-purple-800' },
  destino_certo: { label: 'Programa Destino Certo', color: 'bg-orange-100 text-orange-800' },
  doacao_do_bem: { label: 'Programa Doação do Bem', color: 'bg-pink-100 text-pink-800' }
};

export const stageColumns: Record<Partner['stage'], { label: string; color: string; bgColor: string }> = {
  ativo: { label: 'Ativo', color: 'border-green-500', bgColor: 'bg-green-50' },
  verificar: { label: 'Verificar', color: 'border-yellow-500', bgColor: 'bg-yellow-50' },
  inativo: { label: 'Inativo', color: 'border-red-500', bgColor: 'bg-red-50' },
  encerrada: { label: 'Encerrada', color: 'border-gray-500', bgColor: 'bg-gray-50' },
  backlog: { label: 'Backlog', color: 'border-blue-500', bgColor: 'bg-blue-50' }
};
