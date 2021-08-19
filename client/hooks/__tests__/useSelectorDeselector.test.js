import { renderHook, act } from '@testing-library/react-hooks'
import { usePlayerSelectorDeselector, useWordSelectorDeselector } from '../useSelectorDeselector'
import { blueSpymaster, redSpymaster } from '../../testing/mockdata/players'
import { wordListNoReveals as words, wordListRedTeamWin } from '../../testing/mockdata/wordObjects'

describe('tests usePlayerSelectorDeselector hook', () => {
  test('usePlayerSelectorDeselector renders properly with correct initial state', () => {
    const { result } = renderHook(() => usePlayerSelectorDeselector())
    const [player] = result.current

    expect(player).toBeNull()
  })

  test('setPlayer sets the selected player, when starting player is null', () => {
    const { result } = renderHook(() => usePlayerSelectorDeselector())
    const [player, setPlayer] = result.current

    expect(player).toBeNull()

    act(() => {
      setPlayer(blueSpymaster)
    })

    const [player1] = result.current
    expect(player1).toBe(blueSpymaster)
  })

  test('setPlayer sets null when current selectedPlayer is selected again', () => {
    const { result } = renderHook(() => usePlayerSelectorDeselector())
    const [player, setPlayer] = result.current

    expect(player).toBeNull()

    act(() => {
      setPlayer(blueSpymaster)
    })

    const [player1, setPlayer2] = result.current
    expect(player1).toBe(blueSpymaster)

    act(() => {
      setPlayer2(blueSpymaster)
    })

    const [player2] = result.current
    expect(player2).toBeNull()
  })

  test('setPlayer sets the new selected player, when players are different', () => {
    const { result } = renderHook(() => usePlayerSelectorDeselector())
    const [player, setPlayer] = result.current

    expect(player).toBeNull()

    act(() => {
      setPlayer(blueSpymaster)
    })

    const [player1, setPlayer1] = result.current
    expect(player1).toBe(blueSpymaster)

    act(() => {
      setPlayer1(redSpymaster)
    })

    const [player2] = result.current
    expect(player2).toBe(redSpymaster)
  })
})

describe('tests useWordSelectorDeselector hook', () => {
  test('useWordSelectorDeselector renders properly with correct initial starting state', () => {
    const { result } = renderHook(() => useWordSelectorDeselector())
    const [word] = result.current

    expect(word).toBeNull()
  })

  test('setWord sets the selected word, when current word is null', () => {
    const { result } = renderHook(() => useWordSelectorDeselector())
    const [word, setWord] = result.current

    expect(word).toBeNull()

    act(() => {
      setWord(words[0])
    })

    const [word1] = result.current
    expect(word1).toBe(words[0])
  })

  test('setWord sets null when current selectedWord is selected again', () => {
    const { result } = renderHook(() => useWordSelectorDeselector())
    const [word, setWord] = result.current

    expect(word).toBeNull()

    act(() => {
      setWord(words[0])
    })

    const [word1, setWord1] = result.current
    expect(word1).toBe(words[0])

    act(() => {
      setWord1(words[0])
    })

    const [word2] = result.current
    expect(word2).toBeNull()
  })

  test('setWord sets the new selected word, when words are different', () => {
    const { result } = renderHook(() => useWordSelectorDeselector())
    const [word, setWord] = result.current

    expect(word).toBeNull()

    act(() => {
      setWord(words[0])
    })

    const [word1, setWord1] = result.current

    expect(word1).toBe(words[0])

    act(() => {
      setWord1(words[1])
    })

    const [word2] = result.current
    expect(word2).toBe(words[1])
  })

  test('setWord sets the selected word to null, if the a selected word is revealed', () => {
    const { result } = renderHook(() => useWordSelectorDeselector())
    const [word, setWord] = result.current
    expect(word).toBeNull()

    act(() => {
      setWord(wordListRedTeamWin[0])

      const [word2] = result.current
      expect(word2).toBeNull()
    })
  })
})
