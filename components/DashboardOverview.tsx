'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Filter,
  Eye,
  Edit,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockPrograms, mockDailyOperations, mockNotifications } from '@/lib/data';
import { mockLojas } from '@/lib/data';

export function DashboardOverview() {
  const [periodoFilter, setPeriodoFilter] = useState('30');
  const [clienteFilter, setClienteFilter] = useState('all');

  // Cálculos para KPIs
  const totalProgramas = mockPrograms.length;
  const programasAtivos = mockPrograms.filter(p => p.status === 'ativo').length;
  const totalArrecadado = mockPrograms.reduce((acc, p) => acc + p.totalDonations.amount, 0);
  const lojasComParceria = mockPrograms.reduce((acc, p) => acc + p.activePartners, 0);
  const totalLojas = mockPrograms.reduce((acc, p) => acc + p.totalPartners, 0);
  const percentualAssistido = Math.round((lojasComParceria / totalLojas) * 100);

  // Parcerias feitas e desfeitas (simulado)
  const parceriasFeitas = 45;
  const parceriasDesfeitas = 8;

  // Itens não doados
  const itensNaoDoados = mockPrograms.reduce((acc, p) => {
    return acc + (p.notDonatedItems?.length || 0);
  }, 0);

  return (
    <div className="ml-72 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Visão geral multi-cliente - Connecting Food</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={clienteFilter} onValueChange={setClienteFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="GPA">GPA</SelectItem>
              <SelectItem value="Assaí">Assaí</SelectItem>
              <SelectItem value="Proença">Proença</SelectItem>
            </SelectContent>
          </Select>
          <Select value={periodoFilter} onValueChange={setPeriodoFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Arrecadado</p>
              <p className="text-2xl font-bold text-gray-900">{totalArrecadado.toLocaleString()} kg</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +12% vs período anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">% Lojas Assistidas</p>
              <p className="text-2xl font-bold text-gray-900">{percentualAssistido}%</p>
              <p className="text-xs text-gray-500 mt-1">
                {lojasComParceria} de {totalLojas} lojas
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
              <p className="text-sm font-medium text-gray-600">Parcerias Ativas</p>
              <p className="text-2xl font-bold text-gray-900">{parceriasFeitas}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +5 este mês
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Itens Não Doados</p>
              <p className="text-2xl font-bold text-gray-900">{itensNaoDoados}</p>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <AlertTriangle size={12} className="mr-1" />
                Requer atenção
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolução de Lojas e Parcerias</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 font-medium">Gráfico de Evolução</p>
              <p className="text-sm text-gray-400">Parcerias feitas vs desfeitas + % lojas assistidas</p>
            </div>
          </div>
          
          {/* Dados da tabela para referência */}
          <div className="mt-4 text-xs text-gray-500">
            <div className="grid grid-cols-4 gap-2 font-medium mb-2">
              <span>Mês</span>
              <span>Feitas</span>
              <span>Desfeitas</span>
              <span>% Assistidas</span>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-4 gap-2">
                <span>Jan</span><span>6</span><span>11</span><span>89%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Fev</span><span>17</span><span>44</span><span>88%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Mar</span><span>27</span><span>20</span><span>84%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Abr</span><span>38</span><span>18</span><span>85%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Mai</span><span>53</span><span>64</span><span>88%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Jun</span><span>39</span><span>69</span><span>87%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Jul</span><span>35</span><span>27</span><span>82%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Ago</span><span>13</span><span>25</span><span>83%</span>
              </div>
              <div className="grid grid-cols-4 gap-2 font-medium text-blue-600">
                <span>Set</span><span>-</span><span>-</span><span>82%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Arrecadação por Cliente</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Package size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 font-medium">Gráfico de Arrecadação</p>
              <p className="text-sm text-gray-400">Por cliente e bandeira</p>
            </div>
          </div>
          
          {/* Dados da tabela para referência */}
          <div className="mt-4 text-xs text-gray-500">
            <div className="grid grid-cols-5 gap-2 font-medium mb-2">
              <span>Cliente</span>
              <span>Bandeira</span>
              <span>Jan (kg)</span>
              <span>Fev (kg)</span>
              <span>Mar (kg)</span>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-5 gap-2">
                <span>GPA</span><span>Extra</span><span>2.450</span><span>2.680</span><span>2.890</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span>GPA</span><span>Pão de Açúcar</span><span>1.800</span><span>1.950</span><span>2.100</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span>Assaí</span><span>Assaí</span><span>3.200</span><span>3.450</span><span>3.680</span>
              </div>
              <div className="grid grid-cols-5 gap-2 font-medium text-blue-600">
                <span>Proença</span><span>Proença</span><span>1.200</span><span>1.350</span><span>1.480</span>
              </div>
              <div className="grid grid-cols-5 gap-2 font-medium text-green-600 border-t pt-1">
                <span>TOTAL</span><span>-</span><span>8.650</span><span>9.430</span><span>10.150</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operações Diárias */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Operações de Hoje</h3>
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700" asChild>
            <a href="/planejamento">
            <Calendar size={16} className="mr-2" />
            Planejar Coletas
            </a>
          </Button>
        </div>
        
        <div className="space-y-3">
          {mockDailyOperations.map((operation) => (
            <div key={operation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  operation.status === 'coletado' ? 'bg-green-500' :
                  operation.status === 'programado' ? 'bg-blue-500' :
                  operation.status === 'nao_coletado' ? 'bg-red-500' :
                  'bg-gray-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900">Loja {operation.lojaId}</p>
                  <p className="text-sm text-gray-500">
                    {operation.status === 'coletado' 
                      ? `Coletado: ${operation.quantidadeColetada}kg de ${operation.quantidadePrevista}kg`
                      : `Previsto: ${operation.quantidadePrevista}kg`
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  className={`text-xs ${
                    operation.status === 'coletado' ? 'bg-green-100 text-green-800' :
                    operation.status === 'programado' ? 'bg-blue-100 text-blue-800' :
                    operation.status === 'nao_coletado' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {operation.status === 'coletado' ? 'Coletado' :
                   operation.status === 'programado' ? 'Programado' :
                   operation.status === 'nao_coletado' ? 'Não Coletado' :
                   'Cancelado'}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Edit size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itens Não Doados */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lojas sem Doar - Últimos 7 dias</h3>
        
        <div className="space-y-3">
          {mockLojas.filter(loja => loja.status === 'ativo' && (loja.ultimaColeta === '-' || new Date(loja.ultimaColeta) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))).map((loja) => (
              <div key={loja.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{loja.nome}</p>
                    <p className="text-sm text-gray-600">{loja.bandeira} - {loja.regional}</p>
                    <p className="text-sm text-red-700">
                      {loja.ultimaColeta === '-' ? 'Nunca doou' : `Última doação: ${new Date(loja.ultimaColeta).toLocaleDateString('pt-BR')}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-red-700">
                        {loja.ultimaColeta === '-' ? '0 dias' : `${Math.floor((Date.now() - new Date(loja.ultimaColeta).getTime()) / (1000 * 60 * 60 * 24))} dias`}
                      </p>
                      <p className="text-xs text-gray-500">
                        sem doar
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        onClick={() => {
                          // Implementar ação de reagendar coleta para loja
                          console.log('Reagendar coleta para:', loja);
                        }}
                      >
                        <Calendar size={14} className="mr-1" />
                        Reagendar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => {
                          // Implementar ação de contatar loja diretamente
                          console.log('Contatar loja:', loja);
                        }}
                      >
                        <Phone size={14} className="mr-1" />
                        Contatar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {mockLojas.filter(loja => loja.status === 'ativo' && (loja.ultimaColeta === '-' || new Date(loja.ultimaColeta) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))).length === 0 && (
          <div className="text-center py-8">
            <CheckCircle size={48} className="mx-auto text-green-400 mb-2" />
            <p className="text-gray-500">Todas as lojas ativas doaram nos últimos 7 dias</p>
          </div>
        )}
      </div>
    </div>
  );
}