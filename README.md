# sakina-react

React new typescript component file template code generator.

## Install

```bash
  pnpm add -g sakina-react
```

## Usage

### Simple component

such as project files tree: 

```yml
 └─ project
    └─ src
       └─ components # (in this dir exec command)
```

in `project/src/components` exec:

```bash
  sr gs AnimeList
```

then generate a simple react component file:

```yml
 └─ project
    └─ src
       └─ components
          └─ AnimeList.tsx
```

```tsx
// AnimeList.tsx
import React from 'react'

export interface IAnimeListProps {}

export const AnimeList: React.FC<IAnimeListProps> = (props) => {
  return (
    <div>content</div>
  )
}
```

### With style component

such as:

```bash
  sr g AnimeList
```

then generate a component with style file:

```yml
 └─ project
    └─ src
       └─ components
          └─ AnimeList
             ├─ index.tsx
             └─ index.module.scss
```

## License

MIT
