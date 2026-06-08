export interface NanatriButtonSignedInDetail {
  userId: string;
}

export interface NanatriButtonAddedDetail {
  userId: string;
}

export interface NanatriButtonFailedDetail {
  error: string;
  code: string;
}

export interface NanatriButtonProps {
  merchantId: string;
  label?: string;
  color?: string;
  textColor?: string;
  width?: string;
  height?: string;
  lang?: string;
  /** Fires when the button is clicked, before the modal opens */
  onClicked?: () => void;
  /** Fires when the modal opens */
  onOpened?: () => void;
  /** Fires when the user completes sign-in inside the modal */
  onSignedIn?: (detail: NanatriButtonSignedInDetail) => void;
  /** Fires when the user successfully adds the product to their wishlist */
  onAdded?: (detail: NanatriButtonAddedDetail) => void;
  /** Fires when adding to wishlist fails */
  onFailed?: (detail: NanatriButtonFailedDetail) => void;
  /** Fires when the modal is closed */
  onClosed?: () => void;
}
