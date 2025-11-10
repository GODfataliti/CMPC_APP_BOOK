import { useEffect, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import type { Option } from "@/types";
import { cn } from "@/lib/utils";
import { adaptToOptions } from "@/adapters/options.adapter";

export function BaseCombobox({
  placeholder,
  fetchOptions,
  value,
  onChange,
}: {
  placeholder: string;
  fetchOptions: () => Promise<Array<Option>>;
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Array<Option>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const dataRow = await fetchOptions();
        const data = adaptToOptions(dataRow);
        setOptions(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchOptions]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between"
        >
          {value
            ? options.find((opt) => opt.ID === value)?.name
            : placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder={`Buscar ${placeholder.toLowerCase()}...`} />
          <CommandList>
            {loading ? (
              <CommandEmpty>Cargando...</CommandEmpty>
            ) : options.length === 0 ? (
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            ) : (
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.ID}
                    value={opt.ID}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === opt.ID ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {opt.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}