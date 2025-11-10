import { BaseCombobox } from "@/components/combo-box";
import { getAllCategories } from "@/services/category/get-all";

export function CategoryCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <BaseCombobox
      placeholder="Seleccionar categoría"
      fetchOptions={getAllCategories}
      value={value}
      onChange={onChange}
    />
  );
}