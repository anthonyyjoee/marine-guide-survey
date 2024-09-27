export const generateUrl = (urlPath) => {
  return "https://us-central1-marine-guide-survey-bd670.cloudfunctions.net/app" + urlPath;
  // return "http://127.0.0.1:5001/test-c6c89/us-central1/app" + urlPath;
  // return "https://d272-2a09-bac1-34a0-50-00-221-1.ngrok-free.app/marine-guide-survey-bd670/us-central1/app" + urlPath;
  // return config.api.baseURL + urlPath;
};

export const generateFetchInit = ({ method, body, contentType = "application/json", authToken }) => {
  const fetchInit = {
    method,
    headers: { "Content-Type": contentType },
  };

  if (body) {
    if (contentType === "application/json") {
      fetchInit.body = JSON.stringify(body);
    } else {
      fetchInit.body = body;
    }
  }

  if (contentType === false) {
    delete fetchInit.headers["Content-Type"];
  }

  if (authToken) {
    fetchInit.headers.Authorization = `Bearer ${authToken}`;
  }

  return fetchInit;
};
