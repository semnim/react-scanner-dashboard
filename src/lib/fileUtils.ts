export const readUploadedFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };

    reader.onerror = (error) => {
      reject(new Error(`File read failed: ${error.target?.error?.message ?? "Unknown error"}`));
    };

    reader.readAsText(file);
  });
};

