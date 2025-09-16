'use client';

import { Partner } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Calendar, Package, MapPin, Users, Heart, Building, Clock, MessageSquare, FileText, Star, AlertTriangle, CheckCircle, Upload, Camera } from 'lucide-react';
import { stageColumns } from '@/lib/data';
import { useState } from 'react';

interface ProgramColumnProps {
  stage: 'ativo' | 'verificar' | 'inativo' | 'encerrada' | 'backlog';
  partners: Partner[];
  onPartnerClick: (partner: Partner) => void;
}

export function ProgramColumn({ stage, partners, onPartnerClick }: ProgramColumnProps) {
  const stageConfig = stageColumns[stage];
  const [uploadingLogo, setUploadingLogo] = useState<string | null>(null);

  const handleLogoUpload = (partnerId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingLogo(partnerId);
      // Simular upload - em produção seria uma chamada para API
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Aqui você salvaria a imagem no backend
        console.log('Logo uploaded for partner:', partnerId, result);
        setUploadingLogo(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex-shrink-0 w-80 ${stageConfig.bgColor} rounded-lg border-2 ${stageConfig.color}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{stageConfig.label}</h3>
          <Badge variant="secondary" className="text-xs">
            {partners.length}
          </Badge>
        </div>
      </div>

      {/* Partners List */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onPartnerClick(partner)}
          >
            {/* Header com logo/ícone e nome */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative group">
                  {partner.logo ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                      <img 
                        src={partner.logo} 
                        alt={`Logo ${partner.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      partner.type === 'osc' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {partner.type === 'osc' ? (
                        <Heart size={16} className="text-red-600" />
                      ) : (
                        <Building size={16} className="text-blue-600" />
                      )}
                    </div>
                  )}
                  
                  {/* Upload overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label htmlFor={`logo-upload-${partner.id}`} className="cursor-pointer">
                      {uploadingLogo === partner.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Camera size={14} className="text-white" />
                      )}
                    </label>
                    <input
                      id={`logo-upload-${partner.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleLogoUpload(partner.id, e)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 text-sm leading-tight">{partner.name}</h4>
              </div>
            </div>
            
            {/* Bandeira e Status */}
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                {partner.bandeira}
              </Badge>
              {partner.type === 'osc' && partner.confianca && (
                <Badge className={`text-xs flex items-center gap-1 ${
                  partner.confianca === 'muito_confiavel' ? 'bg-green-100 text-green-800' :
                  partner.confianca === 'confiavel' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {partner.confianca === 'muito_confiavel' && <CheckCircle size={10} />}
                  {partner.confianca === 'confiavel' && <Star size={10} />}
                  {partner.confianca === 'pouco_confiavel' && <AlertTriangle size={10} />}
                  {partner.confianca === 'muito_confiavel' ? 'Muito Confiável' :
                   partner.confianca === 'confiavel' ? 'Confiável' :
                   'Pouco Confiável'}
                </Badge>
              )}
            </div>

            {/* Informações específicas por tipo */}
            {partner.type === 'osc' ? (
              <div className="space-y-2 mb-3">
                {/* CNPJ */}
                {partner.cnpj && (
                  <div className="flex items-center text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                    <FileText size={10} className="mr-1" />
                    <span className="font-medium">CNPJ:</span> 
                    <span className="ml-1 font-mono">{partner.cnpj}</span>
                  </div>
                )}
                
                {/* Programas e Campanhas */}
                {partner.programas && (
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center">
                      <Users size={10} className="mr-1" />
                      <span>{partner.programas} programas</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={10} className="mr-1" />
                      <span>{partner.campanhas || 0} campanhas</span>
                    </div>
                  </div>
                )}
                
                {/* Localização */}
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin size={10} className="mr-1" />
                  <span>{partner.regional}</span>
                </div>
                
                {/* Número de lojas atendidas */}
                {partner.numeroLojas && (
                  <div className="flex items-center text-xs text-blue-600 bg-blue-50 rounded px-2 py-1">
                    <Users size={12} className="mr-1" />
                    <span className="font-medium">Atende {partner.numeroLojas} lojas</span>
                  </div>
                )}
                
                {/* ID CF se disponível */}
                {partner.idCF && (
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">ID CF:</span> {partner.idCF}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2 mb-3">
                {/* Código da loja */}
                {partner.codigo && (
                  <div className="flex items-center text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                    <FileText size={10} className="mr-1" />
                    <span className="font-medium">Código:</span> 
                    <span className="ml-1 font-mono">{partner.codigo}</span>
                  </div>
                )}
                
                {/* Endereço */}
                {partner.endereco && (
                  <div className="flex items-start text-xs text-gray-500">
                    <MapPin size={10} className="mr-1 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{partner.endereco}</span>
                  </div>
                )}
                
                {/* Regional */}
                <div className="flex items-center text-xs text-gray-500">
                  <Building size={10} className="mr-1" />
                  <span>{partner.regional}</span>
                </div>
                
                {/* Gerente */}
                {partner.gerente && (
                  <div className="flex items-center text-xs text-blue-600 bg-blue-50 rounded px-2 py-1">
                    <Users size={10} className="mr-1" />
                    <span className="font-medium">{partner.gerente}</span>
                  </div>
                )}
                
                {/* Telefone se disponível */}
                {partner.phone && (
                  <div className="flex items-center text-xs text-green-600">
                    <Phone size={10} className="mr-1" />
                    {partner.endereco}
                  </div>
                )}
              </div>
            )}

            {/* Última doação/coleta com destaque visual */}
            {partner.lastDonation ? (
              <div className="flex items-center justify-between text-xs text-green-700 mb-2 bg-green-50 rounded px-2 py-1 border border-green-200">
                <div className="flex items-center">
                  <Package size={12} className="mr-1" />
                  <span className="font-bold">{partner.lastDonation.amount.toLocaleString()} {partner.lastDonation.unit}</span>
                </div>
                <span className="text-green-600">
                  {new Date(partner.lastDonation.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            ) : (
              <div className="flex items-center text-xs text-gray-400 mb-2 bg-gray-50 rounded px-2 py-1">
                <Package size={12} className="mr-1" />
                <span>Sem {partner.type === 'osc' ? 'recebimento' : 'coleta'}</span>
              </div>
            )}

            {/* Última interação */}
            {partner.lastInteraction && (
              <div className="flex items-center justify-between text-xs text-blue-600 mb-2 bg-blue-50 rounded px-2 py-1">
                <div className="flex items-center">
                  {partner.lastInteraction.type === 'ligacao' && <Phone size={10} className="mr-1" />}
                  {partner.lastInteraction.type === 'whatsapp' && <MessageSquare size={10} className="mr-1" />}
                  {partner.lastInteraction.type === 'email' && <Mail size={10} className="mr-1" />}
                  {partner.lastInteraction.type === 'sms' && <MessageSquare size={10} className="mr-1" />}
                  {partner.lastInteraction.type === 'visita' && <Users size={10} className="mr-1" />}
                  <span className="capitalize font-medium">{partner.lastInteraction.type}</span>
                </div>
                <span className="text-blue-500">
                  {new Date(partner.lastInteraction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            )}

            {/* Tags */}
            {partner.tags && partner.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {partner.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                    {tag}
                  </Badge>
                ))}
                {partner.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-gray-100">
                    +{partner.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer com última atividade e ação */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center text-xs text-gray-400">
                <Clock size={12} className="mr-1" />
                <span>
                  {partner.lastDonation ? 
                    new Date(partner.lastDonation.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : 
                    partner.lastContact ? new Date(partner.lastContact).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : 'Sem contato'
                  }
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                Ver
              </Button>
            </div>
          </div>
        ))}

        {partners.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Nenhum parceiro neste estágio</p>
          </div>
        )}
      </div>
    </div>
  );
}