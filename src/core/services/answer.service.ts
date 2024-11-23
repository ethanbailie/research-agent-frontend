import { AxiosResponse } from "axios";

import { APIRoutes } from "../http";
import RequestsService from "./request.service";

export default class AnswerService {

    static async RetrieveAnswer(data: any): Promise<AxiosResponse<any>> {
        return RequestsService.postMethod<any>(APIRoutes.ANSWER, data);
    } 
}