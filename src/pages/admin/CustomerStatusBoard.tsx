import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

export default function CustomerStatusBoard() {
  const { users, updateUserStatus } = useAuth();

  const customers = users.filter(
    (u) => u.role === 'Customer'
  );

  const statuses = [
    'active',
    'inactive',
    'blocked',
  ] as const;

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const customerId = result.draggableId;
    const newStatus = result.destination.droppableId;

    updateUserStatus(
      customerId,
      newStatus as 'active' | 'inactive' | 'blocked'
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {statuses.map((status) => {
          const statusCustomers =
            customers.filter(
              (c) => c.status === status
            );

          return (
            <Droppable
              droppableId={status}
              key={status}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-slate-50 rounded-xl p-4 min-h-[400px]"
                >
                  <div className="flex justify-between mb-4">
                    <h3 className="font-bold capitalize">
                      {status}
                    </h3>

                    <Badge>
                      {statusCustomers.length}
                    </Badge>
                  </div>

                  {statusCustomers.map(
                    (customer, index) => (
                      <Draggable
                        key={customer.id}
                        draggableId={customer.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 mb-3 cursor-grab"
                          >
                            <p className="font-semibold">
                              {customer.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {customer.email}
                            </p>
                          </Card>
                        )}
                      </Draggable>
                    )
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}






