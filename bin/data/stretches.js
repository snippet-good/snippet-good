module.exports = [
  {
    title: 'Recreate Array.prototype.forEach',
    textPrompt:
      'Recreate Array.prototype.forEach. You cannot use the built-in forEach method.',
    codePrompt: 'forEach([1, 2, 3], val => val * 2)',
    difficulty: 2,
    minutes: 5
  },
  {
    title: 'Recreate Array.prototype.filter',
    textPrompt:
      'Recreate Array.prototype.filter. You cannot use the built-in filter method.',
    codePrompt: 'filter([1, 2, 3], val => val % 2)',
    difficulty: 2,
    minutes: 5
  },
  {
    title: 'Recreate Array.prototype.reduce',
    textPrompt:
      'Recreate Array.prototype.reduce. You cannot use the built-in reduce method.',
    codePrompt: 'reduce([1, 2, 3]) // returns 6',
    difficulty: 4,
    minutes: 5
  }
]
