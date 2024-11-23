import { AxiosResponse } from "axios";

import { APIRoutes } from "../http";
import RequestsService from "./request.service";

export default class CaseStudyService {

    static async RetrieveAnswer(): Promise<AxiosResponse<any>> {
        return RequestsService.getMethod<any>(APIRoutes.ANSWER);
    }

  
  
}