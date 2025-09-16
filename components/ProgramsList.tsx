'use client';

import { useState } from 'react';
import { Program } from '@/types';
import { Plus, Calendar, Users, TrendingUp, MoreVertical, Eye, Monitor, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { programConfig } from '@/lib/data';

interface ProgramsListProps {
  programs: Program[];
  onProgramClick: (program: Program) => void;
  onNewProgram: () => void;
  onMonitoramento: (program: Program) => void;
}

/** Extende Program com campos usados aqui que podem não existir no tipo base */
type ProgramForUI = Program & {
  bandeira?: string;
  cliente?: string;
  estado?: string;
  totalDonations?: { amount: number; unit: string };
  activePartners?: number;
  createdAt?: string | number | Date;
  status?: 'ativo' | 'inativo' | 'planejamento' | string;
};

export function ProgramsList({ programs, onProgramClick, onNewProgram, onMonitoramento }: ProgramsListProps) {
  const [bandeiraFilter, setBandeiraFilter] = useState<string>('all');
  const [clienteFilter, setClienteFilter] = useState<string>('all');
  const [estadoFilter, setEstadoFilter] = useState<string>('all');

  const filteredPrograms = programs.filter((p) => {
    const prog = p as ProgramForUI;
    const matchesBandeira = bandeiraFilter === 'all' || (prog.bandeira ?? '') === bandeiraFilter;
    const matchesCliente = clienteFilter === 'all' || (prog.cliente ?? '') === clienteFilter;
    const matchesEstado = estadoFilter === 'all' || (prog.estado ?? '') === estadoFilter;
    return matchesBandeira && matchesCliente && matchesEstado;
  });

  return (
    <div className="ml-72 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programas</h1>
          <p className="text-sm text-gray-500">Gestão multi-cliente de programas de doação</p>
        </div>
        <Button onClick={onNewProgram} className="bg-orange-600 hover:bg-orange-700">
          <Plus size={16} className="mr-2" />
          Novo Programa
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>

          <Select value={clienteFilter} onValueChange={setClienteFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todos os Clientes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Clientes</SelectItem>
              <SelectItem value="GPA">GPA</SelectItem>
              <SelectItem value="Assaí">Assaí</SelectItem>
              <SelectItem value="Proença">Proença</SelectItem>
            </SelectContent>
          </Select>

          <Select value={bandeiraFilter} onValueChange={setBandeiraFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todas as Bandeiras" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Bandeiras</SelectItem>
              <SelectItem value="Extra">Extra</SelectItem>
              <SelectItem value="Pão de Açúcar">Pão de Açúcar</SelectItem>
              <SelectItem value="Assaí">Assaí</SelectItem>
              <SelectItem value="Proença">Proença</SelectItem>
            </SelectContent>
          </Select>

          <Select value={estadoFilter} onValueChange={setEstadoFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todos os Estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Estados</SelectItem>
              <SelectItem value="São Paulo">São Paulo</SelectItem>
              <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
              <SelectItem value="Minas Gerais">Minas Gerais</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => {
          const prog = program as ProgramForUI;
          const cfg = programConfig[program.type as keyof typeof programConfig] as
            | { color?: string; label?: string }
            | undefined;

          const totalAmount = prog.totalDonations?.amount ?? 0;
          const totalUnit = prog.totalDonations?.unit ?? '';
          const activePartners = prog.activePartners ?? 0;
          const createdAt = prog.createdAt ? new Date(prog.createdAt) : new Date();
          const status = (prog.status as 'ativo' | 'inativo' | 'planejamento' | string) ?? 'planejamento';

          return (
            <div
              key={program.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onProgramClick(program)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{program.name}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge className={cfg?.color ?? 'bg-gray-100 text-gray-800'}>
                      {cfg?.label ?? program.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {prog.cliente ?? '—'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {(prog.bandeira ?? '—')} • {(prog.estado ?? '—')}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical size={16} />
                </Button>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{program.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-blue-700">{activePartners}</p>
                  <p className="text-xs text-blue-600">Parceiros Ativos</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp size={16} className="text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-green-700">{totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-green-600">Total {totalUnit}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar size={12} className="mr-1" />
                  Criado em {createdAt.toLocaleDateString('pt-BR')}
                </div>
                <Badge variant={status === 'ativo' ? 'default' : 'secondary'} className="text-xs">
                  {status === 'ativo' ? 'Ativo' : status === 'inativo' ? 'Inativo' : 'Planejamento'}
                </Badge>
              </div>

              {/* Action Button */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProgramClick(program);
                  }}
                >
                  <Eye size={16} className="mr-2" />
                  Kanban
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMonitoramento(program);
                  }}
                >
                  <Monitor size={16} className="mr-2" />
                  Monitoramento
                </Button>
              </div>
            </div>
          );
        })}

        {filteredPrograms.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {programs.length === 0 ? 'Nenhum programa encontrado' : 'Nenhum programa corresponde aos filtros'}
            </h3>
            <p className="text-gray-500 mb-4">
              {programs.length === 0
                ? 'Comece criando seu primeiro programa de doação'
                : 'Tente ajustar os filtros para ver mais programas'}
            </p>
            <Button onClick={onNewProgram} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              {programs.length === 0 ? 'Criar Primeiro Programa' : 'Novo Programa'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
