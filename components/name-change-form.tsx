"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function NameChangeForm() {
  const { user } = useUser();
  const [newName, setNewName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await user?.update({
        firstName: newName.split(' ')[0] || '',
        lastName: newName.split(' ').slice(1).join(' ') || '',
      });
      setSuccess(true);
      setNewName('');
    } catch (err) {
      setError('Failed to update name. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="newName" className="block text-sm font-medium text-gray-300">
          New Full Name
        </label>
        <input
          type="text"
          id="newName"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-700/70 border border-gray-600 
                   text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          placeholder="Enter your new name"
          required
        />
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-400">Name updated successfully!</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent 
                 bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm 
                 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 
                 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Updating...' : 'Update Name'}
      </button>
    </form>
  );
} 