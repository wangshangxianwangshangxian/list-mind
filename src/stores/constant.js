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
  EXAM  : 'exam',
  GUEST : 'guest'
}

export const OPTIONS = {
  HOME : 'home',
  SAVE : 'save',
  EXAM : 'exam_mode',
  GUEST: 'guest_mode'
}

export const TIMESTAMP = {
  DAY   : 1000 * 60 * 60 * 24,
  HOUR  : 1000 * 60 * 60,
  MINUTE: 1000 * 60,
  SECOND: 1000
}

export const COLOR = {
  SLATE   : 'slate',
  GRAY    : 'gray',
  ZINC    : 'zinc',
  NEUTRAL : 'neutral',
  STONE   : 'stone',
  RED     : 'red',
  ORANGE  : 'orange',
  AMBER   : 'amber',
  YELLOW  : 'yellow',
  LIME    : 'lime',
  GREEN   : 'green',
  EMERALD : 'emerald',
  TEAL    : 'teal',
  CYAN    : 'cyan',
  SKY     : 'sky',
  BLUE    : 'blue',
  INDIGO  : 'indigo',
  VIOLET  : 'violet',
  PURPLE  : 'purple',
  FUCHSIZ : 'fuchsia',
  PINK    : 'pink',
  ROSE    : 'rose'
}

export const BG_COLOR = {
  // SLATE   : 'bg-slate-200',
  GRAY    : 'bg-gray-200',
  // ZINC    : 'bg-zinc-200',
  // NEUTRAL : 'bg-neutral-200',
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

export const TEXT_COLOR = {
  // SLATE   : 'text-slate-400',
  GRAY    : 'text-gray-400',
  // ZINC    : 'text-zinc-400',
  // NEUTRAL : 'text-neutral-400',
  STONE   : 'text-stone-400',
  RED     : 'text-red-400',
  ORANGE  : 'text-orange-400',
  AMBER   : 'text-amber-400',
  YELLOW  : 'text-yellow-400',
  LIME    : 'text-lime-400',
  GREEN   : 'text-green-400',
  EMERALD : 'text-emerald-400',
  TEAL    : 'text-teal-400',
  CYAN    : 'text-cyan-400',
  SKY     : 'text-sky-400',
  BLUE    : 'text-blue-400',
  INDIGO  : 'text-indigo-400',
  VIOLET  : 'text-violet-400',
  PURPLE  : 'text-purple-400',
  FUCHSIZ : 'text-fuchsia-400',
  PINK    : 'text-pink-400',
  ROSE    : 'text-rose-400'
}

export const BORDER_COLOR = {
  // SLATE   : 'border-slate-400',
  GRAY    : 'border-gray-400',
  // ZINC    : 'border-zinc-400',
  // NEUTRAL : 'border-neutral-400',
  STONE   : 'border-stone-400',
  RED     : 'border-red-400',
  ORANGE  : 'border-orange-400',
  AMBER   : 'border-amber-400',
  YELLOW  : 'border-yellow-400',
  LIME    : 'border-lime-400',
  GREEN   : 'border-green-400',
  EMERALD : 'border-emerald-400',
  TEAL    : 'border-teal-400',
  CYAN    : 'border-cyan-400',
  SKY     : 'border-sky-400',
  BLUE    : 'border-blue-400',
  INDIGO  : 'border-indigo-400',
  VIOLET  : 'border-violet-400',
  PURPLE  : 'border-purple-400',
  FUCHSIZ : 'border-fuchsia-400',
  PINK    : 'border-pink-400',
  ROSE    : 'border-rose-400'
}

export const HOT_OPTION = {
  SAVE  : 'save',
  LEFT  : 'left',
  UP    : 'up',
  RIGHT : 'right',
  DOWN  : 'down',
  CREATE: 'create',
  DELETE: 'delete'
}

export const BOARD_KEY = {
  META     : 'Meta',
  CTRL     : 'Ctrl',
  ALT      : 'Alt',
  SHIFT    : 'Shift',
  TAB      : 'Tab',
  BACKSPACE: 'Backspace'
}
// 拖动 block 时，在多少像素内进行判断是否可以移动到该区域
export const MOVE_MAX_DSITANCE = 100
export const PRIVATE_LEN       = 64
export const PUBLIC_LEN        = 40