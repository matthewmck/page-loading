#Turbolinks
## Features
* optimizes navigation automatically
* Can disable turbolinks for specified links
* No server-side cooperation necessary
* Back and reload buttons work as expected

## Browser Support
Turbolinks works in all modern desktop and mobile browsers, including IE v10 and higher. Because Turbolinks is a progessive enhancement, it gracefully degrades to standard navigation for any browser it doesnt support.

## What is does
When you follow a link, Turbolinks automatically fetches the page, swaps in its `<body>`, and merges its `<head>`, all without incurring the cost of a full page load.

## How it does it
Turbolinks intercepts all clicks on `<a href>` links to the same domain. When you click an eligible link, Turbolinks prevents the browser from following it. Instead, Turbolinks changes the browser’s URL using the History API, requests the new page using XMLHttpRequest, and then renders the HTML response.

During rendering, Turbolinks replaces the current `<body>` element outright and merges the contents of the `<head>` element. The JavaScript window and document objects, and the HTML `<html>` element, persist from one rendering to the next.

## Why use it
Turbolinks is fast because it doesn’t reload the page when you follow a link. Instead, your application becomes a persistent, long-running process in the browser. This requires you to rethink the way you structure your JavaScript.

Turbolinks also maintains a cache of recently visited pages. This cache serves two purposes: to display pages without accessing the network during restoration visits, and to improve perceived performance by showing temporary previews during application visits.

## Things to watch out for
In particular, you can no longer depend on a full page load to reset your environment every time you navigate. The JavaScript `window` and `document` objects retain their state across page changes, and any other objects you leave in memory will stay in memory.

## Adding scripts
When you navigate to a new page, Turbolinks looks for any `<script>` elements in the new page’s `<head>` which aren’t present on the current page. Then it appends them to the current `<head>` where they’re loaded and evaluated by the browser. You can use this to load additional JavaScript files on-demand. These scripts will persist to other visted pages however.

Turbolinks evaluates `<script>` elements in a page’s `<body>` each time it renders the page. Because of this, always make sure to load your application’s JavaScript bundle using `<script>` elements in the `<head>` of your document. Otherwise, Turbolinks will reload the bundle with every page change. If you have traditionally placed application scripts at the end of `<body>` for performance reasons, consider using the `<script defer>` attribute instead.

To install behavior, or to perform more complex operations when the page changes, avoid script elements and use the `turbolinks:load` event instead.

## Disabling Turbolinks on specific links
Turbolinks can be disabled on a per-link basis by annotating a link or any of its ancestors with `data-turbolinks="false"`.
```
<a href="/" data-turbolinks="false">Disabled</a>

<div data-turbolinks="false">
  <a href="/">Disabled</a>
</div>
```

## Persisting Elements
Turbolinks allows you to mark certain elements as permanent. Permanent elements persist across page loads, so that any changes you make to those elements do not need to be reapplied after navigation. Designate permanent elements by giving them an HTML `id` and annotating them with `data-turbolinks-permanent`.

## Trigger a Full Reload
You can ensure visits to a certain page will always trigger a full reload by including a `<meta name="turbolinks-visit-control">` element in the page’s `<head>`.
```
<head>
  ...
  <meta name="turbolinks-visit-control" content="reload">
</head>
```
This setting may be useful as a workaround for third-party JavaScript libraries that don’t interact well with Turbolinks page changes.