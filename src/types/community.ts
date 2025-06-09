
export type Community = {
  id: string;
  name: string;
  role_access: 'buyer' | 'agent' | 'developer' | 'tenant' | 'all';
  city: string;
  state: string;
  monthly_fee: number;
  created_at: string;
};

export type CommunityMessage = {
  id: string;
  community_id: string;
  user_id: string;
  message: string;
  ai_flagged: boolean;
  created_at: string;
  user?: {
    full_name: string;
    role: string;
  };
};

export type FlaggedMessage = {
  id: string;
  message: string;
  ai_flagged: boolean;
  created_at: string;
  user: {
    full_name: string;
    email: string;
  };
  community: {
    name: string;
  };
};

export type CommunityMembership = {
  id: string;
  user_id: string;
  community_id: string;
  joined_at: string;
  expires_at: string;
};
