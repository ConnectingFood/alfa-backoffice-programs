// types.ts

/* =========================
 * Domínios principais
 * ========================= */

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
  programas: string[]; // IDs/nomes de programas ligados à loja
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

/* =========================
 * Programas
 * ========================= */

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

/**
 * Versão de Program usada nas listas/grids do front,
 * que também carrega metadados de exibição.
 */
export type ProgramUI = Program & {
  bandeira: string;
  cliente: string;
  estado: string;
  createdAt: string;
};

export interface NotDonatedItem {
  item: string;
  motivo: string;
  quantidade: number;
  data: string;
}

/* =========================
 * Parceiros (OSC/Loja) para Kanban/CRM
 * ========================= */

export type PartnerStage =
  | 'ativo'
  | 'verificar'
  | 'inativo'
  | 'encerrada'
  | 'backlog';

export interface Partner {
  id: string;
  name: string;
  type: 'loja' | 'osc';
  email: string;
  phone: string;
  program: string; // ex.: 'contra_desperdicio'
  stage: PartnerStage;
  lastContact: string;
  donations: number;
  status: 'active' | 'inactive';
  bandeira: string;
  regional: string;

  // Campos específicos por tipo (alguns opcionais):
  logo?: string;
  codigo?: string;    // lojas
  endereco?: string;  // lojas
  gerente?: string;   // lojas
  cnpj?: string;      // OSC
  programas?: number; // OSC
  campanhas?: number; // OSC
  numeroLojas?: number; // OSC
  confianca?: 'muito_confiavel' | 'confiavel' | 'pouco_confiavel';

  // Auxiliares
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

  // Agenda opcional (usada em PartnerModal quando existir)
  schedule?: {
    frequency: string;
    nextCollection: string;
  };

  nfs: any[];
  interactions: any[];
  idCF?: string;
}

/* =========================
 * Parcerias e props
 * ========================= */

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
