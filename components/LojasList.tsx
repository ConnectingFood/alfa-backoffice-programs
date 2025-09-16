'use client';

import { useState } from 'react';
import { Search, Filter, Eye, Plus, MapPin, Phone, Mail, Users, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockLojas, lojaStatusConfig } from '@/lib/data';
import { LojaModal } from './LojaModal';
import { ParceriasModal } from './ParceriasModal';
import { Loja } from '@/types';

export function LojasList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bandeiraFilter, setBandeiraFilter] = useState('all');
  const [selectedLoja, setSelectedLoja] = useState<Loja | null>(null);
  const [isLojaModalOpen, setIsLojaModalOpen] = useState(false);
  const [parceriasLoja, setParceriasLoja] = useState<Loja | null>(null);
  const [isParceriasModalOpen, setIsParceriasModalOpen] = useState(false);

  const filteredLojas = mockLojas.filter(loja => {
    const matchesSearch = loja.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loja.gerente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loja.status === statusFilter;
    const matchesBandeira = bandeiraFilter === 'all' || loja.bandeira === bandeiraFilter;
    return matchesSearch && matchesStatus && matchesBandeira;
  });

  const handleVerLoja = (loja: Loja) => {
    setSelectedLoja(loja);
    setIsLojaModalOpen(true);
  };


  const handleParcerias = (loja: Loja) => {
    setParceriasLoja(loja);
    setIsParceriasModalOpen(true);
  };

  return (
    <div className="ml-72 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lojas</h1>
          <p className="text-sm text-gray-500">Gestão de lojas participantes do programa</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus size={16} className="mr-2" />
          Nova Loja
        </Button>
      </div>

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
                placeholder="Buscar por nome ou gerente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todos os Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="verificar">Verificar</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="encerrada">Encerrada</SelectItem>
              <SelectItem value="backlog">Backlog</SelectItem>
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
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">LOJA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">CÓDIGO</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">BANDEIRA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">REGIONAL</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">GERENTE</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">STATUS</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">DOADO (KG)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">ÚLTIMA DOAÇÃO</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filteredLojas.map((loja, index) => {
                const statusConf = lojaStatusConfig[loja.status];
                
                return (
                  <tr key={loja.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{loja.nome}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <MapPin size={12} className="mr-1" />
                          {loja.endereco}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{loja.codigo}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{loja.bandeira}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{loja.regional}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{loja.gerente}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <a 
                            href={`https://wa.me/55${loja.telefone.replace(/\D/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-green-600 hover:text-green-700 flex items-center"
                          >
                            <Phone size={10} className="mr-1" />
                            {loja.telefone}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`text-xs ${statusConf.color}`}>
                        {statusConf.label}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 text-center font-medium">
                      {loja.totalArrecadado ? loja.totalArrecadado.toLocaleString() : '0'}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {loja.ultimaColeta !== '-' ? new Date(loja.ultimaColeta).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                          onClick={() => handleVerLoja(loja)}
                        >
                          <Eye size={14} className="mr-1" />
                          Ver
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleParcerias(loja)}
                        >
                          <Link size={14} className="mr-1" />
                          Parcerias
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
        {filteredLojas.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma loja encontrada</h3>
            <p className="text-gray-500 mb-4">Tente ajustar os filtros ou termos de busca</p>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {filteredLojas.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          Mostrando {filteredLojas.length} de {mockLojas.length} lojas
        </div>
      )}

      {/* Modals */}
      <LojaModal 
        loja={selectedLoja}
        isOpen={isLojaModalOpen}
        onClose={() => setIsLojaModalOpen(false)}
      />
      

      <ParceriasModal 
        loja={parceriasLoja}
        type="loja"
        isOpen={isParceriasModalOpen}
        onClose={() => setIsParceriasModalOpen(false)}
      />
    </div>
  );
}