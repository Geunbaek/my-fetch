# fetch-io

- fetch api 를 조금 더 쉽게 사용하기 위해 래핑한 라이브러리로 HTTP 기본 메서드인 `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS` 의 기능을 포함하고 있습니다.

## 설치

```bash
npm i fetch-io
```

## method

- get(url, options?)
- post(url, options?)
- put(url, options?)
- patch(url, options?)
- delete(url, options?)
- head(url, options?)
- options(url, options?)

## Usage

```TypeScript
import fetchIo from "fetch-io";

// GET Method
function getProductById() {
  return fetchIo.get(`${BASE_PATH}/product/1`, {
    params: {
      category: "food"
    }
  });
}

// POST Method
function postProduct() {
  return fetchIo.post(`${BASE_PATH}/product/1`, {
    body: {
      category: "food",
      name: "noodle",
      price: 1000,
    }
  });
}

// PUT Method
function updateProduct() {
  return fetchIo.put(`${BASE_PATH}/product/1`, {
    body: {
      category: "food",
      name: "noodle",
      price: 1000,
    }
  });
}

// PATCH Method
function updateProduct() {
  return fetchIo.put(`${BASE_PATH}/product/1`, {
    body: {
      price: 2000,
    }
  });
}

// DELETE Method
function deleteProduct() {
  return fetchIo.delete(`${BASE_PATH}/product/1`, {
      body: {
      category: "food",
      name: "noodle",
      price: 1000,
    }
  });
}
```

### options

Type : `Object`

```typescript
interface FetchIoOptions {
  // 기존 fetch props
  headers: Object;
  mode: 'cors' | 'no-cors' | 'same-origin';
  credentials: 'omit' | 'same-origin' | 'include';
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'no-cache'
    | 'force-cache'
    | 'only-if-cached';
  redirect: 'follow' | 'error' | 'manual';
  referrer: string;
  referrerPolicy:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'same-origin'
    | 'origin'
    | 'strict-origin'
    | 'origin-when-cross-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';
  integrity: string;
  keepalive: boolean;
  priority: 'high' | 'low' | 'auto';

  // fetch-io props
  timeout: number;
  params: Object;
  body:
    | Object
    | string
    | ArrayBuffer
    | Blob
    | FormData
    | URLSearchParams
    | ReadableStream;

  // TODO: next props
  next: {
    revalidate: false | 0 | number;
    tags: string[];
  };
}
```
