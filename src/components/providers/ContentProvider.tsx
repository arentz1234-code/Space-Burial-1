"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  SiteContent,
  Package,
  Testimonial,
  getContent,
  saveContent,
  updatePackage as storeUpdatePackage,
  updateTestimonial as storeUpdateTestimonial,
  addTestimonial as storeAddTestimonial,
  deleteTestimonial as storeDeleteTestimonial,
  resetContent as storeResetContent,
  defaultContent,
} from "@/lib/content-store";

interface ContentContextType {
  content: SiteContent;
  updatePackage: (packageId: string, updates: Partial<Package>) => void;
  updateTestimonial: (testimonialId: string, updates: Partial<Testimonial>) => void;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
  deleteTestimonial: (testimonialId: string) => void;
  updateSiteContent: (updates: Partial<SiteContent>) => void;
  resetContent: () => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  // Load content on mount
  useEffect(() => {
    setContent(getContent());
    setIsLoading(false);

    // Listen for content updates from other tabs/components
    const handleContentUpdate = (e: CustomEvent<SiteContent>) => {
      setContent(e.detail);
    };

    window.addEventListener("content-updated", handleContentUpdate as EventListener);
    return () => {
      window.removeEventListener("content-updated", handleContentUpdate as EventListener);
    };
  }, []);

  const updatePackage = useCallback((packageId: string, updates: Partial<Package>) => {
    storeUpdatePackage(packageId, updates);
    setContent(getContent());
  }, []);

  const updateTestimonial = useCallback((testimonialId: string, updates: Partial<Testimonial>) => {
    storeUpdateTestimonial(testimonialId, updates);
    setContent(getContent());
  }, []);

  const addTestimonial = useCallback((testimonial: Omit<Testimonial, "id">) => {
    storeAddTestimonial(testimonial);
    setContent(getContent());
  }, []);

  const deleteTestimonial = useCallback((testimonialId: string) => {
    storeDeleteTestimonial(testimonialId);
    setContent(getContent());
  }, []);

  const updateSiteContent = useCallback((updates: Partial<SiteContent>) => {
    saveContent(updates);
    setContent(getContent());
  }, []);

  const resetContent = useCallback(() => {
    storeResetContent();
    setContent(defaultContent);
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        updatePackage,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        updateSiteContent,
        resetContent,
        isLoading,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
