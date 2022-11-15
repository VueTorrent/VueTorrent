import { describe, it, expect } from 'vitest'
import { generateMultiple, generateTorrent } from './faker'

describe('faker to generate fake torrents', () => {
  it('can generate a fake torrent', () => {
    const t = generateTorrent({ name: 'Test' })
    expect(t.name).toBe('Test')
  })

  it('can generate multile', () => {
    const ts = generateMultiple(3)
    expect(ts.length).toBe(3)
    expect(ts[0]?.name).toBe('Torrent - 0')
  })
})
