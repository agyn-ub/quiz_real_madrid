import { sleep } from '@/utils/sleep';

const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000; // 1 second

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  backoff = INITIAL_BACKOFF
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries === 0) throw error;
    
    await sleep(backoff);
    
    return withRetry(
      operation,
      retries - 1,
      Math.min(backoff * 2, 5000) // Max 5 seconds
    );
  }
} 