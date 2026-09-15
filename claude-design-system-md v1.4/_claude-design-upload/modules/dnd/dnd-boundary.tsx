"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useId, useState } from "react";

export type DndTypeGuard<TData> = (value: unknown) => value is TData;

export interface DndBoundaryProps<TSource, TTarget> {
  children: React.ReactNode;
  isSourceData: DndTypeGuard<TSource>;
  isTargetData: DndTypeGuard<TTarget>;
  onDrop: (params: { source: TSource; target: TTarget }) => void;
  renderOverlay?: (params: { source: TSource }) => React.ReactNode;
  activationDistance?: number;
}

export function DndBoundary<TSource, TTarget>({
  children,
  isSourceData,
  isTargetData,
  onDrop,
  renderOverlay,
  activationDistance = 8,
}: DndBoundaryProps<TSource, TTarget>) {
  const dndId = useId();
  const [activeSource, setActiveSource] = useState<TSource | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: activationDistance,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const source = event.active.data.current;

    setActiveSource(isSourceData(source) ? source : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const source = event.active.data.current;
    const target = event.over?.data.current;

    setActiveSource(null);

    if (!isSourceData(source) || !isTargetData(target)) {
      return;
    }

    onDrop({ source, target });
  };

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveSource(null)}
    >
      {children}
      {renderOverlay ? (
        <DragOverlay>{activeSource ? renderOverlay({ source: activeSource }) : null}</DragOverlay>
      ) : null}
    </DndContext>
  );
}
