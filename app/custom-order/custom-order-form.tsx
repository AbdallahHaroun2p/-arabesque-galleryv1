import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const CustomOrderForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'custom-order',
          name,
          email,
          phone,
          projectDescription,
          budget,
          timeline,
          additionalDetails,
          // Add reference images handling if needed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit custom order request');
      }

      setName('');
      setEmail('');
      setPhone('');
      setProjectDescription('');
      setBudget('');
      setTimeline('');
      setAdditionalDetails('');
      toast.success('Custom order request submitted successfully!');
    } catch (error) {
      console.error('Error submitting custom order:', error);
      toast.error('Failed to submit custom order request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Render your form here */}
    </div>
  );
};

export default CustomOrderForm; 