import get from "@/utils/get"

export default async address => {
  return get('get-remote-data', address)
}