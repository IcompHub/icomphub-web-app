import Image from "next/image";

interface LogoProps {
  w: number;
  h: number;
}

export function Logo({ w, h }: LogoProps) {
  return (
    <Image src="/main_logo.svg" width={w} height={h} alt="IcompHub Logo" />
  );
}
