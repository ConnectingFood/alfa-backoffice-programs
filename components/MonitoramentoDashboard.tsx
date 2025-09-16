'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Package, Calendar, Filter, Download, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Program } from '@/types';
import { Badge } from '@/components/ui/badge';
import { programConfig } from '@/lib/data';

interface MonitoramentoDashboardProps {
  program: Program;
  onBack: () => void;
}

export function MonitoramentoDashboard({ program, onBack }: MonitoramentoDashboardProps) {
  const [periodo, setPeriodo] = useState('30');
  
  const programType = programConfig[program.type];

  return (
    <div className="ml-72 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Voltar
          </Button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">Monitoramento - {program.name}</h1>
              <Badge className={programType.color}>
                {programType.label}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">Acompanhamento em tempo real do programa</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="365">Último ano</SelectItem>
            </SelectContent>
          </Select>


          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Período Customizado
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Arrecadado</p>
              <p className="text-2xl font-bold text-gray-900">7.450 kg</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +12% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lojas Ativas</p>
              <p className="text-2xl font-bold text-gray-900">26</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +3 novas lojas
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Coletas Realizadas</p>
              <p className="text-2xl font-bold text-gray-900">142</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +8% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Economia Gerada</p>
              <p className="text-2xl font-bold text-gray-900">R$ 26.750</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +15% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Arrecadação por Período</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 font-medium">Gráfico de Arrecadação</p>
              <p className="text-sm text-gray-400">Dados dos últimos {periodo} dias</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance por Bandeira</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 font-medium">Gráfico por Bandeira</p>
              <p className="text-sm text-gray-400">Comparativo de performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Package size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Nova coleta realizada</p>
                <p className="text-sm text-gray-500">Extra Hiper Vila Olímpia - 850kg coletados</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Há 2 horas</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Users size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Nova loja adicionada</p>
                <p className="text-sm text-gray-500">Pão de Açúcar Moema entrou no programa</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Há 5 horas</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <BarChart3 size={16} className="text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Meta mensal atingida</p>
                <p className="text-sm text-gray-500">Programa São Paulo atingiu 100% da meta</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Ontem</span>
          </div>
        </div>
      </div>
    </div>
  );
}