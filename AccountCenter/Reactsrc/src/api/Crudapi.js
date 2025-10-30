// ✅ Base URL of your Web API
const API_BASE_URL = "https://localhost:44303/api/JsonCRUD";

// ✅ Helper function for handling API responses
async function handleResponse(response) {
  const text = await response.text();
  let result;

  try {
    result = JSON.parse(text);
  } catch {
    result = { message: text };
  }

  if (!response.ok) {
    throw new Error(result.message || "Request failed");
  }

  return result;
}

// ✅ GET all patients
export async function getAllPatients() {
  const response = await fetch(`${API_BASE_URL}`);
  return handleResponse(response);
}

// ✅ GET patient by ID
export async function getPatientById(id) {
  const response = await fetch(`${API_BASE_URL}/Select/${id}`);
  return handleResponse(response);
}

// ✅ ADD new patient (POST)
export async function addPatient(patient) {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  return handleResponse(response);
}

// ✅ UPDATE patient (PUT)      
export async function updatePatient(id, patient) {
  const response = await fetch(`${API_BASE_URL}/Update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  return handleResponse(response);
}

// ✅ DELETE patient (DELETE)
export async function deletePatient(id) {
  const response = await fetch(`${API_BASE_URL}/Delete/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

// ✅ SEARCH by Name
export async function searchPatientByName(name) {
  const response = await fetch(`${API_BASE_URL}/SearchPatientByName?name=${encodeURIComponent(name)}`);
  return handleResponse(response);
}

// ✅ SEARCH by Email
export async function searchPatientByEmail(email) {
  const response = await fetch(`${API_BASE_URL}/SearchPatientByEmail?email=${encodeURIComponent(email)}`);
  return handleResponse(response);
}

// ✅ SEARCH by Location
export async function searchPatientByLocation(location) {
  const response = await fetch(`${API_BASE_URL}/SearchPatientByLocation?location=${encodeURIComponent(location)}`);
  return handleResponse(response);
}

// ✅ SEARCH by Mobile
export async function searchPatientByMobile(mobile) {
  const response = await fetch(`${API_BASE_URL}/SearchPatientByMobile?mobile=${encodeURIComponent(mobile)}`);
  return handleResponse(response);
}
