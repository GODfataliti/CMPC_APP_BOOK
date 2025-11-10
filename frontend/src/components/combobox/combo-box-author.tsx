import { BaseCombobox } from "@/components/combo-box";
import { getAuthors } from "@/services/author/get-all";

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
      fetchOptions={getAuthors}
      value={value}
      onChange={onChange}
    />
  );
}