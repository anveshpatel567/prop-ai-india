
import React from 'react';
import { Building2, Search, FileText, Shield, Zap, Brain, Scan, Users } from 'lucide-react';

export const BuildingIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <Building2 className={className} />
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <Search className={className} />
);

export const DocumentIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <FileText className={className} />
);

export const ShieldIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <Shield className={className} />
);

export const ZapIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <Zap className={className} />
);

export const BrainIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <Brain className={className} />
);

export const ScanIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <Scan className={className} />
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <Users className={className} />
);
