'use client';

import { useState } from 'react';
import { Search, Filter, Eye, Plus, Download, FileText, Calendar, Settings, Wifi, WifiOff, CheckCircle, AlertTriangle, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NotaFiscal {
  id: string;
  numero: string;
  loja: string;
  bandeira: string;
  cliente: string;
  data: string;
  cfop: string;
  valor: number;
  status: 'processada' | 'pendente' | 'erro';
  programa: string;
}

const mockNFs: NotaFiscal[] = [
  {
    id: '1',
    numero: 'NF001234',
    loja: 'Extra Hiper Vila Olímpia',
    bandeira: 'Extra',
    cliente: 'GPA',
    data: '2024-01-15',
    cfop: '5949',
    valor: 0,
    status: 'processada',
    programa: 'Contra o Desperdício'
  },
  {
    id: '2',
    numero: 'NF001235',
    loja: 'Pão de Açúcar Jardins',
    bandeira: 'Pão de Açúcar',
    cliente: 'GPA',
    data: '2024-01-16',
    cfop: '5949',
    valor: 0,
    status: 'processada',
    programa: 'Contra o Desperdício'
  },
  {
    id: '3',
    numero: 'NF001236',
    loja: 'Assaí Atacadista Morumbi',
    bandeira: 'Assaí',
    cliente: 'Assaí',
    data: '2024-01-17',
    cfop: '5564',
    valor: 25000,
    status: 'pendente',
    programa: 'Doação'
  },
  {
    id: '4',
    numero: 'NF001237',
    loja: 'Extra Hiper Ibirapuera',
    bandeira: 'Extra',
    cliente: 'GPA',
    data: '2024-01-18',
    cfop: '5949',
    valor: 0,
    status: 'erro',
    programa: 'Contra o Desperdício'
  },
  {
    id: '5',
    numero: 'NF001238',
    loja: 'Proença Supermercados Centro',
    bandeira: 'Proença',
    cliente: 'Proença',
    data: '2024-01-19',
    cfop: '5949',
    valor: 0,
    status: 'processada',
    programa: 'Programa doação do bem'
  }
];

const statusConfig = {
  processada: { label: 'Processada', color: 'bg-green-100 text-green-800' },
  pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  erro: { label: 'Erro', color: 'bg-red-100 text-red-800' }
};

export function NFsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clienteFilter, setClienteFilter] = useState('all');
  const [bandeiraFilter, setBandeiraFilter] = useState('all');
  const [viewMode, setViewMode] = useState('lista'); // 'lista' ou 'integracao'
  const [isIntegracaoModalOpen, setIsIntegracaoModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [integracaoConfig, setIntegracaoConfig] = useState({
    apiKey: '',
    secret: '',
    endpoint: '',
    timeout: '30',
    status: 'desconectado', // 'conectado', 'desconectado', 'erro'
    ultimoRecebimento: null as string | null
  });

  const filteredNFs = mockNFs.filter(nf => {
    const matchesSearch = nf.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nf.loja.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || nf.status === statusFilter;
    const matchesCliente = clienteFilter === 'all' || nf.cliente === clienteFilter;
    const matchesBandeira = bandeiraFilter === 'all' || nf.bandeira === bandeiraFilter;
    return matchesSearch && matchesStatus && matchesCliente && matchesBandeira;
  });

  const handleTestarIntegracao = () => {
    // Simular teste de integração
    console.log('Testando integração:', integracaoConfig);
    setIntegracaoConfig({
      ...integracaoConfig,
      status: 'conectado',
      ultimoRecebimento: new Date().toISOString()
    });
  };

  const handleSalvarIntegracao = () => {
    console.log('Salvando configuração:', integracaoConfig);
    setIsIntegracaoModalOpen(false);
  };

  const handleUploadNF = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <div className="ml-72 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notas Fiscais</h1>
          <p className="text-sm text-gray-500">Gestão de notas fiscais do programa</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Toggle View Mode */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'lista' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('lista')}
              className={viewMode === 'lista' ? 'bg-white shadow-sm' : ''}
            >
              <FileText size={14} className="mr-1" />
              Lista
            </Button>
            <Button
              variant={viewMode === 'integracao' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('integracao')}
              className={viewMode === 'integracao' ? 'bg-white shadow-sm' : ''}
            >
              <Settings size={14} className="mr-1" />
              Integração
            </Button>
          </div>
          
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          <Button onClick={handleUploadNF} className="bg-orange-600 hover:bg-orange-700">
            <Plus size={16} className="mr-2" />
            Upload NF
          </Button>
        </div>
      </div>

      {viewMode === 'lista' ? (
        <>
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filtros:</span>
              </div>
              
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar por número ou loja..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
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

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Todos os Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="processada">Processada</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="erro">Erro</SelectItem>
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
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Calendar size={16} className="mr-2" />
                Período
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="overflow-x-auto max-h-[calc(100vh-400px)]">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">NÚMERO</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">CLIENTE</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">LOJA</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">DATA</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">CFOP</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">VALOR</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">STATUS</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">PROGRAMA</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNFs.map((nf, index) => {
                    const statusConf = statusConfig[nf.status];
                    
                    return (
                      <tr key={nf.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <FileText size={16} className="text-gray-400 mr-2" />
                            <span className="font-medium text-gray-900 text-sm">{nf.numero}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="text-xs">
                            {nf.cliente}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{nf.loja}</p>
                            <p className="text-xs text-gray-500">{nf.bandeira}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {new Date(nf.data).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{nf.cfop}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {nf.valor === 0 ? 'Doação' : `R$ ${nf.valor.toLocaleString()}`}
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`text-xs ${statusConf.color}`}>
                            {statusConf.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{nf.programa}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                              <Eye size={14} className="mr-1" />
                              Ver
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700 hover:bg-gray-50">
                              <Download size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredNFs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma nota fiscal encontrada</h3>
                <p className="text-gray-500 mb-4">Tente ajustar os filtros ou termos de busca</p>
              </div>
            )}
          </div>

          {/* Results Summary */}
          {filteredNFs.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              Mostrando {filteredNFs.length} de {mockNFs.length} notas fiscais
            </div>
          )}
        </>
      ) : (
        /* Integration View */
        <div className="space-y-6">
          {/* Integration Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Status da Integração</h3>
              <Button onClick={() => setIsIntegracaoModalOpen(true)} className="bg-orange-600 hover:bg-orange-700">
                <Settings size={16} className="mr-2" />
                Configurar
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                {integracaoConfig.status === 'conectado' ? (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-green-600" />
                  </div>
                ) : integracaoConfig.status === 'erro' ? (
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <WifiOff className="w-5 h-5 text-red-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <WifiOff className="w-5 h-5 text-gray-600" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">Conexão</p>
                  <p className={`text-sm ${
                    integracaoConfig.status === 'conectado' ? 'text-green-600' :
                    integracaoConfig.status === 'erro' ? 'text-red-600' :
                    'text-gray-500'
                  }`}>
                    {integracaoConfig.status === 'conectado' ? 'Conectado' :
                     integracaoConfig.status === 'erro' ? 'Erro de Conexão' :
                     'Desconectado'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">NFs Recebidas</p>
                  <p className="text-sm text-gray-500">1.247 este mês</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Último Recebimento</p>
                  <p className="text-sm text-gray-500">
                    {integracaoConfig.ultimoRecebimento 
                      ? new Date(integracaoConfig.ultimoRecebimento).toLocaleString('pt-BR')
                      : 'Nunca'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Logs */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Log de Integração</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-900">Sincronização bem-sucedida</p>
                    <p className="text-sm text-green-700">45 notas fiscais processadas</p>
                  </div>
                </div>
                <span className="text-sm text-green-600">Há 2 horas</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-900">Timeout na conexão</p>
                    <p className="text-sm text-yellow-700">Tentativa de reconexão automática</p>
                  </div>
                </div>
                <span className="text-sm text-yellow-600">Há 4 horas</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-900">Configuração atualizada</p>
                    <p className="text-sm text-green-700">Parâmetros de API atualizados</p>
                  </div>
                </div>
                <span className="text-sm text-green-600">Ontem</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload NF Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Upload de Nota Fiscal</h2>
                  <p className="text-sm text-gray-500">Faça upload de arquivos XML ou PDF</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsUploadModalOpen(false)}>
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <Label htmlFor="cliente">Cliente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPA">GPA</SelectItem>
                    <SelectItem value="Assaí">Assaí</SelectItem>
                    <SelectItem value="Proença">Proença</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="programa">Programa</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o programa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contra_desperdicio">Contra o Desperdício</SelectItem>
                    <SelectItem value="doacao">Doação de Alimentos</SelectItem>
                    <SelectItem value="destino_certo">Programa Destino Certo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Arraste arquivos aqui</h3>
                <p className="text-gray-500 mb-4">ou clique para selecionar</p>
                <Button variant="outline">
                  <FileText size={16} className="mr-2" />
                  Selecionar Arquivos
                </Button>
                <p className="text-xs text-gray-400 mt-2">Formatos aceitos: XML, PDF (máx. 10MB)</p>
              </div>

              <div>
                <Label htmlFor="observacoes">Observações (opcional)</Label>
                <Textarea 
                  id="observacoes"
                  placeholder="Informações adicionais sobre as notas fiscais..."
                  rows={3}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Upload size={16} className="mr-2" />
                Fazer Upload
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Integration Modal */}
      {isIntegracaoModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Configuração de Integração</h2>
                  <p className="text-sm text-gray-500">Configure a integração com o sistema de NFs</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsIntegracaoModalOpen(false)}>
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input 
                    id="apiKey"
                    type="password"
                    value={integracaoConfig.apiKey}
                    onChange={(e) => setIntegracaoConfig({...integracaoConfig, apiKey: e.target.value})}
                    placeholder="Digite sua API Key"
                  />
                </div>

                <div>
                  <Label htmlFor="secret">Secret Key</Label>
                  <Input 
                    id="secret"
                    type="password"
                    value={integracaoConfig.secret}
                    onChange={(e) => setIntegracaoConfig({...integracaoConfig, secret: e.target.value})}
                    placeholder="Digite sua Secret Key"
                  />
                </div>

                <div>
                  <Label htmlFor="endpoint">Endpoint da API</Label>
                  <Input 
                    id="endpoint"
                    value={integracaoConfig.endpoint}
                    onChange={(e) => setIntegracaoConfig({...integracaoConfig, endpoint: e.target.value})}
                    placeholder="https://api.exemplo.com/nfs"
                  />
                </div>

                <div>
                  <Label htmlFor="timeout">Timeout (segundos)</Label>
                  <Input 
                    id="timeout"
                    type="number"
                    value={integracaoConfig.timeout}
                    onChange={(e) => setIntegracaoConfig({...integracaoConfig, timeout: e.target.value})}
                    placeholder="30"
                  />
                </div>
              </div>

              {/* Test Connection */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Testar Conexão</h4>
                    <p className="text-sm text-gray-600">Verifique se as configurações estão corretas</p>
                  </div>
                  <Button onClick={handleTestarIntegracao} variant="outline">
                    <Wifi size={16} className="mr-2" />
                    Testar
                  </Button>
                </div>
                
                {integracaoConfig.status === 'conectado' && (
                  <div className="mt-3 flex items-center text-green-600">
                    <CheckCircle size={16} className="mr-2" />
                    <span className="text-sm">Conexão estabelecida com sucesso!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsIntegracaoModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSalvarIntegracao} className="bg-orange-600 hover:bg-orange-700">
                Salvar Configuração
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}