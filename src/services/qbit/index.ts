import IProvider from './IProvider'

export async function createProvider(): Promise<IProvider> {
  if (
    import.meta.env.MODE === 'demo' ||
    (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_PROVIDER === 'true')
  ) {
    const MockProvider = await import('./MockProvider');
    return MockProvider.default.getInstance();
  } else {
    const QBitProvider = await import('./QBitProvider');
    return QBitProvider.default.getInstance();
  }
}

export type { IProvider }
