# Use the same cache for pagination and infinite scroll

ページングの ui と無限スクロール ui を同時に表示するのに`useSWR`と`useSWRInfinite`を用いる場合に、同じキャッシュが使えるか検証した

## 結論

できる。swr上で同じkeyであれば、同じデータが利用される。revalidateをoffにすれば、一度取得したページをずっと再利用できる

## 動作確認

```sh
npm run dev
```
