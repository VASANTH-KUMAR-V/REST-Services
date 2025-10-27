const API_BASE_URL = "https://localhost:5001/api/Account";

// ✅ General reusable POST request function
export async function postRequest(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await response.text();
  let result;

  try {
    result = JSON.parse(text);
  } catch {
    result = { success: false, message: text };
  }

  if (!response.ok) {
    throw new Error(result.message || "Request failed");
  }

  return result;
}

// ✅ Specific signup function (optional)
export async function signupUser(data) {
  return postRequest("signup", data);
}
