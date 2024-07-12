import DEV_CONFIG from "@/stores/env.dev"
import PROD_CONFIG from "@/stores/env.prod"
import { ENV, ENVIRONMENT } from "@/utils/constant"

export default () => {
  const env = ENVIRONMENT
  if (env === ENV.PROD) {
    localStorage.setItem('config', JSON.stringify(PROD_CONFIG))
  }
  else {
    localStorage.setItem('config', JSON.stringify(DEV_CONFIG))
  }
}