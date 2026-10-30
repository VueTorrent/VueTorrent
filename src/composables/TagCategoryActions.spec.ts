import { useTagCategoryActions } from './TagCategoryActions'

const mocks = vi.hoisted(() => {
  const torrentStore = {
    getTorrentByHash: vi.fn(),
    setTorrentCategory: vi.fn(),
    addTorrentTags: vi.fn(),
    removeTorrentTags: vi.fn(),
    removeTorrentAllTags: vi.fn(),
  }
  const maindataStore = {
    syncMaindataAndWait: vi.fn(),
  }
  const snackbarStore = {
    show: vi.fn(),
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }

  return { torrentStore, maindataStore, snackbarStore }
})

vi.mock('@/stores', () => ({
  useTorrentStore: () => mocks.torrentStore,
  useMaindataStore: () => mocks.maindataStore,
  useSnackbarStore: () => mocks.snackbarStore,
}))

vi.mock('./i18n', () => ({
  useI18nUtils: () => ({ t: (key: string) => key }),
}))

function setTorrents(torrents: Record<string, { category: string; tags: string[] }>) {
  mocks.torrentStore.getTorrentByHash.mockImplementation((hash: string) => torrents[hash])
}

function clickUndo(callIndex = 0) {
  const options = mocks.snackbarStore.show.mock.calls[callIndex][0] as { action: () => Promise<void> }
  return options.action()
}

describe('composables/TagCategoryActions', () => {
  const actions = useTagCategoryActions()

  beforeEach(() => {
    vi.clearAllMocks()
    mocks.torrentStore.setTorrentCategory.mockResolvedValue(undefined)
    mocks.torrentStore.addTorrentTags.mockResolvedValue(undefined)
    mocks.torrentStore.removeTorrentTags.mockResolvedValue(undefined)
    mocks.torrentStore.removeTorrentAllTags.mockResolvedValue(undefined)
    mocks.maindataStore.syncMaindataAndWait.mockResolvedValue(undefined)
  })

  it('restores the original category of each torrent on undo', async () => {
    setTorrents({
      a: { category: 'movies', tags: [] },
      b: { category: 'shows', tags: [] },
      c: { category: 'movies', tags: [] },
    })

    await actions.setCategory(['a', 'b', 'c'], 'anime')
    expect(mocks.torrentStore.setTorrentCategory).toHaveBeenCalledWith(['a', 'b', 'c'], 'anime')

    await clickUndo()

    expect(mocks.torrentStore.setTorrentCategory).toHaveBeenCalledWith(['a', 'c'], 'movies')
    expect(mocks.torrentStore.setTorrentCategory).toHaveBeenCalledWith(['b'], 'shows')
    expect(mocks.maindataStore.syncMaindataAndWait).toHaveBeenCalledTimes(2)
  })

  it('only removes tags that were not already set before adding them', async () => {
    setTorrents({
      a: { category: '', tags: ['new'] },
      b: { category: '', tags: [] },
    })

    await actions.addTags(['a', 'b'], ['new'])
    expect(mocks.torrentStore.addTorrentTags).toHaveBeenCalledWith(['a', 'b'], ['new'])

    await clickUndo()

    expect(mocks.torrentStore.removeTorrentTags).toHaveBeenCalledWith(['b'], ['new'])
  })

  it('only restores tags that were set before removing them', async () => {
    setTorrents({
      a: { category: '', tags: ['old'] },
      b: { category: '', tags: [] },
    })

    await actions.removeTags(['a', 'b'], ['old'])
    expect(mocks.torrentStore.removeTorrentTags).toHaveBeenCalledWith(['a', 'b'], ['old'])

    await clickUndo()

    expect(mocks.torrentStore.addTorrentTags).toHaveBeenCalledWith(['a'], ['old'])
  })

  it('restores all original tags on undo after clearing tags', async () => {
    setTorrents({
      a: { category: '', tags: ['one', 'two'] },
      b: { category: '', tags: ['two', 'three'] },
    })

    await actions.removeAllTags(['a', 'b'])
    expect(mocks.torrentStore.removeTorrentAllTags).toHaveBeenCalledWith(['a', 'b'])

    await clickUndo()

    expect(mocks.torrentStore.addTorrentTags).toHaveBeenCalledWith(['a'], ['one'])
    expect(mocks.torrentStore.addTorrentTags).toHaveBeenCalledWith(['a', 'b'], ['two'])
    expect(mocks.torrentStore.addTorrentTags).toHaveBeenCalledWith(['b'], ['three'])
  })

  it('shows the snackbar without waiting for maindata synchronisation', async () => {
    setTorrents({ a: { category: '', tags: [] } })

    let resolveSync!: () => void
    mocks.maindataStore.syncMaindataAndWait.mockImplementationOnce(
      () =>
        new Promise<void>(resolve => {
          resolveSync = resolve
        })
    )

    const action = actions.addTags(['a'], ['new'])

    await vi.waitFor(() => expect(mocks.snackbarStore.show).toHaveBeenCalledTimes(1))
    expect(mocks.torrentStore.addTorrentTags).toHaveBeenCalledWith(['a'], ['new'])

    resolveSync()
    await action
  })

  it('takes each snapshot only after the previous action has synchronised', async () => {
    const torrents = { a: { category: '', tags: ['X'] } }
    setTorrents(torrents)
    mocks.maindataStore.syncMaindataAndWait.mockImplementationOnce(
      () =>
        new Promise<void>(resolve => {
          setTimeout(() => {
            torrents.a.tags = []
            resolve()
          }, 20)
        })
    )

    const clearTags = actions.removeAllTags(['a'])
    const addExistingTag = actions.addTags(['a'], ['X'])
    await Promise.all([clearTags, addExistingTag])

    await clickUndo(1)

    expect(mocks.torrentStore.removeTorrentTags).toHaveBeenCalledWith(['a'], ['X'])
  })
})
