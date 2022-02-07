import AxiosRequestHandler from "@/utils/AxiosRequestHandler";
import axios from "axios";



class DatatricsService {



  public static getConversionByDate(
    projectid: string,
    firstDate: string,
    lastDate: string,
  ) 
  {
    return AxiosRequestHandler.get(
      `/project/${projectid}/sale?&sort=tracker&limit=2&q[created][$gte]=${firstDate}&q[created][$lte]=${lastDate}&apikey=${process.env.VUE_APP_DATATRICS_API_KEY}`
    );
  }

  public static getProfileByDate(
    projectid: string,
    firstDate: string,
    lastDate: string,
  ) 
  {
    return AxiosRequestHandler.get(
      `/project/${projectid}/profile?&limit=2&serve -s distq[created][$gte]=${firstDate}&q[created][$lte]=${lastDate}&apikey=${process.env.VUE_APP_DATATRICS_API_KEY}`
    );
  }

  public static getContentByDate(
    projectid: string,
    firstDate: string,
    lastDate: string,
  ) 
  {
    return AxiosRequestHandler.get(
      `/project/${projectid}/content?&limit=2&type=item&q[created][$gte]=${firstDate}&apikey=${process.env.VUE_APP_DATATRICS_API_KEY}`
    );
   
  }
  
}

export default DatatricsService;

