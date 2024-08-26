import { BASE_URL, checkStatus, delay, parseJSON } from "../utility/fetchUtilities";
import { RequestLines } from "./RequestLines";

const url = `${BASE_URL}/RequestLines`;

function replacer(key: string, value: any) {
  if (key === "product") return undefined;
  return value;
}

export const requestLinesAPI = {
  list(): Promise<RequestLines[]> {
    return fetch(url).then(checkStatus).then(delay(600)).then(parseJSON);
  },
  find(id: number): Promise<RequestLines> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  post(request: RequestLines) {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
  put(requestLine: RequestLines) {
    return fetch(`${url}/${requestLine.id}`, {
      method: "PUT",
      body: JSON.stringify(requestLine, replacer),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
};
