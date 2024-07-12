import { PUBLIC_LEN } from "@/utils/constant"

export default key => typeof key === 'string' && key.length === PUBLIC_LEN + 1 + key.startsWith('0x')
