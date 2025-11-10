import { BaseCombobox } from "@/components/combo-box";
import { getAllAuthors } from "@/services/author/get-all";

export function AuthorCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <BaseCombobox
      placeholder="Seleccionar autor"
      fetchOptions={getAllAuthors}
      value={value}
      onChange={onChange}
    />
  );
}