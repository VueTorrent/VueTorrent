import { describe, it, expect } from 'vitest'
import { stateQbitToVt, stateVtToQbit, TorrentState } from './TorrentState'
import { TorrentState as QbitTorrentState } from '../qbit/TorrentState'

describe('stateQbitToVt', () => {
  it('should map all QbitTorrentState values correctly', () => {
    expect(stateQbitToVt(QbitTorrentState.META_DL)).toBe(TorrentState.META_DOWNLOAD)
    expect(stateQbitToVt(QbitTorrentState.FORCED_META_DL)).toBe(TorrentState.FORCED_META_DOWNLOAD)
    expect(stateQbitToVt(QbitTorrentState.FORCED_DL)).toBe(TorrentState.DL_FORCED)
    expect(stateQbitToVt(QbitTorrentState.DOWNLOADING)).toBe(TorrentState.DOWNLOADING)
    expect(stateQbitToVt(QbitTorrentState.STALLED_DL)).toBe(TorrentState.DL_STALLED)
    expect(stateQbitToVt(QbitTorrentState.ALLOCATING)).toBe(TorrentState.DL_STALLED)
    expect(stateQbitToVt(QbitTorrentState.PAUSED_DL)).toBe(TorrentState.DL_STOPPED)
    expect(stateQbitToVt(QbitTorrentState.STOPPED_DL)).toBe(TorrentState.DL_STOPPED)
    expect(stateQbitToVt(QbitTorrentState.QUEUED_DL)).toBe(TorrentState.DL_QUEUED)
    expect(stateQbitToVt(QbitTorrentState.FORCED_UP)).toBe(TorrentState.UL_FORCED)
    expect(stateQbitToVt(QbitTorrentState.UPLOADING)).toBe(TorrentState.UPLOADING)
    expect(stateQbitToVt(QbitTorrentState.STALLED_UP)).toBe(TorrentState.UL_STALLED)
    expect(stateQbitToVt(QbitTorrentState.PAUSED_UP)).toBe(TorrentState.UL_STOPPED)
    expect(stateQbitToVt(QbitTorrentState.STOPPED_UP)).toBe(TorrentState.UL_STOPPED)
    expect(stateQbitToVt(QbitTorrentState.QUEUED_UP)).toBe(TorrentState.UL_QUEUED)
    expect(stateQbitToVt(QbitTorrentState.CHECKING_DL)).toBe(TorrentState.CHECKING_DISK)
    expect(stateQbitToVt(QbitTorrentState.CHECKING_UP)).toBe(TorrentState.CHECKING_DISK)
    expect(stateQbitToVt(QbitTorrentState.CHECKING_RESUME_DATA)).toBe(TorrentState.CHECKING_RESUME_DATA)
    expect(stateQbitToVt(QbitTorrentState.MOVING)).toBe(TorrentState.MOVING)
    expect(stateQbitToVt(QbitTorrentState.MISSING_FILES)).toBe(TorrentState.MISSING_FILES)
    expect(stateQbitToVt(QbitTorrentState.ERROR)).toBe(TorrentState.ERROR)
    expect(stateQbitToVt(QbitTorrentState.UNKNOWN)).toBe(TorrentState.UNKNOWN)
  })
})

describe('stateVtToQbit', () => {
  it('should map all TorrentState values correctly', () => {
    const mappings: Record<TorrentState, QbitTorrentState> = {
      [TorrentState.META_DOWNLOAD]: QbitTorrentState.META_DL,
      [TorrentState.FORCED_META_DOWNLOAD]: QbitTorrentState.FORCED_META_DL,
      [TorrentState.DL_FORCED]: QbitTorrentState.FORCED_DL,
      [TorrentState.DOWNLOADING]: QbitTorrentState.DOWNLOADING,
      [TorrentState.DL_STALLED]: QbitTorrentState.STALLED_DL,
      [TorrentState.DL_STOPPED]: QbitTorrentState.STOPPED_DL,
      [TorrentState.DL_QUEUED]: QbitTorrentState.QUEUED_DL,
      [TorrentState.UL_FORCED]: QbitTorrentState.FORCED_UP,
      [TorrentState.UPLOADING]: QbitTorrentState.UPLOADING,
      [TorrentState.UL_STALLED]: QbitTorrentState.STALLED_UP,
      [TorrentState.UL_STOPPED]: QbitTorrentState.STOPPED_UP,
      [TorrentState.UL_QUEUED]: QbitTorrentState.QUEUED_UP,
      [TorrentState.CHECKING_DISK]: QbitTorrentState.CHECKING_DL,
      [TorrentState.CHECKING_RESUME_DATA]: QbitTorrentState.CHECKING_RESUME_DATA,
      [TorrentState.MOVING]: QbitTorrentState.MOVING,
      [TorrentState.MISSING_FILES]: QbitTorrentState.MISSING_FILES,
      [TorrentState.ERROR]: QbitTorrentState.ERROR,
      [TorrentState.UNKNOWN]: QbitTorrentState.UNKNOWN
    }

    for (const [input, expected] of Object.entries(mappings)) {
      expect(stateVtToQbit(Number(input))).toBe(expected)
    }

    // Fallback
    expect(stateVtToQbit(9999 as TorrentState)).toBe(QbitTorrentState.UNKNOWN)
  })
})
