import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { useGlobalContext } from "@/contexts/GlobalContext";

type GoVeganSwitchProps = {
  variant?: "full" | "mini";
};

const GoVeganSwitch: React.FC<GoVeganSwitchProps> = ({ variant = "full" }) => {
  const { isVeg, setIsVeg } = useGlobalContext(); 

  const handleToggle = (checked: boolean) => {
    setIsVeg(checked);

    if (checked) {
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-green-700 font-semibold">
            Vegetarian mode is ON
          </span>
          <span role="img" aria-label="leaf">
            🥦
          </span>
        </div>
      );
    } else {
      toast.info("Vegetarian mode is OFF");
    }
  };

  const FullSwitch = (
    <div className="flex items-center gap-2 bg-green-100 rounded-full pr-2 pl-4 py-2 cursor-pointer shadow-inner">
      <Label
        htmlFor="go-vegan"
        className="text-green-900 font-medium text-sm uppercase tracking-wide flex flex-row gap-2 items-center cursor-pointer"
      >
        <span>Veg</span>
      </Label>
      <Switch
        id="go-vegan"
        checked={isVeg}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 transition duration-300"
      />
    </div>
  );

  const MiniTrigger = (
    <div
      className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center cursor-pointer
      ${isVeg ? "border-green-600 bg-white" : "border-gray-400 bg-gray-100"}`}
    >
      <div
        className={`w-3 h-3 rounded-full
        ${isVeg ? "bg-green-600" : "bg-gray-400"}`}
      />
    </div>
  );

  if (variant === "mini") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{MiniTrigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <DropdownMenuItem>{FullSwitch}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return FullSwitch;
};

export default GoVeganSwitch;
