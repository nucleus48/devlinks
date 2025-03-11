import { useState } from "react";
import { useLinks } from "../providers/links-provider";
import LinkItem from "./link-item";
import LinksEmpty from "./links-empty";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import LinkItemView from "./list-item-view";

export default function LinkList() {
  const [activeIndex, setActiveIndex] = useState<number>();
  const { fields, move } = useLinks();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveIndex(active.data.current?.index as number);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const indexA = active.data.current?.index as number;
      const indexB = over?.data.current?.index as number;
      move(indexA, indexB);
    }
  }

  if (fields.length === 0) return <LinksEmpty />;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={fields} strategy={verticalListSortingStrategy}>
        {fields.map((field, index) => (
          <LinkItem key={field.id} index={index} id={field.id} />
        ))}
      </SortableContext>
      <DragOverlay>
        {activeIndex !== undefined && <LinkItemView index={activeIndex} />}
      </DragOverlay>
    </DndContext>
  );
}
