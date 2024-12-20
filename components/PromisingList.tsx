"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell } from 'lucide-react';

const PromisingList = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');


  const handleNotifySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    try {
      // In real app, you'd call your API endpoint here
      console.log("trying to fetch")
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      console.log("something", response)
      // Simulating API call


    //   await new Promise(resolve => setTimeout(resolve, 1000));
      
    //   setSubmitStatus('success');
    //   setTimeout(() => {
    //     setShowEmailForm(false);
    //     setSubmitStatus('');
    //   }, 2000);

    } catch (error) {
        console.log(error)
      setSubmitStatus('error');
    } finally {
      setSubmitStatus('done')
    }
  };

  return (
      <Card className="basis-2/5">
        <CardHeader>
          <CardTitle>Promising Cryptocurrencies to Watch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            {!showEmailForm ? (
              <div className="space-y-4">
                <p className="text-gray-500 mb-4">Our analysts are currently evaluating emerging cryptocurrencies.</p>
                <Button 
                  onClick={() => setShowEmailForm(true)}
                  className="bg-black hover:bg-gray-800"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notify me when something promising appears
                </Button>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="max-w-sm mx-auto space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitStatus === 'submitting'}
                    className="flex-1"
                  />
                  <Button 
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="bg-black hover:bg-emerald-700"
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
                {submitStatus === 'success' && (
                  <p className="text-green-600">Thanks! We&apos;ll keep you updated.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </CardContent>
      </Card>
  );
};

export default PromisingList;