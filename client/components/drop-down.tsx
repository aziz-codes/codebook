import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface DropdownOptions {
  options: string[];
  onSelect: (option: string) => void;
}
const DropDown = ({ options, onSelect }: DropdownOptions) => {
  return (
    <Select onValueChange={(e) => onSelect(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent className="outline-none">
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem key={index} value={option} className="cursor-pointer">
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DropDown;
