export type AnalyzePayload = {
  website: string; description: string; topicsCsv: string; promptsText: string;
};

export async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    let errorData;
    
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }
    
    const error = new Error(errorData.message || errorText) as any;
    error.status = res.status;
    error.data = errorData;
    throw error;
  }
  
  return res.json();
}

export async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "include" });
  
  if (!res.ok) {
    const errorText = await res.text();
    let errorData;
    
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }
    
    const error = new Error(errorData.message || errorText) as any;
    error.status = res.status;
    error.data = errorData;
    throw error;
  }
  
  return res.json();
}
