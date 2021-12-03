/**
 * Web response representation.
 *
 * @export
 * @interface WebResponse
 */
export interface WebResponse {
  status: number;
  data: ApiResponse;
}

/**
 * Represents api response.
 *
 * @export
 * @interface ApiResponse
 */
export interface ApiResponse {
  success: boolean;
  data: any;
}
