'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Settings, Category } from '@/lib/supabase';

interface SettingsContextType {
  settings: Settings | null;
  categories: Category[];
  isLoading: boolean;
  updateSettings: (newSettings: Settings) => void;
  updateCategories: (newCategories: Category[]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: React.ReactNode;
  initialSettings: Settings | null;
  initialCategories: Category[];
}

export function SettingsProvider({
  children,
  initialSettings,
  initialCategories,
}: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings | null>(initialSettings);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(false);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gen-tech-settings') {
        try {
          const newSettings = JSON.parse(e.newValue || '{}');
          setSettings(newSettings);
        } catch (error) {
          console.error('Error parsing settings from storage:', error);
        }
      }
      if (e.key === 'gen-tech-categories') {
        try {
          const newCategories = JSON.parse(e.newValue || '[]');
          setCategories(newCategories);
        } catch (error) {
          console.error('Error parsing categories from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedSettings = localStorage.getItem('gen-tech-settings');
      const storedCategories = localStorage.getItem('gen-tech-categories');

      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }

      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error('Error reading stored settings or categories:', error);
    }
  }, []);

  // Listen for custom events from same tab
  useEffect(() => {
    const handleSettingsUpdate = (event: Event) => {
      if (event instanceof CustomEvent) {
        setSettings(event.detail.settings);
      }
    };

    const handleCategoriesUpdate = (event: Event) => {
      if (event instanceof CustomEvent) {
        setCategories(event.detail.categories);
      }
    };

    window.addEventListener('settingsUpdated', handleSettingsUpdate);
    window.addEventListener('categoriesUpdated', handleCategoriesUpdate);

    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdate);
      window.removeEventListener('categoriesUpdated', handleCategoriesUpdate);
    };
  }, []);

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    // Store in localStorage for cross-tab communication
    localStorage.setItem('gen-tech-settings', JSON.stringify(newSettings));
    // Dispatch custom event for same-tab components
    window.dispatchEvent(
      new CustomEvent('settingsUpdated', { detail: { settings: newSettings } })
    );
  };

  const updateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    // Store in localStorage for cross-tab communication
    localStorage.setItem('gen-tech-categories', JSON.stringify(newCategories));
    // Dispatch custom event for same-tab components
    window.dispatchEvent(
      new CustomEvent('categoriesUpdated', {
        detail: { categories: newCategories },
      })
    );
  };

  return (
    <SettingsContext.Provider
      value={{ settings, categories, isLoading, updateSettings, updateCategories }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
