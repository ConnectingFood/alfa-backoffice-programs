'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Package, Users, Filter, Plus, Eye, Edit, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NovaColetaModal } from './NovaColetaModal';
import { mockPrograms } from '@/lib/data';

interface ColetaAgendada {
  id: string;
  programId: string;
  programName: string;
  lojaId: string;
  lojaNome: string;
  bandeira: string;
  data: string;
  horario: string;
  status: 'agendada' | 'confirmada' | 'coletada' | 'cancelada' | 'nao_coletada';
  responsavel: string;
  quantidadePrevista: number;
  quantidadeColetada?: number;
  observacoes?: string;
  endereco: string;
}

const mockColetas: ColetaAgendada[] = [
  { id: '1', programId: '1', programName: 'Extra - SP', lojaId: '1', lojaNome: 'Extra Vila Olímpia', bandeira: 'Extra', data: '2024-01-22', horario: '14:00', status: 'confirmada', responsavel: 'Maria Santos', quantidadePrevista: 80, endereco: 'Av. das Nações Unidas, 14401' },
  { id: '2', programId: '1', programName: 'Extra - SP', lojaId: '2', lojaNome: 'Extra Ibirapuera', bandeira: 'Extra', data: '2024-01-22', horario: '16:30', status: 'agendada', responsavel: 'João Silva', quantidadePrevista: 65, endereco: 'Av. Ibirapuera, 3103' },
  { id: '3', programId: '2', programName: 'Pão de Açúcar - RJ', lojaId: '3', lojaNome: 'Pão de Açúcar Jardins', bandeira: 'Pão de Açúcar', data: '2024-01-23', horario: '10:00', status: 'agendada', responsavel: 'Ana Costa', quantidadePrevista: 45, endereco: 'R. Augusta, 2840' },
  { id: '4', programId: '3', programName: 'Assaí - MG', lojaId: '4', lojaNome: 'Assaí Morumbi', bandeira: 'Assaí', data: '2024-01-23', horario: '15:00', status: 'coletada', responsavel: 'Carlos Lima', quantidadePrevista: 120, quantidadeColetada: 115, endereco: 'Av. Giovanni Gronchi, 5930' }
];

const statusConfig = {
  agendada: { label: 'Agendada', color: 'bg-blue-100 text-blue-800', icon: Clock },
  confirmada: { label: 'Confirmada', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  coletada: { label: 'Coletada', color: 'bg-green-100 text-green-800', icon: Package },
  cancelada: { label: 'Cancelada', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
  nao_coletada: { label: 'Não Coletada', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
};

export function PlanejamentoAgenda() {
  const [dataFilter, setDataFilter] = useState('hoje');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [isNovaColetaModalOpen, setIsNovaColetaModalOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const filteredColetas = mockColetas.filter(coleta => {
    const matchesData = dataFilter === 'all' || 
                       (dataFilter === 'hoje' && coleta.data === today) ||
                       (dataFilter === 'amanha' && coleta.data === tomorrow) ||
                       (dataFilter === 'semana' && new Date(coleta.data) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const matchesStatus = statusFilter === 'all' || coleta.status === statusFilter;
    const matchesProgram = programFilter === 'all' || coleta.programId === programFilter;
    return matchesData && matchesStatus && matchesProgram;
  });

  const coletasHoje = mockColetas.filter(c => c.data === today).length;
  const coletasConfirmadas = mockColetas.filter(c => c.status === 'confirmada').length;
  const coletasPendentes = mockColetas.filter(c => c.status === 'agendada').length;
  const totalPrevisto = mockColetas.reduce((acc, c) => acc + c.quantidadePrevista, 0);

  const handleNovaColeta = () => {
    setIsNovaColetaModalOpen(true);
  };

  const handleCloseNovaColetaModal = () => {
    setIsNovaColetaModalOpen(false);
  };

  return (
    <div className="ml-72 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planejamento</h1>
          <p className="text-sm text-gray-500">Agenda de coletas de todos os programas</p>
        </div>
        <Button onClick={handleNovaColeta} className="bg-orange-600 hover:bg-orange-700">
          <Plus size={16} className="mr-2" />
          Nova Coleta
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Coletas Hoje</p>
              <p className="text-2xl font-bold text-gray-900">{coletasHoje}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmadas</p>
              <p className="text-2xl font-bold text-green-600">{coletasConfirmadas}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">{coletasPendentes}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Previsto</p>
              <p className="text-2xl font-bold text-gray-900">{totalPrevisto.toLocaleString()} kg</p>
            </div>
            <Package className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          <Select value={dataFilter} onValueChange={setDataFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="amanha">Amanhã</SelectItem>
              <SelectItem value="semana">Esta Semana</SelectItem>
              <SelectItem value="all">Todas as Datas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="agendada">Agendada</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="coletada">Coletada</SelectItem>
              <SelectItem value="nao_coletada">Não Coletada</SelectItem>
            </SelectContent>
          </Select>

          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Programa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Programas</SelectItem>
              {mockPrograms.map(program => (
                <SelectItem key={program.id} value={program.id}>
                  {program.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Agenda List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Agenda de Coletas</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredColetas.map((coleta) => {
            const statusConf = statusConfig[coleta.status];
            const StatusIcon = statusConf.icon;
            
            return (
              <div key={coleta.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{coleta.lojaNome}</h4>
                      <Badge variant="outline" className="text-xs">
                        {coleta.bandeira}
                      </Badge>
                      <Badge className={`text-xs ${statusConf.color}`}>
                        <StatusIcon size={12} className="mr-1" />
                        {statusConf.label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        {new Date(coleta.data).toLocaleDateString('pt-BR')} às {coleta.horario}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        {coleta.endereco}
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-2" />
                        {coleta.responsavel}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-6 text-sm">
                      <span className="text-gray-600">
                        Previsto: <span className="font-medium text-gray-900">{coleta.quantidadePrevista} kg</span>
                      </span>
                      {coleta.quantidadeColetada && (
                        <span className="text-gray-600">
                          Coletado: <span className="font-medium text-green-700">{coleta.quantidadeColetada} kg</span>
                        </span>
                      )}
                      <span className="text-gray-600">
                        Programa: <span className="font-medium text-gray-900">{coleta.programName}</span>
                      </span>
                    </div>

                    {coleta.observacoes && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                        {coleta.observacoes}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                      <Eye size={14} className="mr-1" />
                      Ver
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <Edit size={14} className="mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredColetas.length === 0 && (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma coleta encontrada</h3>
            <p className="text-gray-500 mb-4">Tente ajustar os filtros ou adicionar uma nova coleta</p>
            <Button onClick={handleNovaColeta} className="bg-orange-600 hover:bg-orange-700">
              <Plus size={16} className="mr-2" />
              Nova Coleta
            </Button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {filteredColetas.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          Mostrando {filteredColetas.length} de {mockColetas.length} coletas
        </div>
      )}

      {/* Nova Coleta Modal */}
      <NovaColetaModal 
        isOpen={isNovaColetaModalOpen}
        onClose={handleCloseNovaColetaModal}
      />
    </div>
  );
}