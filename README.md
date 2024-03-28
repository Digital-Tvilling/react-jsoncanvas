# react-jsoncanvas

A React application that renders data from the JSON Canvas format. For more information about
JSON Canvas, visit [jsoncanvas.org](https://jsoncanvas.org).

## Current state/todo/needed

React for rendering components, Tailwindcss for styling and [D3](https://d3js.org) for handling zoom and drag/drop in canvas functionality is core in this implementation, and for now react-markdown is being used to render html from markdown.

We aim to minimize use of external css files to keep React components as [composable](https://www.epicweb.dev/full-stack-components) as possible.

A lot of functionality and logic is taken from the [jsoncanvas](https://github.com/obsidianmd/jsoncanvas) repository and if needed will be refactored to align more with react standards.

data.content can be a .md file

The data structure will need to change to align with the actual jsoncanvas spec in a future PR, If no one beats us to it.

```
export interface Node {
  id: string
  type: string
  label?: string
  file: string
  x: number
  y: number
  width: number
  height: number
}
```

Also we need to handle width and height, if provided.

I also want to mention that we need to handle the fact that positions from .canvas made in t.ex Obsidian can have negative values, which this original solution is currently not handling.

## What is react-jsoncanvas?

`react-jsoncanvas` is a React application designed to facilitate the rendering of JSON Canvas files. It provides a set of React components that interpret and display JSON Canvas data in a visual format, in it's current state it is not a library, rather an example/ some code to use to render a canvas with nodes and edges in .canvas format

## Features

- It aims to be lightweight and easy to integrate with React projects.
- Provides basic structures and components for rendering JSON Canvas.

## How to Use

To get started with `react-jsoncanvas`, clone the repository with

```sh
git clone https://github.com/Digital-Tvilling/react-jsoncanvas.git
```

Install the dependencies with NPM

```sh
npm install
```

Start up the development environment

```sh
npm run dev
```

## How to Contribute

Contributions are welcome! If you're interested in improving `react-jsoncanvas`, feel free to
submit pull requests.

## License

`react-jsoncanvas` is MIT licensed. For more details, see the LICENSE file in the repository.
