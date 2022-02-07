import axios, { AxiosResponse, AxiosError } from "axios";
// import { StatusCodes } from "http-status-codes";
// import BadRequestException from "./exceptions/badRequest.exception";
// import HttpException from "./exceptions/httpException";
// import InternalServerException from "./exceptions/internalServer.exception";

class AxiosRequestHandler {
  private static api = axios.create({
    baseURL: process.env.VUE_APP_DATATRICS_BASE_URL,
  });

  public static get(url: string) {
    return this.api
      .get(url)
      .then((res: AxiosResponse) => {
        return res;
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          return err.response;
        }
      });
  }

  public static post(url: string, object: any, token: any): any {
    return this.api
      .post(url, object, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        return res;
      })
      .catch((err: AxiosError) => {
        return err.response;
      });
  }

  public static postWithoutBody(url: string, token: any): any {
    return this.api
      .post(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        return res;
      })
      .catch((err: AxiosError) => {
        return err.response;
      });
  }

  public static delete(url: string, object: any): any {
    return this.api
      .delete(url, object)
      .then((res: AxiosResponse) => {
        return res;
      })
      .catch((err: AxiosError) => {
        return err.response;
      });
  }

  public static put(url: string, object: any, token: string): any {
    return this.api
      .put(url, object, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        return res;
      })
      .catch((err: AxiosError) => {
        return err.response;
      });
  }

  public static patch(url: string, object: any, token: string): any {
    return this.api
      .patch(url, object, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        return res;
      })
      .catch((err: AxiosError) => {
        return err.response;
      });
  }
}
console.log(AxiosRequestHandler);
export default AxiosRequestHandler;
