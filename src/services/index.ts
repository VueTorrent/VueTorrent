import IProvider from './IProvider'
import QBitProvider from './QbitProvider'

async function getProvider(): Promise<IProvider> {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_PROVIDER === 'true') {
    try {
      const { default: MockProvider } = await import('./MockProvider')
      return new MockProvider()
    } catch (error) {
      console.error('Failed to load MockProvider:', error)
      return new QBitProvider()
    }
  } else {
    return new Promise(resolve => resolve(new QBitProvider()))
  }
}

const qbit = await getProvider()

export { qbit }
