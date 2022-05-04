# React 18 の新機能試してみた

## はじめに

- React 18 が 2022/4/1 に正式リリースとなりました
- 具体的にどんな機能が追加されたのか、お試しサンプルを実装しつつ見てみる

## React 18 の主要新機能

- Automatic Batching
- Transition
- Suspense
- Client and Server Rendering APIs
- Strict Mode Behaviors
- Hooks

## Automatic Batching

- React がパフォーマンスのために複数のステート更新をグループ化して、単一の再レンダーにまとめることを指します。

  - 今まで: React のイベントハンドラ内での更新のみバッチ処理されていました。promise や setTimeout、ネイティブのイベントハンドラやその他あらゆるイベント内で起きる更新はデフォルトではバッチ処理されていませんでした。
  - React18 からは: 自動バッチングにより、これらの更新も自動でバッチ処理されるようになります

- ※記述方法が大きく変わるわけではないです。

- 詳しいドキュメント
  - [Automatic batching for fewer renders in React 18](https://github.com/reactwg/react-18/discussions/21)

<!-- TODO: React 17 と 18 でも比較DEMOをしたい -->

## Transition

- 更新優先度(urgent)を分けて処理を行う機能
  - urgent update: UX のために優先度高めなもの
    - クリック/タイピング/スワイプ/プレスなど
- Transition を用いた Update は UI 描画を変更させるようなもの

```
import {startTransition} from 'react';

// 更新優先度の高い処理
setInputValue(input);

// transitionで定義した中は更新優先度の低い処理と見做される
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```

- [Transition API はこちら](https://reactjs.org/docs/react-api.html#transitions)

## Suspense

- ローディング処理用のコンポーネントができました
- 基本的な使い方

```
<Suspense fallback={<LoadingComponent />}>
  <Component />
</Suspense>
```

- 詳しいドキュメント
  - [Suspense in React 18](https://github.com/reactjs/rfcs/blob/main/text/0213-suspense-in-react-18.md)

<!-- TODO: ここはUI動作デモしたい -->

## Client and Server Rendering APIs

- クライアント向け/サーバ向けの rendering API が変更されました
  - React DOM Client
    - createRoot: render したり unmount したりできる新たなルートを作成するための新メソッドです。
    - hydrateRoot: サーバでレンダーされたアプリをハイドレーションするための新メソッドです。
  - React DOM Server
    - renderToPipeableStream: Node 環境でのストリーミング用。
    - renderToReadableStream: Deno や Cloudflare Workers のようなモダンなエッジランタイム環境用。
- 詳しいドキュメント
  - [React DOM Client](https://reactjs.org/docs/react-dom-client.html)
  - [React DOM Server](https://reactjs.org/docs/react-dom-server.html)

## Strict Mode Behaviors

https://ja.reactjs.org/blog/2022/03/29/react-v18.html#new-strict-mode-behaviors

<!-- ややこしいのできちんと理解して図にしたい -->

## Hooks

- useId
- useTransition
- useDeferredValue
- useSyncExternalStore
- useInsertionEffect
