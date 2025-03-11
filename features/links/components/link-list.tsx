import { useLinks } from "../providers/links-provider";
import LinkItem from "./link-item";
import LinksEmpty from "./links-empty";

export default function LinkList() {
  const { fields } = useLinks();

  if (fields.length === 0) return <LinksEmpty />;

  return fields.map((field, index) => (
    <LinkItem key={field.id} index={index} {...field} />
  ));
}
