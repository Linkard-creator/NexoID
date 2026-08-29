import QRCode from "qrcode";

/**
 * Gera QR Code em Data URL (base64) apontando para o perfil público do usuário.
 */
export async function generateProfileQRCode(
  usernameOrUUID: string,
  baseUrl: string = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
): Promise<string> {
  const profileUrl = `${baseUrl}/${usernameOrUUID}`;
  
  return QRCode.toDataURL(profileUrl, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 400,
    color: {
      dark: "#0f172a",  // slate-900
      light: "#ffffff",
    },
  });
}

/**
 * Gera QR Code como Buffer (útil para downloads).
 */
export async function generateQRCodeBuffer(
  usernameOrUUID: string,
  baseUrl: string = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
): Promise<Buffer> {
  const profileUrl = `${baseUrl}/${usernameOrUUID}`;
  
  return QRCode.toBuffer(profileUrl, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 400,
  });
}
