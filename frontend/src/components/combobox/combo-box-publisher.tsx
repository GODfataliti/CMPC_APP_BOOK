import { BaseCombobox } from "@/components/combo-box";
import { getAllPublishers } from "@/services/publisher/get-all";

export function PublisherCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <BaseCombobox
      placeholder="Seleccionar editorial"
      fetchOptions={getAllPublishers}
      value={value}
      onChange={onChange}
    />
  );
}