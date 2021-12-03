import { ApiResponse, WebResponse } from "../Types/ApiTypes";

/**
 * Imitates get request to the server
 * to login.
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @return {*}  {Promise<WebResponse>}
 */
export async function performLogin(
  email: string,
  password: string
): Promise<WebResponse> {
  return new Promise((resolve, reject) => {
    const userDataResponse: ApiResponse = {
      success: true,
      data: {
        email,
      },
    };
    const response: WebResponse = {
      status: 200,
      data: userDataResponse,
    };
    setTimeout(() => {
      resolve(response);
    }, 1000);
  });
}

/**
 * Imitates post request to the server
 * to register a user.
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @param {string} password2
 * @return {*}  {Promise<WebResponse>}
 */
export async function performRegistration(
  email: string,
  password: string,
  password2: string
): Promise<WebResponse> {
  return new Promise((resolve, reject) => {
    const userDataResponse: ApiResponse = {
      success: true,
      data: {
        email,
      },
    };
    const response: WebResponse = {
      status: 200,
      data: userDataResponse,
    };
    setTimeout(() => {
      resolve(response);
    }, 1000);
  });
}
