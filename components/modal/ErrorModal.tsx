import * as React from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Text } from '~/components/ui/text';
import { useAuthStore } from '~/store/auth-store';

export function ErrorModal() {
  const { error, isOpen, setIsOpen } = useAuthStore();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="bg-white">
      <DialogContent className="bg-white sm:max-w-[425px]" aria-describedby="error-description">
        <DialogHeader>
          <DialogTitle className="mt-6">Unfortunate Error</DialogTitle>
          <DialogDescription id="error-description">
            {error || 'An unknown error occurred.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button aria-label="Close error modal">
              <Text>OK</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
