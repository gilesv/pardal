import { FileType } from "../services/trader.service";

const Extension = {
  [FileType.JSON]: "json",
  [FileType.TXT]: "txt"
};

export function download(fileName: string, fileType: FileType, bytes: string) {
  const blob = new Blob([bytes], { type: "octet/stream" });
  const fullname = `(${fileName}).${Extension[fileType]}`;
  clickOnVirtualLink(blob, fullname);
}

function clickOnVirtualLink(blob: Blob, filename: string) {
  const link = document.createElement("a");
  const url = window.URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
