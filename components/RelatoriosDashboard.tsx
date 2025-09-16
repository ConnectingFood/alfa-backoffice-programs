'use client';

import { useState } from 'react';
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp, ExternalLink, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Relatorio {
  id: string;
  nome: string;
  tipo: 'impacto' | 'operacional' | 'financeiro' | 'compliance';
  descricao: string;
  ultimaAtualizacao: string;
  formato: 'PDF' | 'Excel' | 'Dashboard';
  status: 'disponivel' | 'processando' | 'erro';
}

const mockRelatorios: Relatorio[] = [
  { id: '1', nome: 'Arrecadação por Programa', tipo: 'impacto', descricao: 'Quantidade arrecadada por programa', ultimaAtualizacao: '2024-01-20', formato: 'Excel', status: 'disponivel' },
  { id: '2', nome: 'Lojas por Status', tipo: 'operacional', descricao: 'Listagem de lojas por status', ultimaAtualizacao: '2024-01-20', formato: 'Excel', status: 'disponivel' },
  { id: '3', nome: 'OSCs por Status', tipo: 'operacional', descricao: 'Listagem de OSCs por status', ultimaAtualizacao: '2024-01-19', formato: 'Excel', status: 'disponivel' },
  { id: '4', nome: 'Dashboard Tempo Real', tipo: 'operacional', descricao: 'Dashboard interativo', ultimaAtualizacao: '2024-01-21', formato: 'Dashboard', status: 'disponivel' }
];

const tipoConfig = {
  impacto: { label: 'Impacto Social', color: 'bg-green-100 text-green-800', icon: TrendingUp },
  operacional: { label: 'Operacional', color: 'bg-blue-100 text-blue-800', icon: BarChart3 },
  financeiro: { label: 'Financeiro', color: 'bg-orange-100 text-orange-800', icon: PieChart },
  compliance: { label: 'Compliance', color: 'bg-purple-100 text-purple-800', icon: FileText }
};

const reportOptions = {
  parcerias: {
    label: 'Controle de Parcerias',
    options: [
      { id: 'parcerias_completo', label: 'Controle de parcerias completo' },
      { id: 'parcerias_resumido', label: 'Controle de parcerias resumido (Parcerias feitas, Parcerias desfeitas)' }
    ]
  },
  lojas: {
    label: 'Controle de Lojas',
    options: [
      { id: 'evolucao_lojas', label: 'Evolução por loja e parcerias' },
      { id: 'lojas_fechadas', label: 'Lojas fechadas' },
      { id: 'lojas_abertas', label: 'Lojas abertas' }
    ]
  },
  oscs: {
    label: 'Controle de OSCs',
    options: [
     { id: 'oscs_status', label: 'STATUS OSCs' },
     { id: 'oscs_natal_solidariedade', label: 'OSCs NATAL SOLIDARIEDADE' },
      { id: 'oscs_bloqueadas', label: 'OSCs bloqueadas' },
      { id: 'oscs_removidas', label: 'OSCs removidas' }
    ]
  }
};

const statusConfig = {
  disponivel: { label: 'Disponível', color: 'bg-green-100 text-green-800' },
  processando: { label: 'Processando', color: 'bg-yellow-100 text-yellow-800' },
  erro: { label: 'Erro', color: 'bg-red-100 text-red-800' }
};

