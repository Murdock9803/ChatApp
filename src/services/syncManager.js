import React from 'react';
import { getUnsyncedMessages, markMessagesSynced, updateMessageStatus } from './database';
import { useNetwork } from './networkUtils';

let syncInProgress = false;

export const syncMessages = async () => {
  if (syncInProgress) {
    return;
  }

  try {
    syncInProgress = true;
    const unsyncedMessages = await getUnsyncedMessages();

    if (unsyncedMessages.length === 0) {
      return;
    }

    console.log(`Syncing ${unsyncedMessages.length} messages...`);

    // Simulate backend sync
    for (const message of unsyncedMessages) {
      await new Promise(resolve => setTimeout(resolve, 500));
      await updateMessageStatus(message.id, 'sent');
      await new Promise(resolve => setTimeout(resolve, 300));
      await updateMessageStatus(message.id, 'delivered');
    }

    const messageIds = unsyncedMessages.map(m => m.id);
    await markMessagesSynced(messageIds);

    console.log('Sync completed');
  } catch (error) {
    console.error('Sync error:', error);
  } finally {
    syncInProgress = false;
  }
};

export const useSyncManager = () => {
  const { isOnline } = useNetwork();

  React.useEffect(() => {
    if (isOnline) {
      setTimeout(() => {
        syncMessages();
      }, 2000);
    }
  }, [isOnline]);

  return { syncMessages, isOnline };
};
