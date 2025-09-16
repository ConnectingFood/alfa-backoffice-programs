export interface Loja {
  id: string;
  nome: string;
  codigo: string;
  bandeira: string;
  regional: string;
  endereco: string;
  cidade: string;
  estado: string;
  gerente: string;
  telefone: string;
  email: string;
  status: 'ativo' | 'verificar' | 'inativo' | 'encerrada' | 'backlog';
  ultimaColeta: string;
  programas: string[];
  totalArrecadado: number;
  logo?: string;
  codigoGPA?: string;
  tags: string[];
  contato: {
    responsavel: string;
  };
  observacoesCRM: string[];
  parcerias: string[];
}

export interface OSC {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  status: 'ativo' | 'verificar' | 'inativo' | 'backlog';
  programas: number;
  campanhas: number;
  cadastroAtualizadoEm: string;
  arrecadado: number;
  numeroLojas: number;
  confianca: 'muito_confiavel' | 'confiavel' | 'pouco_confiavel';
  ultimaColeta: string;
  tipo: 'normal' | 'natal_solidariedade';
  logo?: string;
  checklist: {
    cnpjAtivo: boolean;
    fitObjetivos: boolean;
    verificacaoReputacao: boolean;
    pesquisadoCNEP: boolean;
    pesquisadoCEPIM: boolean;
    pesquisadoCEIS: boolean;
    enderecoConfirmado: boolean;
    emailContato: string;
  };
  contato: {
    responsavel: string;
  };
  tags: string[];
  observacoesCRM: string[];
  parcerias: string[];
}

export interface Program {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'ativo' | 'inativo' | 'planejamento';
  startDate: string;
  endDate: string;
  totalDonations: {
    amount: number;
    unit: string;
  };
  activePartners: number;
  totalPartners: number;
  targetAmount: number;
  notDonatedItems?: NotDonatedItem[];
}

export interface NotDonatedItem {
  item: string;
  motivo: string;
  quantidade: number;
  data: string;
}

export interface Partner {
  id: string;
  name: string;
  type: 'loja' | 'osc';
  email: string;
  phone: string;
  program: string;
  stage: 'ativo' | 'verificar' | 'inativo' | 'encerrada';
  lastContact: string;
  donations: number;
  status: 'active' | 'inactive';
  bandeira: string;
  regional: string;
  logo?: string;
  codigo?: string;
  endereco?: string;
  gerente?: string;
  cnpj?: string;
  programas?: number;
  campanhas?: number;
  numeroLojas?: number;
  confianca?: 'muito_confiavel' | 'confiavel' | 'pouco_confiavel';
  tags?: string[];
  lastInteraction?: {
    type: 'ligacao' | 'email' | 'whatsapp' | 'sms' | 'visita';
    date: string;
    description: string;
  };
  contacts: Array<{
    name: string;
    role: string;
    phone: string;
    email: string;
  }>;
  lastDonation?: {
    date: string;
    amount: number;
    unit: string;
  };
  nfs: any[];
  interactions: any[];
  idCF?: string;
}

export interface Parceria {
  id: string;
  osc: string;
  loja: string;
  programa: string;
  status: 'ativa' | 'pausada' | 'encerrada';
  inicioEm: string;
  ultimaColeta: string;
  totalArrecadado: number;
}

export interface ProgramKanbanProps {
  program: Program;
  partners: Partner[];
  onBack: () => void;
  onPartnerClick: (partner: Partner) => void;
}