export function RelatoriosDashboard() {
  const [tipoFilter, setTipoFilter] = useState('all');
  const [formatoFilter, setFormatoFilter] = useState('all');
  const [isNovoRelatorioModalOpen, setIsNovoRelatorioModalOpen] = useState(false);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const filteredRelatorios = mockRelatorios.filter(relatorio => {
    const matchesTipo = tipoFilter === 'all' || relatorio.tipo === tipoFilter;
    const matchesFormato = formatoFilter === 'all' || relatorio.formato === formatoFilter;
    return matchesTipo && matchesFormato;
  });

  const handleNovoRelatorio = () => {
    setIsNovoRelatorioModalOpen(true);
  };

  const handleCloseNovoRelatorioModal = () => {
    setIsNovoRelatorioModalOpen(false);
    setSelectedReports([]);
    setReportName('');
    setReportDescription('');
  };

  const handleReportSelection = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleCreateReport = () => {
    // Implementar criação do relatório
    console.log('Criando relatório:', {
      name: reportName,
      description: reportDescription,
      reports: selectedReports
    });
    handleCloseNovoRelatorioModal();
  };

  return (
    <div className="ml-72 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-sm text-gray-500">Relatórios e dashboards do programa</p>
        </div>
        <Button onClick={handleNovoRelatorio} className="bg-orange-600 hover:bg-orange-700">
          <FileText size={16} className="mr-2" />
          Novo Relatório
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo de Relatório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="impacto">Impacto Social</SelectItem>
              <SelectItem value="operacional">Operacional</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={formatoFilter} onValueChange={setFormatoFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Formatos</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="Excel">Excel</SelectItem>
              <SelectItem value="Dashboard">Dashboard</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Período
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Relatórios</p>
              <p className="text-2xl font-bold text-gray-900">{mockRelatorios.length}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Disponíveis</p>
              <p className="text-2xl font-bold text-green-600">
                {mockRelatorios.filter(r => r.status === 'disponivel').length}
              </p>
            </div>
            <Download className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Operacionais</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockRelatorios.filter(r => r.tipo === 'operacional').length}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dashboards</p>
              <p className="text-2xl font-bold text-blue-600">
                {mockRelatorios.filter(r => r.formato === 'Dashboard').length}
              </p>
            </div>
            <PieChart className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredRelatorios.map((relatorio) => {
          const tipoConf = tipoConfig[relatorio.tipo];
          const statusConf = statusConfig[relatorio.status];
          const IconComponent = tipoConf.icon;
          
          return (
            <div key={relatorio.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${tipoConf.color.replace('text-', 'text-').replace('bg-', 'bg-')} rounded-lg flex items-center justify-center mr-3`}>
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tipoConf.color}`}>
                      {tipoConf.label}
                    </span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConf.color}`}>
                  {statusConf.label}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-semibold text-gray-900 mb-2">{relatorio.nome}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{relatorio.descricao}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  <p>Formato: {relatorio.formato}</p>
                  <p>Atualizado: {new Date(relatorio.ultimaAtualizacao).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="flex gap-2">
                  {relatorio.formato === 'Dashboard' ? (
                    <Button variant="outline" size="sm" disabled={relatorio.status !== 'disponivel'}>
                      <ExternalLink size={14} className="mr-1" />
                      Abrir
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled={relatorio.status !== 'disponivel'}>
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Power BI Integration */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboards Integrados</h3>
        <p className="text-sm text-gray-600 mb-6">
          Dashboards integrados com métricas de performance em tempo real
        </p>
        <div className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 font-medium mb-2">Power BI Dashboard</p>
            <p className="text-sm text-gray-400 mb-4">Dashboard integrado será carregado aqui</p>
            <Button variant="outline">
              <ExternalLink size={16} className="mr-2" />
              Abrir no Power BI
            </Button>
          </div>
        </div>
      </div>

      {/* Novo Relatório Modal */}
      {isNovoRelatorioModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Novo Relatório</h2>
                  <p className="text-sm text-gray-500">Selecione os tipos de relatório desejados</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCloseNovoRelatorioModal}>
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Nome do Relatório */}
              <div>
                <Label htmlFor="reportName">Nome do Relatório</Label>
                <Input 
                  id="reportName"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Digite o nome do relatório..."
                />
              </div>

              {/* Descrição */}
              <div>
                <Label htmlFor="reportDescription">Descrição (opcional)</Label>
                <Textarea 
                  id="reportDescription"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Descreva o objetivo do relatório..."
                  rows={3}
                />
              </div>

              {/* Seleção de Relatórios */}
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Selecione os Relatórios</h3>
                
                {Object.entries(reportOptions).map(([category, categoryData]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-gray-800 flex items-center gap-2">
                      {category === 'parcerias' && <BarChart3 size={16} className="text-blue-600" />}
                      {category === 'lojas' && <FileText size={16} className="text-green-600" />}
                      {category === 'oscs' && <PieChart size={16} className="text-orange-600" />}
                      {categoryData.label}
                    </h4>
                    
                    <div className="space-y-2 ml-6">
                      {categoryData.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={option.id}
                            checked={selectedReports.includes(option.id)}
                            onCheckedChange={() => handleReportSelection(option.id)}
                          />
                          <Label 
                            htmlFor={option.id} 
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumo da Seleção */}
              {selectedReports.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Relatórios Selecionados ({selectedReports.length})</h4>
                  <div className="space-y-1">
                    {selectedReports.map(reportId => {
                      const allOptions = Object.values(reportOptions).flatMap(cat => cat.options);
                      const option = allOptions.find(opt => opt.id === reportId);
                      return (
                        <div key={reportId} className="text-sm text-blue-700 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {option?.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={handleCloseNovoRelatorioModal}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateReport}
                disabled={!reportName.trim() || selectedReports.length === 0}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus size={16} className="mr-2" />
                Criar Relatório
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}