"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useCustomNavigationGuard = (
  isDirty: boolean,
  setModalOpen: (state: boolean) => void,
) => {
  const router = useRouter();
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isDirty) {
        setModalOpen(true);
        setPendingUrl(url);
        return false;
      }
      return true;
    };

    const originalPush = router.push;
    router.push = async (url: string, options?: any) => {
      const shouldProceed = handleRouteChange(url);
      if (shouldProceed) {
        return originalPush(url, options);
      }
    };

    return () => {
      router.push = originalPush;
    };
  }, [isDirty, router, setModalOpen]);

  return { pendingUrl };
};

export { useCustomNavigationGuard };
