import IProvider from './IProvider'
import MockProvider from './MockProvider'
import QBitProvider from './QbitProvider'

function getProvider(): IProvider {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_PROVIDER === 'true')
    return new MockProvider()
  else
    return new QBitProvider()
}

const qbit = getProvider()

export { qbit }
