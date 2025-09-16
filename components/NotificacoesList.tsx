'use client';

import { useState } from 'react';
import { LucideIcon, Bell, Filter, Eye, CheckCircle, AlertTriangle, Info, Building, Store, Heart, FileText, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockNotifications } from '@/lib/data';

/* ===================== Types ===================== */
type NotificationType =
  | 'loja_sem_coleta'
  | 'quantidade_baixa'
  | 'nova_parceria'
  | 'nf_pendente'
  | 'relatorio_disponivel';

type Priority = 'alta' | 'media' | 'baixa';
type SectionKey = 'programas' | 'lojas' | 'oscs' | 'nfs' | 'relatorios';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data: string; // ISO string
  read: boolean;
  priority: Priority;
}

/* ===================== Configs ===================== */
const sectionConfig: Record<SectionKey, { label: string; icon: LucideIcon; href: string }> = {
  programas: { label: 'Programas', icon: Building, href: '/' },
  lojas: { label: 'Lojas', icon: Store, href: '/lojas' },
  oscs: { label: 'OSCs', icon: Heart, href: '/oscs' },
  nfs: { label: 'NFs', icon: FileText, href: '/nfs' },
  relatorios: { label: 'Relatórios', icon: BarChart3, href: '/relatorios' }
};

const tipoConfig: Record<
  NotificationType,
  { label: string; color: string; icon: LucideIcon; section: SectionKey }
> = {
  loja_sem_coleta: {
    label: 'Loja sem coleta',
    color: 'bg-red-100 text-red-800',
    icon: AlertTriangle,
    section: 'lojas'
  },
  quantidade_baixa: {
    label: 'Quantidade baixa',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Info,
    section: 'programas'
  },
  nova_parceria: {
    label: 'Nova parceria',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    section: 'oscs'
  },
  nf_pendente: {
    label: 'NF pendente',
    color: 'bg-blue-100 text-blue-800',
    icon: FileText,
    section: 'nfs'
  },
  relatorio_disponivel: {
    label: 'Relatório disponível',
    color: 'bg-purple-100 text-purple-800',
    icon: BarChart3,
    section: 'relatorios'
  }
};

/* ===================== Data ===================== */
// Se mockNotifications já for AppNotification[], remova o "as AppNotification[]".
const expandedNotifications: AppNotification[] = [
  ...(mockNotifications as AppNotification[]),
  {
    id: '3',
    type: 'nova_parceria',
    title: 'Nova parceria',
    message: 'Instituto Esperança é parceiro',
    data: '2024-01-21',
    read: false,
    priority: 'media'
  },
  {
    id: '4',
    type: 'nf_pendente',
    title: 'NF pendente',
    message: 'NF001234 aguarda processamento',
    data: '2024-01-20',
    read: true,
    priority: 'alta'
  }
];

/* ===================== Component ===================== */
export function NotificacoesList() {
  const [tipoFilter, setTipoFilter] = useState<'all' | NotificationType>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'lidas' | 'nao_lidas'>('all');

  const filteredNotifications: AppNotification[] = expandedNotifications.filter((notification: AppNotification) => {
    const matchesTipo = tipoFilter === 'all' || notification.type === tipoFilter;
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'lidas' && notification.read) ||
      (statusFilter === 'nao_lidas' && !notification.read);
    return matchesTipo && matchesPriority && matchesStatus;
  });

  const unreadCount = expandedNotifications.filter((n) => !n.read).length;
  const highPriorityCount = expandedNotifications.filter((n) => n.priority === 'alta' && !n.read).length;

  const handleNavigateToSection = (notification: AppNotification) => {
    const tipoConf = tipoConfig[notification.type];
    if (tipoConf && tipoConf.section) {
      const sectionConf = sectionConfig[tipoConf.section];
      if (sectionConf) {
        // Em Next.js você pode usar useRouter().push(sectionConf.href) para evitar full reload.
        window.location.href = sectionConf.href;
      }
    }
  };

  const markAsRead = (notificationId: AppNotification['id']) => {
    // Implementar marcação como lida
    console.log('Marcar como lida:', notificationId);
  };

  return (
    <div className="ml-72 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
          <p className="text-sm text-gray-500">Central de notificações do sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CheckCircle size={16} className="mr-2" />
            Marcar Todas como Lidas
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Notificações</p>
              <p className="text-2xl font-bold text-gray-900">{expandedNotifications.length}</p>
            </div>
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Não Lidas</p>
              <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
            </div>
            <Info className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alta Prioridade</p>
              <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
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

          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as 'all' | 'lidas' | 'nao_lidas')}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="nao_lidas">Não Lidas</SelectItem>
              <SelectItem value="lidas">Lidas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tipoFilter} onValueChange={(v) => setTipoFilter(v as 'all' | NotificationType)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="loja_sem_coleta">Loja sem coleta</SelectItem>
              <SelectItem value="quantidade_baixa">Quantidade baixa</SelectItem>
              <SelectItem value="nova_parceria">Nova parceria</SelectItem>
              <SelectItem value="nf_pendente">NF pendente</SelectItem>
              <SelectItem value="relatorio_disponivel">Relatório disponível</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as 'all' | Priority)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Prioridades</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredNotifications.map((notification: AppNotification) => {
            const tipoConf =
              tipoConfig[notification.type] ??
              ({
                label: notification.type,
                color: 'bg-gray-100 text-gray-800',
                icon: Info,
                section: 'programas'
              } as const);

            const sectionConf = sectionConfig[tipoConf.section];
            const TipoIcon = tipoConf.icon;
            const SectionIcon = sectionConf?.icon ?? Building;

            return (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 cursor-pointer ${
                  !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => handleNavigateToSection(notification)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tipoConf.color}`}>
                      <TipoIcon size={20} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{new Date(notification.data).toLocaleDateString('pt-BR')}</span>
                        <Badge className={`text-xs ${tipoConf.color}`}>{tipoConf.label}</Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            notification.priority === 'alta'
                              ? 'border-red-300 text-red-700'
                              : notification.priority === 'media'
                              ? 'border-yellow-300 text-yellow-700'
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {notification.priority}
                        </Badge>
                        {sectionConf && (
                          <div className="flex items-center gap-1 text-blue-600">
                            <SectionIcon size={12} />
                            <span>Ir para {sectionConf.label}</span>
                            <ArrowRight size={12} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <CheckCircle size={14} className="mr-1" />
                        Marcar como lida
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateToSection(notification);
                      }}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Eye size={14} className="mr-1" />
                      Ver
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notificação encontrada</h3>
            <p className="text-gray-500">Tente ajustar os filtros para ver mais notificações</p>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {filteredNotifications.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          Mostrando {filteredNotifications.length} de {expandedNotifications.length} notificações
        </div>
      )}
    </div>
  );
}
