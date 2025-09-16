'use client';

import { useState } from 'react';
import {
  X, Phone, Mail, MessageSquare, Send, User, Calendar, FileText, type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Partner } from '@/types';

/* ===================== Types ===================== */
type TipoInteracao = 'ligacao' | 'email' | 'whatsapp' | 'sms' | 'visita';

type TipoInteracaoConfig = {
  label: string;
  icon: LucideIcon;
  color: string;
  placeholder: string;
};

interface NovaInteracaoModalProps {
  partner: Partner;
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  tipo: TipoInteracao | '';
  data: string;              // yyyy-mm-dd
  horario: string;           // HH:mm
  responsavel: string;
  contato: string;
  assunto: string;
  descricao: string;
  proximaAcao: string;
  dataProximaAcao: string;   // yyyy-mm-dd
}

/* ===================== Config ===================== */
const tipoInteracaoConfig: Record<TipoInteracao, TipoInteracaoConfig> = {
  ligacao: {
    label: 'Ligação',
    icon: Phone,
    color: 'bg-blue-100 text-blue-800',
    placeholder:
      'Descreva o que foi conversado na ligação: assuntos tratados, acordos feitos, próximos passos...',
  },
  email: {
    label: 'E-mail',
    icon: Mail,
    color: 'bg-purple-100 text-purple-800',
    placeholder:
      'Descreva o conteúdo do e-mail: assunto, documentos enviados, solicitações feitas...',
  },
  whatsapp: {
    label: 'WhatsApp',
    icon: MessageSquare,
    color: 'bg-green-100 text-green-800',
    placeholder:
      'Descreva a conversa no WhatsApp: mensagens trocadas, combinações feitas...',
  },
  sms: {
    label: 'SMS',
    icon: Send,
    color: 'bg-yellow-100 text-yellow-800',
    placeholder:
      'Descreva o conteúdo do SMS: mensagem enviada, resposta recebida...',
  },
  visita: {
    label: 'Visita',
    icon: User,
    color: 'bg-orange-100 text-orange-800',
    placeholder:
      'Descreva o que foi discutido na visita: pessoas presentes, pontos abordados, decisões tomadas...',
  },
};

/* ===================== Component ===================== */
export function NovaInteracaoModal({ partner, isOpen, onClose }: NovaInteracaoModalProps) {
  const [formData, setFormData] = useState<FormState>({
    tipo: '',
    data: new Date().toISOString().split('T')[0],
    horario: new Date().toTimeString().slice(0, 5),
    responsavel: '',
    contato: '',
    assunto: '',
    descricao: '',
    proximaAcao: '',
    dataProximaAcao: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova interação:', {
      partnerId: partner.id,
      partnerName: partner.name,
      partnerType: partner.type,
      ...formData,
    });
    onClose();
    setFormData({
      tipo: '',
      data: new Date().toISOString().split('T')[0],
      horario: new Date().toTimeString().slice(0, 5),
      responsavel: '',
      contato: '',
      assunto: '',
      descricao: '',
      proximaAcao: '',
      dataProximaAcao: '',
    });
  };

  const tipoConf = formData.tipo ? tipoInteracaoConfig[formData.tipo] : null;
  const IconComponent = tipoConf?.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                tipoConf ? tipoConf.color : 'bg-gray-100'
              }`}
            >
              {IconComponent ? (
                <IconComponent className="w-5 h-5" />
              ) : (
                <MessageSquare className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Nova Interação</h2>
              <p className="text-sm text-gray-500">
                {partner.type === 'osc' ? 'OSC' : 'Loja'}: {partner.name}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Tipo de Interação & Responsável */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo">Tipo de Interação *</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) => setFormData({ ...formData, tipo: value as TipoInteracao | '' })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {(
                    Object.entries(tipoInteracaoConfig) as [TipoInteracao, TipoInteracaoConfig][]
                  ).map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <Icon size={16} />
                          {config.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="responsavel">Responsável *</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                placeholder="Seu nome"
                required
              />
            </div>
          </div>

          {/* Data e Horário */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data">Data *</Label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="horario">Horário</Label>
              <Input
                id="horario"
                type="time"
                value={formData.horario}
                onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
              />
            </div>
          </div>

          {/* Contato */}
          <div>
            <Label htmlFor="contato">Pessoa de Contato</Label>
            <Select
              value={formData.contato}
              onValueChange={(value) => setFormData({ ...formData, contato: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o contato" />
              </SelectTrigger>
              <SelectContent>
                {partner.contacts?.map((contact, index) => (
                  <SelectItem key={index} value={contact.name}>
                    {contact.name} - {contact.role}
                  </SelectItem>
                ))}
                <SelectItem value="outro">Outro contato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assunto */}
          <div>
            <Label htmlFor="assunto">Assunto *</Label>
            <Input
              id="assunto"
              value={formData.assunto}
              onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
              placeholder="Resumo do assunto tratado"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder={tipoConf?.placeholder || 'Descreva os detalhes da interação...'}
              rows={4}
              required
            />
          </div>

          {/* Próxima Ação */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900">Próxima Ação (Opcional)</h4>

            <div>
              <Label htmlFor="proximaAcao">Descrição da Próxima Ação</Label>
              <Input
                id="proximaAcao"
                value={formData.proximaAcao}
                onChange={(e) => setFormData({ ...formData, proximaAcao: e.target.value })}
                placeholder="Ex: Agendar visita, enviar documentos, ligar novamente..."
              />
            </div>

            {formData.proximaAcao && (
              <div>
                <Label htmlFor="dataProximaAcao">Data da Próxima Ação</Label>
                <Input
                  id="dataProximaAcao"
                  type="date"
                  value={formData.dataProximaAcao}
                  onChange={(e) => setFormData({ ...formData, dataProximaAcao: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              <FileText size={16} className="mr-2" />
              Registrar Interação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
