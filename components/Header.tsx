'use client';

import { useState } from 'react';
import { Filter, Calendar, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeaderProps {
  onNewProgram: () => void;
}

export function Header({ onNewProgram }: HeaderProps) {
  return (
    <div className="ml-72 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programas</h1>
          <p className="text-sm text-gray-500">Gestão do pipeline do programa contra o desperdício</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Filtros */}
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Bandeira" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="extra">Extra</SelectItem>
                <SelectItem value="pao-de-acucar">Pão de Açúcar</SelectItem>
                <SelectItem value="assai">Assaí</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Regional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="sao-paulo">São Paulo</SelectItem>
                <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                <SelectItem value="minas-gerais">Minas Gerais</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Calendar size={16} className="mr-2" />
              Período
            </Button>

            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filtros
            </Button>
          </div>

          {/* Novo Programa */}
          <Button onClick={onNewProgram} className="bg-orange-600 hover:bg-orange-700">
            <Plus size={16} className="mr-2" />
            Novo Programa
          </Button>
        </div>
      </div>
    </div>
  );
}