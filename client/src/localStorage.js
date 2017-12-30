export const saveState = (state) => {
  try {
    const serialzedState = JSON.stringify(state)
    localStorage.setItem('state', serialzedState)
  } catch (error) {
    // ignore for now
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')

    if (serializedState === null) {
      return undefined
    } 
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}