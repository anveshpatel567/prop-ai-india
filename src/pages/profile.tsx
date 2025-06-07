
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/layout/GlassCard';
import { GlowButton } from '@/components/common/GlowButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, updateProfile, signOut, loading } = useSupabaseUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    role: 'seeker' as const
  });

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
      return;
    }
    
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        role: user.role || 'seeker'
      });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      alert('Profile updated successfully!');
    }
  };

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen warm-gradient flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <GlassCard>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Profile</h1>
              <GlowButton onClick={handleSignOut} variant="outline">
                Sign Out
              </GlowButton>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seeker">Property Seeker</SelectItem>
                    <SelectItem value="owner">Property Owner</SelectItem>
                    <SelectItem value="agent">Real Estate Agent</SelectItem>
                    <SelectItem value="rera_agent">RERA Certified Agent</SelectItem>
                    <SelectItem value="builder">Builder/Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <GlowButton type="submit" className="w-full">
                Update Profile
              </GlowButton>
            </form>
          </div>
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
