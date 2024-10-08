export function shimmer(w: number, h: number) {
  return `
  <svg  width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f0f0f0" offset="20%" />
        <stop stop-color="#e0e0e0" offset="50%" />
        <stop stop-color="#f0f0f0" offset="75%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f0f0f0" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;
}
export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M9.99996 18.3333C5.39758 18.3333 1.66663 14.6023 1.66663 9.99996C1.66663 5.39758 5.39758 1.66663 9.99996 1.66663C14.6023 1.66663 18.3333 5.39758 18.3333 9.99996C18.3333 14.6023 14.6023 18.3333 9.99996 18.3333ZM9.16879 13.3333L15.0614 7.44073L13.8829 6.26223L9.16879 10.9763L6.8118 8.61921L5.63328 9.79779L9.16879 13.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function CloseEye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M6.22854 12.5213L4.94064 12.1762L5.46562 10.217C4.67288 9.92502 3.94449 9.49995 3.30752 8.96902L1.87197 10.4045L0.929162 9.46175L2.36472 8.02622C1.57062 7.07362 1.01351 5.91652 0.783936 4.64554L2.09599 4.40698C2.60201 7.20848 5.05296 9.33348 8.00022 9.33348C10.9475 9.33348 13.3985 7.20848 13.9045 4.40698L15.2165 4.64554C14.9869 5.91652 14.4298 7.07362 13.6358 8.02622L15.0713 9.46175L14.1285 10.4045L12.693 8.96902C12.056 9.49995 11.3275 9.92502 10.5348 10.217L11.0598 12.1762L9.77195 12.5213L9.24675 10.5613C8.84162 10.6307 8.42515 10.6668 8.00022 10.6668C7.57535 10.6668 7.15882 10.6307 6.75375 10.5613L6.22854 12.5213Z"
        fill="#171717"
      />
    </svg>
  );
}
export function Eye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.00028 2C11.595 2 14.5857 4.58651 15.2127 8C14.5857 11.4135 11.595 14 8.00028 14C4.4055 14 1.41485 11.4135 0.787842 8C1.41485 4.58651 4.4055 2 8.00028 2ZM8.00028 12.6667C10.824 12.6667 13.2403 10.7013 13.8519 8C13.2403 5.29869 10.824 3.33333 8.00028 3.33333C5.17648 3.33333 2.76023 5.29869 2.1486 8C2.76023 10.7013 5.17648 12.6667 8.00028 12.6667ZM8.00028 11C6.3434 11 5.00026 9.65687 5.00026 8C5.00026 6.34315 6.3434 5 8.00028 5C9.65708 5 11.0003 6.34315 11.0003 8C11.0003 9.65687 9.65708 11 8.00028 11ZM8.00028 9.66667C8.92075 9.66667 9.66695 8.92047 9.66695 8C9.66695 7.07953 8.92075 6.33333 8.00028 6.33333C7.07982 6.33333 6.33359 7.07953 6.33359 8C6.33359 8.92047 7.07982 9.66667 8.00028 9.66667Z"
        fill="#171717"
      />
    </svg>
  );
}
export function Cloud(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 12.5858L16.2426 16.8284L14.8284 18.2426L13 16.415V22H11V16.413L9.17157 18.2426L7.75736 16.8284L12 12.5858ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18.0009 16.9644C19.6966 16.7214 21 15.2629 21 13.5C21 11.567 19.433 10 17.5 10C17.2912 10 17.0867 10.0183 16.8887 10.054C16.9616 9.7142 17 9.36158 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 9.36158 7.03838 9.7142 7.11205 10.0533C6.91331 10.0183 6.70879 10 6.5 10C4.567 10 3 11.567 3 13.5C3 15.2003 4.21241 16.6174 5.81986 16.934L6.00005 16.9646L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z"
        fill="#4338CA"
      />
    </svg>
  );
}
export function Crop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M11.0834 12.4723V13.8612H4.83344C4.44991 13.8612 4.139 13.5503 4.139 13.1668V5.52789H2.05566V4.139H4.139V2.05566H5.52789V12.4723H11.0834ZM12.4723 15.9446V5.52789H6.91678V4.139H13.1668C13.5503 4.139 13.8612 4.44991 13.8612 4.83344V12.4723H15.9446V13.8612H13.8612V15.9446H12.4723Z"
        fill="#525252"
      />
    </svg>
  );
}
export function Delete(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M14.5557 5.52789V14.5557C14.5557 15.3227 13.9339 15.9446 13.1668 15.9446H4.83344C4.06638 15.9446 3.44455 15.3227 3.44455 14.5557V5.52789H2.05566V4.139H15.9446V5.52789H14.5557ZM4.83344 5.52789V14.5557H13.1668V5.52789H4.83344ZM8.30566 6.91678H9.69455V8.30566H8.30566V6.91678ZM8.30566 9.00011H9.69455V10.389H8.30566V9.00011ZM8.30566 11.0834H9.69455V12.4723H8.30566V11.0834ZM5.52789 2.05566H12.4723V3.44455H5.52789V2.05566Z"
        fill="#525252"
      />
    </svg>
  );
}
export function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M7.61133 11.2022L13.9949 4.8186L14.977 5.80069L7.61133 13.1664L3.19189 8.74699L4.17398 7.76491L7.61133 11.2022Z"
        fill="#15803D"
      />
    </svg>
  );
}
export function BankCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3.00488 3H21.0049C21.5572 3 22.0049 3.44772 22.0049 4V20C22.0049 20.5523 21.5572 21 21.0049 21H3.00488C2.4526 21 2.00488 20.5523 2.00488 20V4C2.00488 3.44772 2.4526 3 3.00488 3ZM20.0049 11H4.00488V19H20.0049V11ZM20.0049 9V5H4.00488V9H20.0049ZM14.0049 15H18.0049V17H14.0049V15Z"
        fill="#4338CA"
      />
    </svg>
  );
}
export function Brifcase(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM4 16V19H20V16H4ZM4 14H20V7H4V14ZM9 3V5H15V3H9ZM11 11H13V13H11V11Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M11.6835 24.089L6.83325 25.1668L7.91108 20.3166C7.22324 19.0303 6.83325 17.5608 6.83325 16.0002C6.83325 10.9376 10.9373 6.8335 15.9999 6.8335C21.0625 6.8335 25.1666 10.9376 25.1666 16.0002C25.1666 21.0627 21.0625 25.1668 15.9999 25.1668C14.4393 25.1668 12.9698 24.7769 11.6835 24.089ZM11.4166 16.0002C11.4166 18.5314 13.4686 20.5835 15.9999 20.5835C18.5312 20.5835 20.5833 18.5314 20.5833 16.0002H18.7499C18.7499 17.519 17.5187 18.7502 15.9999 18.7502C14.4811 18.7502 13.2499 17.519 13.2499 16.0002H11.4166Z"
        fill="#4338CA"
      />
    </svg>
  );
}
export function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"
        fill="#404040"
      />
    </svg>
  );
}
export function Close(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M9.00049 8.0184L12.4378 4.58105L13.4199 5.56314L9.98257 9.00049L13.4199 12.4378L12.4378 13.4199L9.00049 9.98257L5.56314 13.4199L4.58105 12.4378L8.0184 9.00049L4.58105 5.56314L5.56314 4.58105L9.00049 8.0184Z"
        fill="#525252"
      />
    </svg>
  );
}
export function Flashlight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10.8333 7.5H17.4999L9.16658 20V12.5H3.33325L10.8333 0V7.5ZM9.16658 9.16667V6.01719L6.2769 10.8333H10.8333V14.4953L14.3858 9.16667H9.16658Z"
        fill="#4338CA"
      />
    </svg>
  );
}
export function Sparkling(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <g clipPath="url(#clip0_14_18564)">
        <path
          d="M12.4727 1.50537L13.3885 3.22261L15.1058 4.13848L13.3885 5.05434L12.4727 6.77157L11.5568 5.05434L9.83957 4.13848L11.5568 3.22261L12.4727 1.50537ZM8.0745 7.14773L11.5467 8.9996L8.0745 10.8514L6.22266 14.3236L4.37081 10.8514L0.89859 8.9996L4.37081 7.14773L6.22266 3.67551L8.0745 7.14773ZM8.59534 8.9996L7.04794 8.17432L6.22266 6.6269L5.39738 8.17432L3.84998 8.9996L5.39738 9.82488L6.22266 11.3722L7.04794 9.82488L8.59534 8.9996ZM14.3245 12.0088L13.1671 9.8387L12.0097 12.0088L9.83957 13.1663L12.0097 14.3236L13.1671 16.4938L14.3245 14.3236L16.4946 13.1663L14.3245 12.0088Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_18564">
          <rect
            width="16.6667"
            height="16.6667"
            fill="white"
            transform="translate(0.666656 0.666504)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
export function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M2.24283 6.85419L11.4895 1.30843C11.8062 1.11848 12.2019 1.11855 12.5185 1.30862L21.7573 6.85416C21.9079 6.94453 22 7.10726 22 7.28286V19.9998C22 20.5521 21.5523 20.9998 21 20.9998H3C2.44772 20.9998 2 20.5521 2 19.9998V7.28298C2 7.10732 2.09218 6.94454 2.24283 6.85419ZM4 8.13244V18.9998H20V8.13197L12.0037 3.33221L4 8.13244ZM12.0597 13.6981L17.3556 9.23515L18.6444 10.7645L12.074 16.3016L5.36401 10.7715L6.63599 9.22813L12.0597 13.6981Z"
        fill="#4338CA"
      />
    </svg>
  );
}
export function Pen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57629ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L7.24264 20.89Z"
        fill="#15803D"
      />
    </svg>
  );
}
export function Timeline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V4C22 3.44772 21.5523 3 21 3H3ZM4 19V5H20V19H4ZM14 7H6V9H14V7ZM18 15V17H10V15H18ZM16 11H8V13H16V11Z"
        fill="#C026D3"
      />
    </svg>
  );
}
export function Chat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z"
        fill="#F97316"
      />
    </svg>
  );
}
export function SendPlane(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M2.75 9.69465H6.91667V8.30576H2.75V1.94854C2.75 1.75678 2.90546 1.60132 3.09722 1.60132C3.15573 1.60132 3.21329 1.6161 3.26456 1.6443L16.0857 8.69597C16.2538 8.78833 16.3151 8.99951 16.2226 9.1675C16.1909 9.22521 16.1434 9.27271 16.0857 9.30444L3.26456 16.356C3.09653 16.4485 2.8854 16.3872 2.79298 16.2192C2.76478 16.1679 2.75 16.1103 2.75 16.0518V9.69465Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function MoreLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M3.79167 7.95825C3.21875 7.95825 2.75 8.427 2.75 8.99992C2.75 9.57284 3.21875 10.0416 3.79167 10.0416C4.36458 10.0416 4.83333 9.57284 4.83333 8.99992C4.83333 8.427 4.36458 7.95825 3.79167 7.95825ZM14.2083 7.95825C13.6354 7.95825 13.1667 8.427 13.1667 8.99992C13.1667 9.57284 13.6354 10.0416 14.2083 10.0416C14.7812 10.0416 15.25 9.57284 15.25 8.99992C15.25 8.427 14.7812 7.95825 14.2083 7.95825ZM9 7.95825C8.42708 7.95825 7.95833 8.427 7.95833 8.99992C7.95833 9.57284 8.42708 10.0416 9 10.0416C9.57292 10.0416 10.0417 9.57284 10.0417 8.99992C10.0417 8.427 9.57292 7.95825 9 7.95825Z"
        fill="#171717"
      />
    </svg>
  );
}
export function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M8.68735 4.00008L11.294 1.39348C11.6845 1.00295 12.3176 1.00295 12.7082 1.39348L15.3148 4.00008H19.0011C19.5533 4.00008 20.0011 4.4478 20.0011 5.00008V8.68637L22.6077 11.293C22.9982 11.6835 22.9982 12.3167 22.6077 12.7072L20.0011 15.3138V19.0001C20.0011 19.5524 19.5533 20.0001 19.0011 20.0001H15.3148L12.7082 22.6067C12.3176 22.9972 11.6845 22.9972 11.294 22.6067L8.68735 20.0001H5.00106C4.44877 20.0001 4.00106 19.5524 4.00106 19.0001V15.3138L1.39446 12.7072C1.00393 12.3167 1.00393 11.6835 1.39446 11.293L4.00106 8.68637V5.00008C4.00106 4.4478 4.44877 4.00008 5.00106 4.00008H8.68735ZM6.00106 6.00008V9.5148L3.51578 12.0001L6.00106 14.4854V18.0001H9.51578L12.0011 20.4854L14.4863 18.0001H18.0011V14.4854L20.4863 12.0001L18.0011 9.5148V6.00008H14.4863L12.0011 3.5148L9.51578 6.00008H6.00106ZM12.0011 16.0001C9.79192 16.0001 8.00106 14.2092 8.00106 12.0001C8.00106 9.79094 9.79192 8.00008 12.0011 8.00008C14.2102 8.00008 16.0011 9.79094 16.0011 12.0001C16.0011 14.2092 14.2102 16.0001 12.0011 16.0001ZM12.0011 14.0001C13.1056 14.0001 14.0011 13.1047 14.0011 12.0001C14.0011 10.8955 13.1056 10.0001 12.0011 10.0001C10.8965 10.0001 10.0011 10.8955 10.0011 12.0001C10.0011 13.1047 10.8965 14.0001 12.0011 14.0001Z"
        fill="#404040"
      />
    </svg>
  );
}
export function Logout(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"
        fill="#404040"
      />
    </svg>
  );
}
export function AIAvatar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M12.2329 23.0594L8 24L8.94065 19.767C8.34035 18.6445 8 17.362 8 16C8 11.5817 11.5817 8 16 8C20.4182 8 24 11.5817 24 16C24 20.4182 20.4182 24 16 24C14.638 24 13.3555 23.6597 12.2329 23.0594ZM12 16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16H18.4C18.4 17.3255 17.3255 18.4 16 18.4C14.6745 18.4 13.6 17.3255 13.6 16H12Z"
        fill="#4338CA"
      />
    </svg>
  );
}
export function Copy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M5.52764 4.83295V2.74962C5.52764 2.36609 5.83856 2.05518 6.22208 2.05518H14.5554C14.939 2.05518 15.2499 2.36609 15.2499 2.74962V12.4718C15.2499 12.8554 14.939 13.1663 14.5554 13.1663H12.4721V15.249C12.4721 15.6329 12.1597 15.9441 11.7729 15.9441H3.44907C3.06291 15.9441 2.75 15.6353 2.75 15.249L2.75181 5.528C2.75187 5.14414 3.06433 4.83295 3.45099 4.83295H5.52764ZM4.14057 6.22184L4.13902 14.5552H11.0832V6.22184H4.14057ZM6.91653 4.83295H12.4721V11.7774H13.861V3.44406H6.91653V4.83295Z"
        fill="#525252"
      />
    </svg>
  );
}
export function File(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M16.6667 18.3334H3.33333C2.8731 18.3334 2.5 17.9603 2.5 17.5001V2.50008C2.5 2.03985 2.8731 1.66675 3.33333 1.66675H16.6667C17.1269 1.66675 17.5 2.03985 17.5 2.50008V17.5001C17.5 17.9603 17.1269 18.3334 16.6667 18.3334ZM15.8333 16.6667V3.33341H4.16667V16.6667H15.8333ZM6.66667 5.83341H13.3333V7.50008H6.66667V5.83341ZM6.66667 9.16675H13.3333V10.8334H6.66667V9.16675ZM6.66667 12.5001H10.8333V14.1667H6.66667V12.5001Z"
        fill="#525252"
      />
    </svg>
  );
}
export function Loading(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle
        cx="5"
        cy="12"
        r="2"
        fill="#4338CA"
        className="animate-loading-dot animation-delay-0"
      ></circle>
      <circle
        cx="12"
        cy="12"
        r="2"
        fill="#4338CA"
        className="animate-loading-dot animation-delay-200"
      ></circle>
      <circle
        cx="19"
        cy="12"
        r="2"
        fill="#4338CA"
        className="animate-loading-dot animation-delay-400"
      ></circle>
    </svg>
  );
}
