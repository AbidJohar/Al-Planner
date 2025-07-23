 

 import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"


 interface option {
    label : string,
    value : string
 }

 interface customSelectProps {
     placeholder : string,
     option : option[],
     onChange : ( value : string) => void,
     value? : string | null,
     className : string
 }

const CustomSelect = ({placeholder,className,option,onChange,value} : customSelectProps) => {
  return (
    <Select onValueChange={onChange} value={value ?? ""}>
  <SelectTrigger className={cn("w-full", className)}>
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
  <SelectContent>
     {
        option.map((opt) =>   
            <SelectItem key={opt.label} value={opt.value}>{opt.label}</SelectItem>
        )
     }
  </SelectContent>
</Select>
  )
}

export default CustomSelect
