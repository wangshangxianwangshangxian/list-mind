export const MESSAGE_TYPE = {
  INFO   : 'info',
  SUCCESS: 'success',
  WARN   : 'warn',
  ERROR  : 'error'
}

export const DIRECTION = {
  UP   : 'up',
  DOWN : 'down',
  RIGHT: 'right',
  LEFT : 'left',
}

export const POSITION = {
  LEFT_BOTTOM: 'left_bottom'
}

export const MODE = {
  COMMON: 'common',
  EXAM  : 'exam'
}

export const TIMESTAMP = {
  DAY   : 1000 * 60 * 60 * 24,
  HOUR  : 1000 * 60 * 60,
  MINUTE: 1000 * 60,
  SECOND: 1000
}

export const COLOR = {
  SLATE   : 'bg-slate-200',
  GRAY    : 'bg-gray-200',
  ZINC    : 'bg-zinc-200',
  NEUTRAL : 'bg-neutral-200',
  STONE   : 'bg-stone-200',
  RED     : 'bg-red-200',
  ORANGE  : 'bg-orange-200',
  AMBER   : 'bg-amber-200',
  YELLOW  : 'bg-yellow-200',
  LIME    : 'bg-lime-200',
  GREEN   : 'bg-green-200',
  EMERALD : 'bg-emerald-200',
  TEAL    : 'bg-teal-200',
  CYAN    : 'bg-cyan-200',
  SKY     : 'bg-sky-200',
  BLUE    : 'bg-blue-200',
  INDIGO  : 'bg-indigo-200',
  VIOLET  : 'bg-violet-200',
  PURPLE  : 'bg-purple-200',
  FUCHSIZ : 'bg-fuchsia-200',
  PINK    : 'bg-pink-200',
  ROSE    : 'bg-rose-200'
}

// 拖动 block 时，在多少像素内进行判断是否可以移动到该区域
export const MOVE_MAX_DSITANCE = 100
export const PRIVATE_LEN       = 64
export const PUBLIC_LEN        = 40