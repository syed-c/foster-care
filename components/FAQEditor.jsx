'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, ArrowUp, ArrowDown, Info } from 'lucide-react';

export default function FAQEditor({ faqs = [], onChange }) {
  const [faqsState, setFaqsState] = useState(faqs);

  const updateFaqs = (newFaqs) => {
    setFaqsState(newFaqs);
    onChange(newFaqs);
  };

  const addFAQ = () => {
    const newFAQ = { question: '', answer: '' };
    updateFaqs([...faqsState, newFAQ]);
  };

  const removeFAQ = (index) => {
    const newFaqs = [...faqsState];
    newFaqs.splice(index, 1);
    updateFaqs(newFaqs);
  };

  const moveFAQUp = (index) => {
    if (index <= 0) return;
    const newFaqs = [...faqsState];
    [newFaqs[index - 1], newFaqs[index]] = [newFaqs[index], newFaqs[index - 1]];
    updateFaqs(newFaqs);
  };

  const moveFAQDown = (index) => {
    if (index >= faqsState.length - 1) return;
    const newFaqs = [...faqsState];
    [newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]];
    updateFaqs(newFaqs);
  };

  const updateFAQ = (index, field, value) => {
    const newFaqs = [...faqsState];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    updateFaqs(newFaqs);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Label>FAQs</Label>
          <span className="ml-2 cursor-help" title="Frequently Asked Questions - Common questions and answers about fostering in this location">
            <Info className="w-4 h-4 text-muted-foreground" />
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>
      
      <div className="space-y-4">
        {faqsState.map((faq, index) => (
          <Card key={index} className="relative">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">FAQ #{index + 1}</CardTitle>
                <div className="flex space-x-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => moveFAQUp(index)}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => moveFAQDown(index)}
                    disabled={index === faqsState.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFAQ(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor={`faq-question-${index}`}>Question</Label>
                <Input
                  id={`faq-question-${index}`}
                  value={faq.question || ''}
                  onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                  placeholder="Enter question"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`faq-answer-${index}`}>Answer</Label>
                <Textarea
                  id={`faq-answer-${index}`}
                  value={faq.answer || ''}
                  onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                  placeholder="Enter answer"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        
        {faqsState.length === 0 && (
          <div className="text-center py-8 text-muted-foreground bg-blue-50 rounded-lg border border-blue-200 p-4">
            <Info className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No FAQs Added</h3>
            <p className="text-sm mb-4">
              FAQs help answer common questions about fostering in this location. 
              Consider adding questions about requirements, process, support, and benefits.
            </p>
            <Button type="button" variant="outline" onClick={addFAQ}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First FAQ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}