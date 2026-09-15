export interface DragSourceFactory<TContext, TSource> {
  getDragSource: (context: TContext) => TSource | null;
}

export interface DropTargetFactory<TContext, TTarget> {
  getDropTarget: (context: TContext) => TTarget | null;
}
