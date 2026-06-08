# nanatri-react

React wrapper for the Nanatri wishlist button. Automatically loads the SDK from the CDN — no extra script tags needed.

## Installation

```bash
npm install nanatri-react
```

React 16.8+ is supported.

---

## Usage

```tsx
import { NanatriButton } from 'nanatri-react';

export function ProductPage() {
  return (
    <NanatriButton
      merchantId="your_merchant_id"
      label="Save to wishlist"
      color="#5956E9"
      textColor="#ffffff"
      width="220px"
      height="48px"
      lang="en"
      onClicked={() => console.log('Button clicked')}
      onOpened={() => console.log('Modal opened')}
      onSignedIn={({ userId }) => console.log('Signed in:', userId)}
      onAdded={({ userId }) => console.log('Added by user:', userId)}
      onFailed={({ error, code }) => console.log('Failed:', error, code)}
      onClosed={() => console.log('Modal closed')}
    />
  );
}
```

### Next.js App Router

Add `"use client"` at the top of the file since `NanatriButton` uses browser APIs:

```tsx
'use client';

import { NanatriButton } from 'nanatri-react';
```

---

## Props

| Prop          | Type                                          | Required | Default     | Description                                    |
|---------------|-----------------------------------------------|----------|-------------|------------------------------------------------|
| `merchantId`  | `string`                                      | Yes      | —           | Your Nanatri merchant ID                       |
| `label`       | `string`                                      | No       | `"Save"`    | Button label text                              |
| `color`       | `string`                                      | No       | `"#5956E9"` | Button background color                        |
| `textColor`   | `string`                                      | No       | `"#ffffff"` | Button text color                              |
| `width`       | `string`                                      | No       | `"200px"`   | Button width                                   |
| `height`      | `string`                                      | No       | `"48px"`    | Button height                                  |
| `lang`        | `string`                                      | No       | `"en"`      | UI language (`"en"` or `"ka"`)                 |
| `onClicked`   | `() => void`                                  | No       | —           | Button clicked, modal is about to open         |
| `onOpened`    | `() => void`                                  | No       | —           | Modal opened                                   |
| `onSignedIn`  | `(detail: { userId: string }) => void`        | No       | —           | User completed sign-in                         |
| `onAdded`     | `(detail: { userId: string }) => void`        | No       | —           | Product added to wishlist                      |
| `onFailed`    | `(detail: { error: string, code: string }) => void` | No | —        | Adding to wishlist failed                      |
| `onClosed`    | `() => void`                                  | No       | —           | Modal closed                                   |
