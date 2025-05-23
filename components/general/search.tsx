import { Input } from "../ui/input";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Input
      type="text"
      placeholder="Pesquisar"
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border border-[#1a222f] py-2 pl-10 pr-4 text-[#f1f5f9] placeholder:text-[#5d6674] focus:outline-none focus:ring-1 focus:ring-[#414d60]"
    />
  );
}
