import IProvider from './IProvider'
import MockProvider from './MockProvider'
import QBitProvider from './QbitProvider'

const qbit: IProvider =
  import.meta.env.MODE === 'demo' || (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_PROVIDER === 'true') ? MockProvider.getInstance() : QBitProvider.getInstance()

export default qbit
