import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const PlayIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8 6V18L18 12L8 6Z" fill="currentColor" />
  </Icon>
)

export const PauseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8 7H11V17H8V7ZM13 7H16V17H13V7Z" fill="currentColor" />
  </Icon>
)

export const NextIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 7V17L14 12L7 7ZM16 17V7H14V17H16Z" fill="currentColor" />
  </Icon>
)

export const PreviousIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 17L16 7L9 12L16 17ZM7 7L7 17L9 17L9 7L7 7Z" fill="currentColor" />
  </Icon>
)

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export const VolumeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M11 5L6 9H2V15H6L11 19V5Z" {...stroke} />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" {...stroke} />
  </Icon>
)

export const MutedIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M11 5L6 9H2V15H6L11 19V5Z" {...stroke} />
    <path d="M22 9l-6 6M16 9l6 6" {...stroke} />
  </Icon>
)

export const ShuffleIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" {...stroke} />
  </Icon>
)

export const RepeatIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M17 1l4 4-4 4" {...stroke} />
    <path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4" {...stroke} />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" {...stroke} />
  </Icon>
)

export const RepeatOneIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M17 1l4 4-4 4" {...stroke} />
    <path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4" {...stroke} />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" {...stroke} />
    <path d="M11 10l1.5-1v6" {...stroke} strokeWidth={1.75} />
  </Icon>
)

export const ArrowLeftIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M12.707 17.293L8.414 13H18V11H8.414L12.707 6.707L11.293 5.293L4.586 12L11.293 18.707L12.707 17.293Z"
      fill="currentColor"
    />
  </Icon>
)

export const ChevronDownIcon = (props: IconProps) => (
  <Icon size={16} viewBox="0 0 16 17" {...props}>
    <path d="M7.9987 11.5333L12.6654 6.19995H3.33203L7.9987 11.5333Z" fill="currentColor" />
  </Icon>
)

export const CheckIcon = (props: IconProps) => (
  <Icon size={16} viewBox="0 0 15 15" {...props}>
    <path
      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </Icon>
)

export const GithubIcon = (props: IconProps) => (
  <Icon viewBox="0 0 25 25" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.626 2.59985C7.11698 2.59985 2.65198 7.06485 2.65198 12.5739C2.65198 16.9799 5.50898 20.7189 9.47298 22.0389C9.97198 22.1289 10.152 21.8219 10.152 21.5579C10.152 21.3209 10.144 20.6929 10.141 19.8619C7.36598 20.4639 6.77998 18.5239 6.77998 18.5239C6.32798 17.3719 5.67298 17.0649 5.67298 17.0649C4.76798 16.4459 5.74198 16.4599 5.74198 16.4599C6.74398 16.5299 7.26898 17.4879 7.26898 17.4879C8.15898 19.0119 9.60498 18.5719 10.171 18.3169C10.262 17.6719 10.522 17.2319 10.806 16.9829C8.59198 16.7319 6.26398 15.8759 6.26398 12.0529C6.26398 10.9659 6.65298 10.0739 7.28798 9.37785C7.18698 9.12485 6.84198 8.10985 7.38698 6.73785C7.38698 6.73785 8.22398 6.46885 10.129 7.75885C10.9426 7.53752 11.7818 7.42455 12.625 7.42285C13.4682 7.42422 14.3074 7.5372 15.121 7.75885C17.027 6.46785 17.863 6.73785 17.863 6.73785C18.408 8.10985 18.066 9.12485 17.962 9.37785C18.602 10.0739 18.986 10.9649 18.986 12.0529C18.986 15.8859 16.656 16.7279 14.434 16.9749C14.789 17.2829 15.109 17.8909 15.109 18.8209C15.109 20.1549 15.097 21.2309 15.097 21.5579C15.097 21.8249 15.275 22.1349 15.784 22.0369C19.746 20.7149 22.6 16.9789 22.6 12.5739C22.6 7.06485 18.135 2.59985 12.626 2.59985Z"
      fill="currentColor"
    />
  </Icon>
)
