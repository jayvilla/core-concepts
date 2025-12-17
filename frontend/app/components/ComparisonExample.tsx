'use client';

import { useState, useRef } from 'react';

/**
 * SIDE-BY-SIDE COMPARISON
 * 
 * This component demonstrates a practical scenario where
 * the choice between controlled vs uncontrolled matters:
 * 
 * Scenario: Form with validation and conditional UI
 */

export default function ComparisonExample() {
  // Controlled approach
  const [controlledEmail, setControlledEmail] = useState('');
  const [controlledError, setControlledError] = useState('');

  // Uncontrolled approach
  const uncontrolledEmailRef = useRef<HTMLInputElement>(null);
  const [uncontrolledError, setUncontrolledError] = useState('');

  // Controlled validation (can validate on every keystroke)
  const handleControlledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setControlledEmail(value);
    
    // Real-time validation
    if (value && !value.includes('@')) {
      setControlledError('Email must contain @');
    } else {
      setControlledError('');
    }
  };

  // Uncontrolled validation (only on submit/blur)
  const validateUncontrolled = () => {
    const value = uncontrolledEmailRef.current?.value || '';
    if (value && !value.includes('@')) {
      setUncontrolledError('Email must contain @');
    } else {
      setUncontrolledError('');
    }
  };

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-purple-50">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Real-World Comparison: Email Validation
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controlled */}
        <div className="space-y-4">
          <h3 className="font-bold text-blue-900">Controlled</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              value={controlledEmail}
              onChange={handleControlledChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
            {controlledError && (
              <p className="text-red-600 text-sm mt-1">{controlledError}</p>
            )}
            <p className="text-xs text-gray-600 mt-1">
              Validates on every keystroke
            </p>
          </div>
        </div>

        {/* Uncontrolled */}
        <div className="space-y-4">
          <h3 className="font-bold text-green-900">Uncontrolled</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              ref={uncontrolledEmailRef}
              onBlur={validateUncontrolled}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="email@example.com"
            />
            {uncontrolledError && (
              <p className="text-red-600 text-sm mt-1">{uncontrolledError}</p>
            )}
            <p className="text-xs text-gray-600 mt-1">
              Validates on blur (when leaving input)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded-md border border-purple-200">
        <h4 className="font-semibold mb-2 text-purple-900">
          When to use each:
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-blue-900 mb-2">Use Controlled when:</p>
            <ul className="space-y-1 text-gray-700">
              <li>• Need real-time validation</li>
              <li>• Need to transform input (e.g., uppercase)</li>
              <li>• Form state affects other UI elements</li>
              <li>• Need to reset/clear programmatically</li>
              <li>• Building reusable form components</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-green-900 mb-2">Use Uncontrolled when:</p>
            <ul className="space-y-1 text-gray-700">
              <li>• Simple forms with many inputs</li>
              <li>• Only need values on submit</li>
              <li>• Performance matters (fewer re-renders)</li>
              <li>• Integrating with non-React libraries</li>
              <li>• File inputs (always uncontrolled)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

