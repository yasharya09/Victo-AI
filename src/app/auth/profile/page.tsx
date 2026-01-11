'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import withAuth from '@/components/hoc/withAuth';

function ProfilePageContent() {
  const { user, error, updateProfile, changePassword, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage('');
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        email: email,
      });
      setProfileMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setProfileMessage(error || 'Failed to update profile.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage('');
    try {
      await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        new_password2: newPassword2,
      });
      setPasswordMessage('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setNewPassword2('');
    } catch (err) {
      setPasswordMessage(error || 'Failed to change password.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-background py-12 px-4">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-2xl border border-border space-y-8">
        <h2 className="text-3xl font-bold text-center text-[var(--text-primary)]">User Profile</h2>

        {/* Profile Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">Personal Information</h3>
          {profileMessage && (
            <p className={`text-center text-sm ${profileMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {profileMessage}
            </p>
          )}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[var(--text-secondary)]">Username</label>
              <input type="text" id="username" value={user?.username || ''} readOnly className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] cursor-not-allowed" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)]">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[var(--text-secondary)]">First Name</label>
                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={!isEditing} className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[var(--text-secondary)]">Last Name</label>
                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={!isEditing} className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              {!isEditing ? (
                <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] rounded-lg font-medium transition-colors">
                  Edit Profile
                </button>
              ) : (
                <>
                  <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg font-medium transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="space-y-4 pt-8 border-t border-border">
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">Change Password</h3>
          {passwordMessage && (
            <p className={`text-center text-sm ${passwordMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {passwordMessage}
            </p>
          )}
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-[var(--text-secondary)]">Current Password</label>
              <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-[var(--text-secondary)]">New Password</label>
              <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
            </div>
            <div>
              <label htmlFor="newPassword2" className="block text-sm font-medium text-[var(--text-secondary)]">Confirm New Password</label>
              <input type="password" id="newPassword2" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} required className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
            </div>
            <button type="submit" className="px-4 py-2 bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] rounded-lg font-medium transition-colors">
              Change Password
            </button>
          </form>
        </div>

        {/* Logout Button */}
        <div className="pt-8 border-t border-border text-center">
          <button onClick={logout} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfilePageContent); 