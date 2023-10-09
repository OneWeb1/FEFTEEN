function randomRange(min, max) {
  const ids = []

  while (ids.length < max - min) {
    const randomId = Math.floor(Math.random() * (max - min) + min)

    if (ids.includes(randomId)) continue

    ids.push(randomId)
  }

  return ids
}
