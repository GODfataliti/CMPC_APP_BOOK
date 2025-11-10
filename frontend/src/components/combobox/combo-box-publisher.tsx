import { BaseCombobox } from "@/components/combo-box";
import { getPublishers } from "@/services/publisher/get-all";

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
      fetchOptions={getPublishers}
      value={value}
      onChange={onChange}
    />
  );
}