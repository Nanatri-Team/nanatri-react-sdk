import React, { useRef, useEffect } from 'react';
import { useScript } from './useScript';
import type { NanatriButtonProps } from './types';

const SDK_URL = 'https://nanatri-js-sdk.georgemaevsky.workers.dev/sdk.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'nanatri-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'merchant-id'?: string;
        'item-id'?: string;
        label?: string;
        color?: string;
        'text-color'?: string;
        width?: string;
        height?: string;
        lang?: string;
      };
    }
  }
}

export function NanatriButton({
  merchantId,
  itemId,
  label,
  color,
  textColor,
  width,
  height,
  lang,
  onClicked,
  onOpened,
  onSignedIn,
  onAdded,
  onFailed,
  onClosed,
}: NanatriButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const status = useScript(SDK_URL);

  // Refs so event listeners never go stale without re-attaching
  const onClickedRef = useRef(onClicked);
  const onOpenedRef = useRef(onOpened);
  const onSignedInRef = useRef(onSignedIn);
  const onAddedRef = useRef(onAdded);
  const onFailedRef = useRef(onFailed);
  const onClosedRef = useRef(onClosed);

  useEffect(() => { onClickedRef.current = onClicked; });
  useEffect(() => { onOpenedRef.current = onOpened; });
  useEffect(() => { onSignedInRef.current = onSignedIn; });
  useEffect(() => { onAddedRef.current = onAdded; });
  useEffect(() => { onFailedRef.current = onFailed; });
  useEffect(() => { onClosedRef.current = onClosed; });

  useEffect(() => {
    const el = ref.current;
    if (!el || status !== 'ready') return;

    const handleClicked = () => onClickedRef.current?.();
    const handleOpened = () => onOpenedRef.current?.();
    const handleSignedIn = (e: Event) => onSignedInRef.current?.((e as CustomEvent).detail);
    const handleAdded = (e: Event) => onAddedRef.current?.((e as CustomEvent).detail);
    const handleFailed = (e: Event) => onFailedRef.current?.((e as CustomEvent).detail);
    const handleClosed = () => onClosedRef.current?.();

    el.addEventListener('nanatri-button:clicked', handleClicked);
    el.addEventListener('nanatri-button:opened', handleOpened);
    el.addEventListener('nanatri-button:signed-in', handleSignedIn);
    el.addEventListener('nanatri-button:added', handleAdded);
    el.addEventListener('nanatri-button:failed', handleFailed);
    el.addEventListener('nanatri-button:closed', handleClosed);

    return () => {
      el.removeEventListener('nanatri-button:clicked', handleClicked);
      el.removeEventListener('nanatri-button:opened', handleOpened);
      el.removeEventListener('nanatri-button:signed-in', handleSignedIn);
      el.removeEventListener('nanatri-button:added', handleAdded);
      el.removeEventListener('nanatri-button:failed', handleFailed);
      el.removeEventListener('nanatri-button:closed', handleClosed);
    };
  }, [status]);

  return (
    <nanatri-button
      ref={ref}
      merchant-id={merchantId}
      {...(itemId !== undefined && { 'item-id': itemId })}
      {...(label !== undefined && { label })}
      {...(color !== undefined && { color })}
      {...(textColor !== undefined && { 'text-color': textColor })}
      {...(width !== undefined && { width })}
      {...(height !== undefined && { height })}
      {...(lang !== undefined && { lang })}
    />
  );
}
